import React, {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
export function useActiveHeading(
  headingList: string[],
  setActiveId: Dispatch<SetStateAction<string>>
) {
  const headingElementsRef: MutableRefObject<
    Map<string, IntersectionObserverEntry>
  > = useRef(new Map());

  useEffect(() => {
    const callback: IntersectionObserverCallback = (headingEntries) => {
      headingElementsRef.current = headingEntries.reduce(
        (map, headingElement) =>
          map.set(headingElement.target.id, headingElement),
        headingElementsRef.current
      );

      // Get all headings that are currently visible on the page
      const visibleHeadings: IntersectionObserverEntry[] = [];
      headingElementsRef.current.forEach((headingElement) => {
        if (headingElement.isIntersecting) {
          visibleHeadings.push(headingElement);
        }
      });

      const getIndexFromId = (id: string) =>
        headingList.findIndex((headingId) => headingId === id);

      if (visibleHeadings.length === 0) {
        //Necessary if a user scrolls down and then reloads.
        //In that case the IntersectionObserver didn't see the Heading onscreen
        if (headingList.length >= 1) {
          const headingElementsList = headingList
            .map((heading) => document.querySelector(heading))
            .flatMap((f) => (!!f ? [f] : []));

          //Look for the closest heading above the viewport. (there isn't one in the viewport since the IOs would catch that).
          computeActiveHeading(headingElementsList, setActiveId);
        }
      } else {
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );

        setActiveId(`#${sortedVisibleHeadings[0].target.id}`);
      }
    };

    const observer = new IntersectionObserver(callback);

    //Observe all (non-null) elements
    headingList
      .map((heading) => document.querySelector(heading))
      .flatMap((f) => (!!f ? [f] : []))
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId, headingList]);
}

function computeActiveHeading(
  nestedHeadings: Element[],
  setActiveId: React.Dispatch<React.SetStateAction<string>>
) {
  // Boxes for the headings. In reverse order since we need to look from the bottom
  let headingBoxes: HeadingBox[] = nestedHeadings
    .map(({ id }) => {
      const elem = document.querySelector(`#${id}`);
      if (!elem) return { id: "", box: new DOMRect() };
      return { id, box: elem.getBoundingClientRect() };
    })
    .filter((elem) => elem.id !== "")
    .reverse();
  //The first few pixels are out of range since they
  //will be occupied by the title itself.
  const OFFSET = 150;

  const closestHeading = headingBoxes.find(({ box }) => {
    return box.bottom < OFFSET;
  });

  if (closestHeading) {
    setActiveId(`#${closestHeading.id}`);
  }
}
type HeadingBox = { id: string; box: DOMRect };
