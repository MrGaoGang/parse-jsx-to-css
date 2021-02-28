import { JSXElement } from "@babel/types";
import { BaseConfig, ItemClassName } from "./types";

export function collectAllReactClassNames(node: JSXElement): ItemClassName {
  const attrs = node.openingElement.attributes;
  const itemJSX: ItemClassName = {
    name: "",
    children: [],
  };
  for (let index = 0; index < attrs.length; index++) {
    const ele = attrs[index];
    if (ele.type === "JSXAttribute") {
      if (
        ele.name.name === "className" &&
        ele.value?.type === "StringLiteral"
      ) {
        itemJSX.name = ele.value.value;
      }
    }
  }

  node.children.forEach((ele) => {
    if (ele.type === "JSXElement") {
      itemJSX.children?.push(collectAllReactClassNames(ele));
    }
  });

  return itemJSX;
}

export function getOutputFullPath(options: BaseConfig) {
  const path = options.inputPath.substring(
    0,
    options.inputPath.lastIndexOf(".") + 1
  );
  return path + options.outType;
}

/**
 * child class name is extends parent
 * @param className 
 * @param parent 
 */
export function classNameExtendParent(className: string, parent: string[]) {
  for (let index = 0; index < parent.length; index++) {
    const ele = parent[index];
    if (className.startsWith(ele)) {
      return ele;
    }
  }
  return "";
}
