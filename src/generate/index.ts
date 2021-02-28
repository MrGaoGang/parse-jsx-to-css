import { BaseConfig, ItemClassName } from "../types";
import * as prettier from "prettier";
import fs from "fs";
import { getOutputFullPath } from "../utils";

export default function (code: string, options: BaseConfig) {
  code = prettier.format(code, {
    parser: options.outType || 'less',
  });
  fs.writeFileSync(getOutputFullPath(options), code);
}
