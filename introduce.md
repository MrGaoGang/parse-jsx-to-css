# 讲真你还在手写 less/css/scss 吗,我想我可以帮助你

## 痛点

由于笔者是做商业化活动相关开发，为了编写一系列炫酷的页面，需要在 `tsx`、`js`或者`vue`中编写一堆的`class/className`;然后需要手动的将 dom 树中的`class/className`中的值复制到`less/sass/css`文件中。可以想象你每天都在进行这样的操作，当组件/页面比较多的时候，编写样式将会是非常痛苦的。

## 由此

基于**每天都在手动 copy class 到样式文件中**,`cmd+c `已经敲坏了，笔者利用 `babel` 将源码解析成 `ast`，并格式化成对应的`less/css/scss`文件;其核心解析库为[parse-jsx-to-css](https://github.com/MrGaoGang/parse-jsx-to-css);

目前支持:

- 将`React`的`class/function`组件解析成`less/css/scss`;
- 将`Vue`的组件解析成`less/css/scss`;
- `React` 中支持多个组件样式

暂未支持:

- `class/className`表达式的情况

**一个简单的例子**

**React** 代码:

```js
import React, { PureComponent } from "react";
function LoginButton() {
  return <div className="login-button"></div>;
}
class Demo extends PureComponent {
  render() {
    return (
      <div className="login-container">
        <div className="login-container--user-name"></div>
        <div className="login-container--password"></div>
      </div>
    );
  }
}

export default Demo;
```

**生成的 less/scss 代码:**

```less
.login-button {
}

.login-container {
  &--user-name {
  }
  &--password {
  }
}
```

读到这里，激动的心油然而生，到底应该怎么去使用呢？

## 使用

为了照顾广大前端同学，笔者开发了`在线版本`以及`vscode`插件版本;后续将会支持`idea插件`

### 在线版本

[在线尝试](https://mrgaogang.github.io/parse-jsx-to-css-plugins/)

使用非常简单:

- 输入代码
- 选择要转换的框架和生成的格式

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d337b3f791a741dab9aa30e784e87f79~tplv-k3u1fbpfcp-watermark.image)

### vscode 插件

[vscoce 插件安装](https://marketplace.visualstudio.com/items?itemName=mrgaogang.parse-to-css-vscode-plugin)

使用此插件很简单，只需要在 vscode 的插件市场中搜索`parse-to-css-vscode-plugin`,在需要转换的文件(`vue/jsx/tsx/js`)文件中**右键**选择对应功能即可。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/734486dd6cca41908cbac8b965c5f476~tplv-k3u1fbpfcp-watermark.image)

## 开源

- [核心解析库: parse-jsx-to-css](https://github.com/MrGaoGang/parse-jsx-to-css)
- [在线及 vscode 插件: parse-jsx-to-css-plugins](https://github.com/MrGaoGang/parse-jsx-to-css-plugins)

欢迎各位同学一起共同维护此开源库，也欢迎各位 star;

作者: [mrgaogang](https://github.com/MrGaoGang/)
