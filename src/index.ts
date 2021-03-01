import * as babelParse from "@babel/parser";
import babelTraverse from "@babel/traverse";
import ReactVisitor from "./plugins/react-plugin";
import VueVisitor from "./plugins/vue-plugins";
import fs from "fs";
import { BaseConfig } from "./types";
import * as vueParse from "@vue/compiler-dom";
import { getOutputFullPath } from "./utils";
const defaultOptions: BaseConfig = {
  language: "react",
  outType: "less",
  outPath: "./",
  input: "",
  transformType: "file",
};

export default function (config: BaseConfig) {
  if (config.input) {
    const c: BaseConfig = {
      ...defaultOptions,
      ...config,
    };
    const file =
      c.transformType === "code"
        ? c.input
        : fs.readFileSync(config.input, {
            encoding: "utf-8",
          });
    const extension = (/\.([^.]*)$/.exec(c.input) || [])[0];
    const promiseAllCodes: Promise<string>[] = [];
    if (extension === ".vue" || c.language === "vue") {
      const result = vueParse.parse(file);
      result && VueVisitor(result, c, promiseAllCodes);
    } else {
      const result = babelParse.parse(file, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
      });

      if (result != null) {
        babelTraverse(result, ReactVisitor(c, promiseAllCodes));
      }
    }

    Promise.all([...promiseAllCodes]).then((res: string[]) => {
      c.callback && c.callback(res.join("\n"));
      if (c.transformType === "file") {
        fs.writeFileSync(getOutputFullPath(c), res.join("\n"));
      }
    });
    return;
  }
  console.log("please select one file to transfrom!");
}
