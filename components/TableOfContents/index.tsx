import React, { useState } from "react";
import { Heading } from "../../util/types/TOCHeading";
import { useActiveHeading } from "../../util/useActiveHeading";
import TOCEntry from "./Entry";

export default function TableOfContents({ headings }: TOCProps) {
  const realHeadings = [
    {
      depth: 0,
      url: "#title",
      value: "Introduction",
    },
  ].concat(headings);
  
  const activeId=useActiveHeading(
    realHeadings.map((h) => h.url),
  );
  return (
    <ul className="ml-4 sticky top-36 text-secondary-placeholder text-lg space-y-2">
      {realHeadings.map((heading) => (
        <TOCEntry
          key={heading.value}
          heading={heading}
          isVisible={heading.url === activeId}
        />
      ))}
    </ul>
  );
}
type TOCProps = {
  headings: Heading[];
};
