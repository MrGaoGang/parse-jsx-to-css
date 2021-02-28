# parse-jsx-to-css

解析 `js/tsx/vue` 文件中的 `class`,自动生成对应的 `less/sass/css` 文件.

## 样例

**React** 代码

```js
import React, { PureComponent } from "react";
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

**生成的 less 文件**

```less
.login-container {
  &--user-name {
  }
  &--password {
  }
}
```

## 按照

```
npm install parse-jsx-to-css
```
