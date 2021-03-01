import { BaseConfig, ItemClassName } from "../types";
import lessTransfrom from "./less";
import cssTransfrom from "./css";

export default function (
  classes: ItemClassName,
  options: BaseConfig
): Promise<string> {
  switch (options.outType) {
    case "less":
      return lessTransfrom(classes, options);
    case "sass":
      return lessTransfrom(classes, options);
    case "css":
      return cssTransfrom(classes, options);
  }

  return Promise.resolve("");
}
