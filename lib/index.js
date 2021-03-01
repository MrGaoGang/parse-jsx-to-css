"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var babelParse = __importStar(require("@babel/parser"));
var traverse_1 = __importDefault(require("@babel/traverse"));
var react_plugin_1 = __importDefault(require("./plugins/react-plugin"));
var vue_plugins_1 = __importDefault(require("./plugins/vue-plugins"));
var fs_1 = __importDefault(require("fs"));
var vueParse = __importStar(require("@vue/compiler-dom"));
var utils_1 = require("./utils");
var defaultOptions = {
    language: "react",
    outType: "less",
    outPath: "./",
    input: "",
    transformType: "file",
};
function default_1(config) {
    if (config.input) {
        var c_1 = __assign(__assign({}, defaultOptions), config);
        var file = c_1.transformType === "code"
            ? c_1.input
            : fs_1.default.readFileSync(config.input, {
                encoding: "utf-8",
            });
        var extension = (/\.([^.]*)$/.exec(c_1.input) || [])[0];
        var promiseAllCodes = [];
        if (extension === ".vue" || c_1.language === "vue") {
            var result = vueParse.parse(file);
            result && vue_plugins_1.default(result, c_1, promiseAllCodes);
        }
        else {
            var result = babelParse.parse(file, {
                sourceType: "module",
                plugins: ["jsx", "typescript"],
            });
            if (result != null) {
                traverse_1.default(result, react_plugin_1.default(c_1, promiseAllCodes));
            }
        }
        Promise.all(__spreadArray([], promiseAllCodes)).then(function (res) {
            c_1.callback && c_1.callback(res.join("\n"));
            if (c_1.transformType === "file") {
                fs_1.default.writeFileSync(utils_1.getOutputFullPath(c_1), res.join("\n"));
            }
        });
        return;
    }
    console.log("please select one file to transfrom!");
}
exports.default = default_1;
