import * as babelParse from "@babel/parser";
import babelTraverse from "@babel/traverse";
import ReactVisitor from "./plugins/react-plugin";
import VueVisitor from "./plugins/vue-plugins";
import fs from "fs";
import { BaseConfig } from "./types";
import * as vueParse from "@vue/compiler-dom";

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
    const extension = (/\.([^.]*)$/.exec(c.inputPath) || [])[0];

    if (extension === ".vue") {
      const result = vueParse.parse(file);
      result && VueVisitor(result,c);
    } else {
      const result = babelParse.parse(file, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
      });

      if (result != null) {
        babelTraverse(result, ReactVisitor(c));
      }
    }

    return;
  }
  console.log("please select one file to transfrom!");
}
