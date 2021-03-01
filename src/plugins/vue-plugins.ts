import { RootNode } from "@vue/compiler-dom";
import { collectionVueClassNames } from "../utils";
import { BaseConfig } from "../types";
import transform from "../transform/index";

export default function (vueAst: RootNode, options: BaseConfig) {
  const classes = collectionVueClassNames(vueAst);
  console.log(JSON.stringify(classes));
  transform(classes, options);
}
