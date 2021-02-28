import { NodePath, TraverseOptions } from "@babel/traverse";
import * as t from "@babel/types";
import { BabelPluginsType, BaseConfig } from "../types";
import { collectAllReactClassNames } from "../utils";
import transform from "../transform/index";
export default function (options: BaseConfig): BabelPluginsType {
  return {
    enter(path: NodePath) {
      // 找到return的根jsx
      if (
        t.isJSXElement(path.node) &&
        path.parentPath.node.type === "ReturnStatement"
      ) {
        const node: t.JSXElement = path.node;
        const classes = collectAllReactClassNames(node);
        transform(classes, options);
      }
    },
  };
}
