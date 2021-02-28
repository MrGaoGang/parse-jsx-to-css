import { BaseConfig, ItemClassName } from "../types";
import lessTransfrom from "./less";
import cssTransfrom from "./css";

export default function(classes: ItemClassName, options: BaseConfig){
    switch (options.outType) {
        case "less":
          lessTransfrom(classes, options);
          break;
        case "css":
          cssTransfrom(classes, options);
          break;
      }
}