"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapLessCssCodeFromClass = void 0;
var utils_1 = require("../utils");
var generate_1 = __importDefault(require("../generate"));
/**
 * 具体嵌套层级的less
 * @param itemClass
 */
function wrapLessCssCodeFromClass(itemClass, parentName) {
    var _a, _b;
    if (parentName === void 0) { parentName = []; }
    if (itemClass.name) {
        // maybe exist muti classnames
        var names_1 = itemClass.name.split(" ").filter(function (ele) { return ele; });
        return names_1.map(function (ele) {
            if (parentName) {
                var parent_1 = utils_1.classNameExtendParent(ele, parentName);
                if (parent_1) {
                    return "&" + ele.substr(parent_1.length) + " ";
                }
            }
            return "." + ele + " ";
        }) + " {\n          " + ((_a = itemClass.children) === null || _a === void 0 ? void 0 : _a.map(function (e) {
            return wrapLessCssCodeFromClass(e, names_1);
        }).join("\n")) + "\n      }";
    }
    return "" + ((_b = itemClass.children) === null || _b === void 0 ? void 0 : _b.map(function (e) {
        return wrapLessCssCodeFromClass(e);
    }).join("\n"));
}
exports.wrapLessCssCodeFromClass = wrapLessCssCodeFromClass;
function default_1(data, options) {
    var code = wrapLessCssCodeFromClass(data);
    generate_1.default(code, options);
}
exports.default = default_1;
