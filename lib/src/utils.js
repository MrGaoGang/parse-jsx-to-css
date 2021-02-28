"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classNameExtendParent = exports.getOutputFullPath = exports.collectAllReactClassNames = void 0;
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
function getOutputFullPath(options) {
    var path = options.inputPath.substring(0, options.inputPath.lastIndexOf(".") + 1);
    return path + options.outType;
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
