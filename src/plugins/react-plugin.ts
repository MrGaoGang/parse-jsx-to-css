import { NodePath, TraverseOptions } from "@babel/traverse";
import * as t from "@babel/types";
import { BabelPluginsType, BaseConfig } from "../types";
import { collectAllReactClassNames } from "../utils";
import transform from "../transform/index";
export default function (
  options: BaseConfig,
  promiseAllCodes: Promise<string>[]
): BabelPluginsType {
  return {
    enter(path: NodePath) {
      // 找到return的根jsx
      if (
        t.isJSXElement(path.node) &&
        (path.parentPath.node.type === "ReturnStatement" ||
          path.parentPath.node.type === "ArrowFunctionExpression")
      ) {
        const node: t.JSXElement = path.node;
        const classes = collectAllReactClassNames(node);
        const data = transform(classes, options);
        promiseAllCodes.push(data);
      }
    },
    exit(path: NodePath) {},
  };
}
