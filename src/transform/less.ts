import { BaseConfig, ItemClassName } from "../types";
import { classNameExtendParent } from "../utils";
import generate from "../generate";
/**
 * 具体嵌套层级的less
 * @param itemClass
 */
export function wrapLessCssCodeFromClass(
  itemClass: ItemClassName,
  parentName: string[] = []
): string {
  if (itemClass.name) {
    // maybe exist muti classnames
    const names = itemClass.name.split(" ").filter((ele) => ele);
    return `${names.map((ele) => {
      if (parentName) {
        const parent = classNameExtendParent(ele, parentName);
        if (parent) {
          return `&` + ele.substr(parent.length) + " ";
        }
      }
      return "." + ele + " ";
    })} {
          ${itemClass.children
            ?.map((e) => {
              return wrapLessCssCodeFromClass(e, names);
            })
            .join("\n")}
      }`;
  }
  return `${itemClass.children
    ?.map((e) => {
      return wrapLessCssCodeFromClass(e);
    })
    .join("\n")}`;
}

export default function (
  data: ItemClassName,
  options: BaseConfig
): Promise<string> {
  let code = wrapLessCssCodeFromClass(data);
  return generate(code, options);
}
