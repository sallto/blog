import { visit } from "unist-util-visit";
import fs from "fs";
import sizeOf from "image-size";
import path from "path";
export type Root = import("mdast").Root;
//Note: I can't find the types of only of this shit.
//Convert standard image notation to using next/image
export default function remarkNextImage():
  | void
  | import("unified").Transformer<import("mdast").Root, import("mdast").Root> {
  return (tree) => {
    visit(
      tree,
      //only visit paragraphs with an imagenode
      (node: any) =>
        node.type === "paragraph" &&
        node.children.some((n: any) => isImageNode(n)),
      (node: any) => {
        const imageNode = node.children.find((n: any) => isImageNode(n));
        //the imageurl starts with / i.e. /test.png, which messes with the filesystem paths.
        //as such this has to be cut out
        const imagePath = path.join(
          process.cwd(),
          "public",
          imageNode.url.slice(1)
        );
        if (fs.existsSync(imagePath)) {
          const dimensions = sizeOf(imagePath);
          // next/image is a jsx element
          imageNode.type = "mdxJsxFlowElement";
          //Important! next/image has to be imported and no other Image component shall be imported.
          imageNode.name = "Image";
          imageNode.attributes = [
            setAttribute("alt", imageNode.alt),
            //idk why this is called url
            setAttribute("src", imageNode.url),
            setAttribute("width", dimensions.width),
            setAttribute("height", dimensions.height),
          ];
        } else {
          throw new Error(
            `Can not parse image with url ${imagePath} since this path does not exist.`
          );
        }
      }
    );
  };

  function isImageNode(n: any) {
    return n.type === "image";
  }
}
export function setAttribute(name: string, value: any) {
  return {
    type: "mdxJsxAttribute",
    name: name,
    value: value,
  };
}
