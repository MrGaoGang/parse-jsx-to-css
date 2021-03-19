# parse-jsx-to-css

Parse the `class/className` in the `react/vue` file, and automatically generate the `less/sass/css` file.

[中文介绍](./introduce.md)

## Usage

- [online](https://mrgaogang.github.io/parse-jsx-to-css-plugins/)
- [vscode plugins](https://marketplace.visualstudio.com/items?itemName=mrgaogang.parse-to-css-vscode-plugin)


## Feature

- [x] support `react` `className` to `less/css/sass`
- [x] support `vue` `class` to `less/css/sass`
- [x] support one file muti return method return `<div></div>`
- [ ] support `class/className` expression

## example

**React** code:

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

**generate less/sass code:**

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

**css code**

```css
.login-button {
}

.login-container {
}
.login-container .login-container--user-name {
}

.login-container .login-container--password {
}
```

## Install

```
npm install parse-jsx-to-css
```

## Config

| option        | type                  | required | default              | desc                                                                                                 |
| ------------- | --------------------- | -------- | -------------------- | ---------------------------------------------------------------------------------------------------- |
| input         | string                | true     | default is file path | if `transformType` is `code`,`input` must be `your code`, otherwise `input` must be `your file path` |
| callback      | function              | false    | (res)=>{}            | the parsed and formatted code                                                                        |
| transformType | `file or code`        | false    | `file`               | `input` type                                                                                         |
| language      | `react or vue`        | false    | `react`              |                                                                                                      |
| outType       | `less or css or sass` | false    | `less`               | the file save type, or code format type                                                              |
| outPath       | string                | false    | `./`                 | the output path relative to the `input` file, only use in `transformType:file`                       |
