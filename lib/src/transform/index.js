"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var less_1 = __importDefault(require("./less"));
var css_1 = __importDefault(require("./css"));
function default_1(classes, options) {
    switch (options.outType) {
        case "less":
            less_1.default(classes, options);
            break;
        case "css":
            css_1.default(classes, options);
            break;
    }
}
exports.default = default_1;
