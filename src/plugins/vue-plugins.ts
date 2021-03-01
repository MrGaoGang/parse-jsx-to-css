import { RootNode } from "@vue/compiler-dom";
import { collectionVueClassNames } from "../utils";
import { BaseConfig } from "../types";
import transform from "../transform/index";

export default function (
  vueAst: RootNode,
  options: BaseConfig,
  promiseAllCodes: Promise<string>[]
) {
  const classes = collectionVueClassNames(vueAst);
  const data = transform(classes, options);
  promiseAllCodes.push(data);

}
