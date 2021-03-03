import {
  JSXElement,
  JSXExpressionContainer,
  JSXAttribute,
  JSXSpreadAttribute,
} from "@babel/types";
import {
  AttributeNode,
  DirectiveNode,
  ElementTypes,
  isTemplateNode,
  NodeTypes,
  RootNode,
  TemplateChildNode,
} from "@vue/compiler-dom";
import { BaseConfig, ItemClassName } from "./types";

function isExpressionNode(
  pet: JSXElement | JSXExpressionContainer | undefined
): pet is JSXExpressionContainer {
  if (!pet) {
    return false;
  }
  return (<JSXExpressionContainer>pet).type === "JSXExpressionContainer";
}

function getExpressionNodeAttrs(node: JSXExpressionContainer) {
  if (node.expression.type === "ConditionalExpression") {
    // 针对表达式的情况，则返回表达式两个
    let result: Array<JSXAttribute | JSXSpreadAttribute> = [];
    const conditionNode = node.expression;
    if (conditionNode.consequent.type === "JSXElement") {
      result = result.concat(
        conditionNode.consequent.openingElement.attributes
      );
    }
    if (conditionNode.alternate.type === "JSXElement") {
      result = result.concat(conditionNode.alternate.openingElement.attributes);
    }

    return result;
  }
  return [];
}

export function collectAllReactClassNames(
  node: JSXElement | JSXExpressionContainer
): ItemClassName {
  const itemJSX: ItemClassName = {
    name: "",
    children: [],
  };
  if (isExpressionNode(node)) {
    
    if (node.expression.type === "ConditionalExpression") {
      const conditionNode = node.expression;
      if (conditionNode.consequent.type === "JSXElement") {
        itemJSX.children?.push(
          collectAllReactClassNames(conditionNode.consequent)
        );
      }
      if (conditionNode.alternate.type === "JSXElement") {
        itemJSX.children?.push(
          collectAllReactClassNames(conditionNode.alternate)
        );
      }
      return itemJSX;
    }
  } else {
    const attrs = node.openingElement.attributes;
    for (let index = 0; index < attrs.length; index++) {
      const ele = attrs[index];
      if (ele.type === "JSXAttribute") {
        if (
          ele.name.name === "className" &&
          ele.value?.type === "StringLiteral"
        ) {
          itemJSX.name = ele.value.value;
        }
      }
    }

    node.children.forEach((ele) => {
      if (ele.type === "JSXElement" || ele.type === "JSXExpressionContainer") {
        itemJSX.children?.push(collectAllReactClassNames(ele));
      }
    });
  }

  return itemJSX;
}

/**
 * is vue attribute node?
 * @param pet
 */
function isAttributeNode(
  pet: AttributeNode | DirectiveNode | undefined
): pet is AttributeNode {
  if (!pet) {
    return false;
  }
  return (<AttributeNode>pet).value !== undefined;
}

/**
 * is vue TemplateChildNode node?
 * @param pet
 */
function isTemplateChildNode(
  node: RootNode | TemplateChildNode | undefined
): node is TemplateChildNode {
  if (!node) {
    return false;
  }
  if (node && node.type === NodeTypes.ELEMENT && node.tag === "template") {
    return true;
  }
  return false;
}

/**
 * return the vue nodes
 * @param vueNode
 */
export function collectionVueClassNames(
  vueNode: RootNode | TemplateChildNode
): ItemClassName {
  const itemJSX: ItemClassName = {
    name: "",
    children: [],
  };
  if (vueNode.type === NodeTypes.ELEMENT || vueNode.type === NodeTypes.ROOT) {
    if (
      vueNode.type === NodeTypes.ELEMENT &&
      vueNode.tag !== "script" &&
      vueNode.tag !== "style"
    ) {
      const classNameNode = vueNode.props.find((ele) => ele.name === "class");
      if (isAttributeNode(classNameNode)) {
        itemJSX.name = classNameNode.value?.content;
      }
    }
    vueNode.children.forEach((templateNode) => {
      if (
        templateNode.type === NodeTypes.ELEMENT &&
        templateNode.tag !== "script" &&
        templateNode.tag !== "style"
      ) {
        const next = collectionVueClassNames(templateNode);

        itemJSX.children?.push(next);
      }
    });
  }

  return itemJSX;
}

/**
 * return the file save path
 * @param options
 */
export function getOutputFullPath(options: BaseConfig) {
  const path = options.input.substring(0, options.input.lastIndexOf(".") + 1);
  return path + (options.outType === "sass" ? "scss" : options.outType);
}

/**
 * child class name is extends parent
 * @param className
 * @param parent
 */
export function classNameExtendParent(
  className: string,
  parent: string[]
): [string, number] {
  for (let index = 0; index < parent.length; index++) {
    const ele = parent[index];
    if (className.startsWith(ele)) {
      return [ele, index];
    }
  }
  return ["", -1];
}

/**
 * parent has same prefix child
 * @param parentName
 * @param children
 */
export function parentHasSamePrefixChild(
  parentName: string[],
  itemClass: ItemClassName
): [boolean, number] {
  if (itemClass.children && Array.isArray(itemClass.children)) {
    for (let i = 0; i < itemClass.children.length; i++) {
      const element = itemClass.children[i].name || "";
      const [parent, index] = classNameExtendParent(element, parentName);
      if (parent && index !== -1) {
        return [true, index];
      }
    }
  }

  return [false, -1];
}
