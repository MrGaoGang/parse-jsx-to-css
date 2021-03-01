import { BaseConfig, ItemClassName } from "../types";
import generate from "../generate";
import { getOutputFullPath } from "../utils";

/**
 * css
 * @param itemClass
 */
export function wrapCssCodeFromClass(
  itemClass: ItemClassName,
  parentName: string[] = []
): string {
  let result = "";
  if (itemClass.name) {
    // maybe exist muti classnames
    const names = itemClass.name.split(" ").filter((ele) => ele);
    result = `${names
      .map((ele) => {
        return "." + ele;
      })
      .join("")} {}\n`;
  }

  if (itemClass.name && itemClass.children && itemClass.children.length > 0) {
    const names = itemClass.name.split(" ").filter((ele) => ele);
    result += `${itemClass.children
      ?.map((e) => {
        return (
          `${names.map((ele) => "." + ele).join("")} ` +
          wrapCssCodeFromClass(e, names)
        );
      })
      .join("\n")}`;
  } else {
    result += `${itemClass.children
      ?.map((e) => {
        return wrapCssCodeFromClass(e, []);
      })
      .join("\n")}`;
  }

  return result;
}

export default function (data: ItemClassName, options: BaseConfig) :Promise<string>{
  let code = wrapCssCodeFromClass(data);
  return generate(code, options);
}
