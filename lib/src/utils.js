"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classNameExtendParent = exports.getOutputFullPath = exports.collectionVueClassNames = exports.collectAllReactClassNames = void 0;
function collectAllReactClassNames(node) {
    var _a;
    var attrs = node.openingElement.attributes;
    var itemJSX = {
        name: "",
        children: [],
    };
    for (var index = 0; index < attrs.length; index++) {
        var ele = attrs[index];
        if (ele.type === "JSXAttribute") {
            if (ele.name.name === "className" &&
                ((_a = ele.value) === null || _a === void 0 ? void 0 : _a.type) === "StringLiteral") {
                itemJSX.name = ele.value.value;
            }
        }
    }
    node.children.forEach(function (ele) {
        var _a;
        if (ele.type === "JSXElement") {
            (_a = itemJSX.children) === null || _a === void 0 ? void 0 : _a.push(collectAllReactClassNames(ele));
        }
    });
    return itemJSX;
}
exports.collectAllReactClassNames = collectAllReactClassNames;
/**
 * is vue attribute node?
 * @param pet
 */
function isAttributeNode(pet) {
    if (!pet) {
        return false;
    }
    return pet.value !== undefined;
}
/**
 * is vue TemplateChildNode node?
 * @param pet
 */
function isTemplateChildNode(node) {
    if (!node) {
        return false;
    }
    if (node && node.type === 1 /* ELEMENT */ && node.tag === "template") {
        return true;
    }
    return false;
}
/**
 * return the vue nodes
 * @param vueNode
 */
function collectionVueClassNames(vueNode) {
    var _a;
    var itemJSX = {
        name: "",
        children: [],
    };
    if (vueNode.type === 1 /* ELEMENT */ || vueNode.type === 0 /* ROOT */) {
        if (vueNode.type === 1 /* ELEMENT */ &&
            vueNode.tag !== "script" &&
            vueNode.tag !== "style") {
            var classNameNode = vueNode.props.find(function (ele) { return ele.name === "class"; });
            if (isAttributeNode(classNameNode)) {
                itemJSX.name = (_a = classNameNode.value) === null || _a === void 0 ? void 0 : _a.content;
            }
        }
        vueNode.children.forEach(function (templateNode) {
            var _a;
            if (templateNode.type === 1 /* ELEMENT */ &&
                templateNode.tag !== "script" &&
                templateNode.tag !== "style") {
                var next = collectionVueClassNames(templateNode);
                (_a = itemJSX.children) === null || _a === void 0 ? void 0 : _a.push(next);
            }
        });
    }
    return itemJSX;
}
exports.collectionVueClassNames = collectionVueClassNames;
/**
 * return the file save path
 * @param options
 */
function getOutputFullPath(options) {
    var path = options.input.substring(0, options.input.lastIndexOf(".") + 1);
    return path + (options.outType === "sass" ? "scss" : options.outType);
}
exports.getOutputFullPath = getOutputFullPath;
/**
 * child class name is extends parent
 * @param className
 * @param parent
 */
function classNameExtendParent(className, parent) {
    for (var index = 0; index < parent.length; index++) {
        var ele = parent[index];
        if (className.startsWith(ele)) {
            return ele;
        }
    }
    return "";
}
exports.classNameExtendParent = classNameExtendParent;
