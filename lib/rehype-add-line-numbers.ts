import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import type { Plugin } from "unified";

export const rehypeAddLineNumbers: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (node.position?.start.line) {
        node.properties = node.properties || {};
        node.properties.dataLine = node.position.start.line;
      }
    });
  };
};
