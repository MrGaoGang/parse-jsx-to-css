# parse-jsx-to-css

Parse the `class/className` in the `react/vue` file, and automatically generate the `less/sass/css` file.

## Feature

- [x] support react className to less
- [x] support react className to css
- [x] support react className to sass
- [ ] support vue class to less
- [ ] support vue class to css
- [ ] support vue class to cass
- [ ] support file merge
- [ ] support one file muti return method return `<div></div>`
- [ ] other

## example

**React** code:

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

**generate less/sass code:**

```less
.login-container {
  &--user-name {
  }
  &--password {
  }
}
```

**css code**

```css
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
