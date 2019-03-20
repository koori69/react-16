---
title: React 16 学习指北
date: 2019-03-20 10:00:58
tags: 
  - React
categories: 
  - 前端
      - React
---

# React 16 学习指北

## 创建项目

由于TypeScript的流行及语法的好用，所以以TypeScript来实现项目

```shell
create-react-app react16 --scripts-version=react-scripts-ts
```

在命令行输入上述指令后会自动创建项目，创建好后项目结构如下：

```shell
 node_modules
 public
 src
   App.css
   App.test.tsx
   App.tsx
   index.css
   index.tsx
   logo.svg
   registerServiceWorker.ts
 gitignore
 images.d.ts
 package.json
 README.md
 tsconfig.json
 tsconfig.prod.json
 tsconfig.test.json
 tslint.json
 yarn.lock
```

在src下创建目录components用来放之后我们自己写的组件。

修改tslint.json

```json
{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  },
  "rules": {
    "object-literal-sort-keys": false,
    "align": [false, "parameters", "arguments", "statements"],
    "ban": [true, ["angular", "forEach"]],
    "class-name": true,
    "comment-format": [false, "check-space", "check-lowercase"],
    "curly": true,
    "eofline": false,
    "forin": true,
    "interface-name": false,
    "jsdoc-format": true,
    "label-position": true,
    "label-undefined": true,
    "max-line-length": [false, 140],
    "no-any": false,
    "no-arg": true,
    "no-bitwise": true,
    "no-console": [false, "debug", "info", "time", "timeEnd", "trace"],
    "no-construct": true,
    "no-constructor-vars": false,
    "no-debugger": false,
    "no-duplicate-key": true,
    "no-shadowed-variable": false,
    "no-duplicate-variable": true,
    "no-empty": false,
    "no-eval": true,
    "no-require-imports": true,
    "no-string-literal": false,
    "no-switch-case-fall-through": false,
    "no-trailing-comma": true,
    "no-trailing-whitespace": true,
    "no-unreachable": true,
    "no-unused-expression": false,
    "no-unused-variable": true,
    "no-use-before-declare": true,
    "no-var-keyword": true,
    "no-var-requires": false,
    "one-line": [
      true,
      "check-catch",
      "check-else",
      "check-open-brace",
      "check-whitespace"
    ],
    "quotemark": [false, "single"],
    "radix": false,
    "semicolon": false,
    "triple-equals": [true, "allow-null-check"],
    "typedef": [
      false,
      "callSignature",
      "catchClause",
      "indexSignature",
      "parameter",
      "propertySignature",
      "variableDeclarator"
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "member-ordering": false,
    "ordered-imports": false,
    "use-strict": [true, "check-module", "check-function"],
    "whitespace": [
      false,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ]
  }
}
```

package.json内容如下

```json
{
  "name": "react16",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.8.4",
    "react-dom": "^16.8.4",
    "react-scripts-ts": "3.1.0"
  },
  "scripts": {
    "start": "react-scripts-ts start",
    "build": "react-scripts-ts build",
    "test": "react-scripts-ts test --env=jsdom",
    "eject": "react-scripts-ts eject"
  },
  "devDependencies": {
    "@types/jest": "^24.0.11",
    "@types/node": "^11.11.3",
    "@types/react": "^16.8.8",
    "@types/react-dom": "^16.8.2",
    "typescript": "^3.3.3333"
  }
}
```



## 基本概念

在JS中编写HTML一样的代码，JSX中使用的‘元素’不局限与HTML中的元素，可以是任何一个React组件。React判断一个元素是HTML元素还是React组件的原则是看第一个字母是否大写。用JS写React组件时文件名以jsx结尾，但以TypeScript写组件的时候，文件名以.tsx结尾。

React中两个重要的参数

- state

  state顾名思义就是状态，它只是用来控制这个组件本身自己的状态，可以用state来完成对行为的控制、数据的更新、界面的渲染。

  修改state值的时候用setState方法，而不要直接修改变量的值。

  每次state改变的时候都会触发页面的刷新

- props

  外部传入组件的属性，不能修改。

### 创建组件

js语法的自由性使得我们在定义组件的时候有多种选择

#### function组件（无状态组件）

function组件：

Button.tsx

```typescript
import * as React from 'react';

interface Props {
  onClick(e: React.MouseEvent<HTMLElement>): void;
}

const Button: React.FunctionComponent<Props> = ({
  onClick: handleClick,
  children
}) => <button onClick={handleClick}>{children}</button>;
export default Button;
```

Label.tsx
```typescript
import * as React from 'react';

interface Props {
  context?: string;
  key?: string;
  children?: React.ReactNode;
}

const Label: React.FunctionComponent<Props> = props => (
  <label key={props.key}>
    {props.children}-context:{props.context}
  </label>
);
Label.defaultProps = {
  context: "default context"
};
export default Label;
```

使用方法：

```typescript
 <Button onClick={this.buttonClick}>Label Component</Button>
 <Label context="test">Label Component</Label>
 <Label>Label Component</Label>

 private buttonClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };
```

function组件虽然便捷，但是无状态的，如果想要有状态的，就必须使用继承的方式。

#### 类组件（有状态组件）

定义一个简单的类组件

Input.tsx

```typescript
import * as React from 'react';

export default class Input extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        Input Component:
        <input />
      </div>
    );
  }
}
```

类组件通过继承Component的类，实现自己的render来创建。上面的组件现在和无状态的组件是一样的，因为还没有定义state，而且连props也没有定义。现在我们定义一下state，把它变成一个有状态的组件。

```typescript
import * as React from 'react';

interface State {
  defaultValue?: string;
}

export default class Input extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { defaultValue: "Input Name" };
  }

  public render() {
    return (
      <div>
        Input Component:
        <input defaultValue={this.state.defaultValue} />
      </div>
    );
  }
}
```

从上面可以看出，我们只定义了State，没有用到Props。当然也可以只定义Props，不定义State

```typescript
import * as React from 'react';

interface Props {
  defaultValue?: string;
}

export default class Input extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        Input Component:
        <input defaultValue={this.props.defaultValue} />
      </div>
    );
  }
}
```

#### 默认属性

TypeScript为我们方便的实现了给组件设置默认属性，可以直接使用 Label.defaultProps

```typescript
Label.defaultProps = {
  context: "default context"
};
```

但类组件中却没有defaultProps这个属性，类组件中要设置默认属性，需要定义高阶组件来组合默认属性。

```typescript
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export const withDefaultProps = <
  P extends object,
  DP extends Partial<P> = Partial<P>
>(
  defaultProps: DP,
  Cmp: React.ComponentType<P>
) => {
  type RequiredProps = Omit<P, keyof DP>;
  type Props = Partial<DP> & Required<RequiredProps>;
  Cmp.defaultProps = defaultProps;
  return (Cmp as React.ComponentType<any>) as React.ComponentType<Props>;
};
```

Input.tsx修改为

```typescript
import * as React from 'react';

import { withDefaultProps } from '../../utils/default-props';

// interface Props {
//   defaultValue?: string;
// }
const defaultProps = {
  defaultValue: "test"
};

type DefaultProps = Readonly<typeof defaultProps>;
type Props = { defaultValue?: string } & DefaultProps;

class Input extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
        Input Component:
        <input defaultValue={this.props.defaultValue} />
      </div>
    );
  }
}

export default withDefaultProps(defaultProps, Input);
```

### 事件处理

React的事件处理和DOM的类似，以获取Input的value值的改变来看看事件是如何处理的

```typescript
private handleInput = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  public render() {
    return (
      <div>
        Input Component:
        <input
          defaultValue={this.props.defaultValue}
          onInput={this.handleInput}
        />
        <label>{this.state.value}</label>
      </div>
    );
  }
```

定义处理onInput的方法，在方法中获取input的值，并更新到state中，在label中显示获取的值。

每次input的值变动都会触发页面的刷新。函数的入参需要根据具体的事件来定义，可参考编译器给出的提示。

在html开发中，我们往往会给标签自定义属性，然后在事件中获取属性，执行相应的功能。在React中同样可以这样做。我们给input增加个id的属性，在onInput中获取该属性的值。

```typescript
private handleInput = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e.target.attributes.getNamedItem('id'))
    this.setState({ value: e.target.value })
  }

<input
          id='react16'
          defaultValue={this.props.defaultValue}
          onInput={this.handleInput}
/>
```

### 条件加载

有时候我们希望页面显示的时候能根据某一个变量，达到不同的效果，例如列表显示，如果没有数据的时候就显示没有数据，有数据的时候，就加载具体内容。React给我们提供了好几种实现方法。

#### 元素变量

```typescript
export default class Condition extends React.Component {
  constructor(props: any) {
    super(props)
  }
  private isButton = false
  private buttonClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
  }
  public render() {
    let button: React.ReactNode
    if (this.isButton) {
      button = <Button onClick={this.buttonClick}>Condition Component</Button>
    } else {
      button = <Label>Condition Component</Label>
    }
    return <div>{button}</div>
  }
}
```

#### 内嵌的IF

```typescript
export default class Condition extends React.Component {
  constructor(props: any) {
    super(props)
  }
  private isButton = true
  private buttonClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
  }
  public render() {
    return (
      <div>
        {this.isButton && (
          <Button onClick={this.buttonClick}>Condition Component</Button>
        )}
      </div>
    )
  }
}
```

#### 三元表达式

```typescript
public render() {
    return (
      <div>
        {this.isButton ? (
          <Button onClick={this.buttonClick}>Condition Component</Button>
        ) : (
          <Label>Condition Component</Label>
        )}
      </div>
    )
  }
```

### List & Keys

React的渲染是会与上次渲染的Virtual DOM做对比的，发现差异时，只会去修改差异的部分。所以在循环定义组件的时候，需要指定元素的key，以提高渲染的效果。**key 必须是唯一的**

```typescript
import * as React from 'react';

const name = ['Tom', 'Jim', 'Dean']

export default class List extends React.Component {
  public render() {
    return (
      <div>
        {name.map((item: string) => (
          <label key={item}>{item}</label>
        ))}
      </div>
    )
  }
}

```

## 高级技能

### 代码分割

对应用进行代码分割能够“懒加载”当前用户所需要的内容，能够显著地提高应用性能。尽管并没有减少应用整体的代码体积，但可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量。

特别是当组件加载时间过长时，结合Suspense可以给用户更好的体验。

```typescript
const MyLabel = React.lazy(() => import('../concepts/Label'))
export default class Lazy extends React.Component {
  public render() {
    return (
      <div>
        <React.Suspense fallback='Loading...'>
          <MyLabel />
        </React.Suspense>
      </div>
    )
  }
}
```

> `React.lazy` 目前只支持默认导出（default exports）

### Context

