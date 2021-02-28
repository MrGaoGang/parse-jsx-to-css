"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCssCodeFromClass = void 0;
var generate_1 = __importDefault(require("../generate"));
/**
 * css
 * @param itemClass
 */
function wrapCssCodeFromClass(itemClass, parentName) {
    var _a, _b;
    if (parentName === void 0) { parentName = []; }
    var result = "";
    if (itemClass.name) {
        // maybe exist muti classnames
        var names = itemClass.name.split(" ").filter(function (ele) { return ele; });
        result = names
            .map(function (ele) {
            return "." + ele;
        })
            .join("") + " {}\n";
    }
    if (itemClass.name && itemClass.children && itemClass.children.length > 0) {
        var names_1 = itemClass.name.split(" ").filter(function (ele) { return ele; });
        result += "" + ((_a = itemClass.children) === null || _a === void 0 ? void 0 : _a.map(function (e) {
            return names_1.map(function (ele) { return "." + ele; }).join("") + " " + wrapCssCodeFromClass(e, names_1);
        }).join("\n"));
    }
    else {
        result += "" + ((_b = itemClass.children) === null || _b === void 0 ? void 0 : _b.map(function (e) {
            return wrapCssCodeFromClass(e, []);
        }).join("\n"));
    }
    return result;
}
exports.wrapCssCodeFromClass = wrapCssCodeFromClass;
function default_1(data, options) {
    var code = wrapCssCodeFromClass(data);
    generate_1.default(code, options);
}
exports.default = default_1;
