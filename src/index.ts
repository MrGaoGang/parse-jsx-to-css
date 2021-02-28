import * as babelParse from "@babel/parser";
import babelTraverse from "@babel/traverse";
import ReactVisitor from "./plugins/react-plugin";
import fs from "fs";
import { BaseConfig } from "./types";

const defaultOptions: BaseConfig = {
  inputType: "react",
  outType: "less",
  outPath: "./",
  inputPath: "",
};

export default function (config: BaseConfig) {
  if (config.inputPath) {
    const c: BaseConfig = {
      ...defaultOptions,
      ...config,
    };
    const file = fs.readFileSync(config.inputPath, {
      encoding: "utf-8",
    });
    const result = babelParse.parse(file, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    if (result != null) {
      babelTraverse(result, ReactVisitor(c));
    }

    return;
  }
  console.log("please select one file to transfrom!");
}
