"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("../src/index"));
index_1.default({
    inputPath: path_1.default.join(__dirname, "./demo.js"),
    outType: 'css'
});
