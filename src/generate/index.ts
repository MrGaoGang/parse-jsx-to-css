import { BaseConfig, ItemClassName } from "../types";
import * as prettier from "prettier";
import cssPlugins from 'prettier/parser-postcss'
export default function (code: string, options: BaseConfig): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    code = prettier.format(code, {
      parser: options.outType === "sass" ? "scss" : options.outType || "less",
      plugins:[cssPlugins]
    });
    resolve(code);
  });
}
