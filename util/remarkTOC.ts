import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import { Heading } from "./types/TOCHeading";

export default function remarkTocHeadings(options: OptionProps) {
  var GithubSlugger = require("github-slugger");
  var slugger = new GithubSlugger();
  return (tree: any) =>
    visit(tree, "heading", (node) => {
      const textContent = toString(node);

      const newHeading: Heading = {
        value: textContent,
        url: "#" + slugger.slug(textContent),
        depth: node.depth,
      };
      options.exportRef.push(newHeading);
    });
}
type OptionProps = {
  exportRef: Heading[];
};
