"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSXTocss = /** @class */ (function () {
    function JSXTocss() {
    }
    JSXTocss.prototype.create = function (file) {
        this.file = file;
        return this;
    };
    JSXTocss.prototype.transform = function () {
        if (this.file) {
            return;
        }
        console.log('please select one file to transfrom!');
    };
    return JSXTocss;
}());
exports.default = JSXTocss;
