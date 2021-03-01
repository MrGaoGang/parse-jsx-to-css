"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var index_1 = __importDefault(require("../transform/index"));
function default_1(vueAst, options) {
    var classes = utils_1.collectionVueClassNames(vueAst);
    console.log(JSON.stringify(classes));
    index_1.default(classes, options);
}
exports.default = default_1;
