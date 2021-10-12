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
  options?: IntersectionObserverInit
) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const callback: IntersectionObserverCallback = (headingEntries) => {
      // Get all headings that are currently visible on the page
      const visibleHeadings = headingEntries.filter((e) => e.isIntersecting);

      if (visibleHeadings.length === 0) {
        //Necessary if a user scrolls down and then reloads.
        //In that case the IntersectionObserver didn't see the Heading onscreen
        if (headingList.length >= 1) {
          const element = headingEntries
            .reverse()
            .find((e) => e.boundingClientRect.bottom < 100);
          if (element) {
            setActiveId(`#${element.target.id}`);
          }
        }
      } else {
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
        // the entries are always sorted top to bottom.
        setActiveId(`#${visibleHeadings[0].target.id}`);
      }
    };

    const observer = new IntersectionObserver(callback, options);

    //Observe all (non-null) elements
    headingList
      .map((heading) => document.querySelector(heading))
      .flatMap((f) => (!!f ? [f] : []))
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headingList]);
  return activeId;
}
