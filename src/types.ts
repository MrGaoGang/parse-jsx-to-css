import { TraverseOptions, NodePath } from "@babel/traverse";

export interface ItemClassName {
  name?: string;
  children?: ItemClassName[];
}

export type ParseCallback = (
  value: ItemClassName[] | ItemClassName | null
) => void;

export type BabelPluginsType =  TraverseOptions;

export type BaseConfig = {
  outPath?: string; // the out put of relative input file  filepath
  outType?: "less" | "css" | "sass";
  inputType?: "react" | "vue";
  inputPath:string
};
