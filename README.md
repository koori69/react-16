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

## 环境

- React 16.8.4
- Typescript 3.3.4000 

## 创建项目

由于TypeScript的流行及语法的严谨性，所以以TypeScript来实现项目

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
    ],
    "max-classes-per-file": false
  }
}
```

package.json内容如下

```json
{
  "name": "react16",
  "version": "0.1.0",
  "private": true,
  "homepage": ".",
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
    "typescript": "^3.3.4000"
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

提供了一个无需为每层组件手动添加props，就能在组件树间进行数据传递的方法。

我们用Context来实现一个根据权限显示不同内容的例子

创建context对象

```typescript
let permissions=['USER','PRODUCT','ORDER']

const PermissionContext = React.createContext(permissions)
```

> 当React渲染的一个订阅了这个Context对象的组件，这个组件从组件树中离自身最近的那个匹配的Provider中读取到当前的context值。
>
> 只有当组件所处的树中没有匹配到Provider时，其defaultValue参数才会生效。

创建消费者组件

```typescript
const UserMemu: React.FunctionComponent = props => (
  <PermissionContext.Consumer>
    {list => {
      if (list.indexOf('USER') > -1) {
        return <h1>HAS USER MENU</h1>
      } else {
        return <h1>NO USER MENU</h1>
      }
    }}
  </PermissionContext.Consumer>
)

const ProductMemu: React.FunctionComponent = props => (
  <PermissionContext.Consumer>
    {list => {
      if (list.indexOf('PRODUCT') > -1) {
        return <h1>HAS PRODUCT MENU</h1>
      } else {
        return <h1>NO PRODUCT MENU</h1>
      }
    }}
  </PermissionContext.Consumer>
)

const OrderMemu: React.FunctionComponent = props => (
  <PermissionContext.Consumer>
    {list => {
      if (list.indexOf('ORDER') > -1) {
        return <h1>HAS ORDER MENU</h1>
      } else {
        return <h1>NO ORDER MENU</h1>
      }
    }}
  </PermissionContext.Consumer>
)
```

创建导航组件

```typescript
interface IState {
  permissions: string[]
}
export default class Navigator extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = { permissions }
  }

  private addUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const p = this.state.permissions
    if (p.indexOf('USER') < 0) {
      p.push('USER')
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  private removeUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const p = this.state.permissions
    if (p.indexOf('USER') > -1) {
      p.splice(p.indexOf('USER'), 1)
      this.setState({ permissions: p })
    }
    console.log(p)
  }

  private addProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const p = this.state.permissions
    if (p.indexOf('PRODUCT') < 0) {
      p.push('PRODUCT')
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  private removeProduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const p = this.state.permissions
    if (p.indexOf('PRODUCT') > -1) {
      p.splice(p.indexOf('PRODUCT'), 1)
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  private addOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const p = this.state.permissions
    if (p.indexOf('ORDER') < 0) {
      p.push('ORDER')
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  private removeOrder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const p = this.state.permissions
    if (p.indexOf('ORDER') > -1) {
      p.splice(p.indexOf('ORDER'), 1)
      this.setState({ permissions: p })
    }
    console.log(p)
  }
  public render() {
    return (
      <div>
        <PermissionContext.Provider value={permissions}>
          <UserMemu />
          <ProductMemu />
          <OrderMemu />
        </PermissionContext.Provider>
        <button onClick={this.addUser}>add user permission</button>
        <button onClick={this.removeUser}>remove user permission</button>
        <button onClick={this.addProduct}>add product permission</button>
        <button onClick={this.removeProduct}>remove product permission</button>
        <button onClick={this.addOrder}>add order permission</button>
        <button onClick={this.removeOrder}>remove order permission</button>
      </div>
    )
  }
}
```

> <PermissionContext.Provider value={permissions}> 这里没有使用this.state.permission，因为二者其实是指向同一个地址的，所以效果等价

### 异常捕获边界

部分UI中的JavaScript错误不应该破坏整个应用程序。 为了解决React用户的这个问题，React 16引入了一个新的“错误边界”概念。

错误边界是React组件，它们在其子组件树中的任何位置捕获JavaScript错误，记录这些错误，并显示回退UI而不是崩溃的组件树。 错误边界在渲染期间，生命周期方法以及它们下面的整个树的构造函数中捕获错误。

**定义：**类组件实现以下方法的一个或都实现，

- `static getDerivedStateFromError()`

  在错误发生后加载fallback UI

- `componentDidCatch()`

  记录错误信息

**二者的比较**：

`componentDidCatch`:

-  总是在浏览器中调用
- 在DOM已经更新的“提交阶段”期间调用
- 应该用于错误报告之类的东西

`getDerivedStateFromError`:

- 在服务器端呈现期间也会调用
- 当DOM尚未更新时，在“提交阶段”之前调用
- 应该用于渲染回退UI

**可以捕获在组件树内的错误信息，但以下错误无法捕获：**

- 事件的处理方法
- 异步代码（回调)
- 服务端加载
- 由异常捕获边界内发生的错误

创建个异常捕获边界组件

```typescript
import * as React from 'react';

interface IErrorBoundryState {
  error?: any
}

export default class ErrorBoundary extends React.Component<
  {},
  IErrorBoundryState
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  public static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { error }
  }

  public componentDidCatch(error: any) {
    // You can also log the error to an error reporting service
    this.setState({
      error
    })
  }

  public render() {
    if (this.state.error) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.stack}
          </details>
        </div>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}
```

修改Navigator.tsx

```typescript
public render() {
    if (this.state.permissions.length === 0) {
      throw new Error('no data')
    }
    ...
}
```

这样当permissions中没有数据时就会抛出异常，然后异常就会被捕获，并在页面端显示，整个页面也照样可以正常进行。**出错的UI会被React从页面端删除**

### Refs转发

Ref forwarding是一种自动将ref通过组件传递给其子节点的技术。 对于应用程序中的大多数组件，这通常不是必需的。 但是，它对某些类型的组件很有用，尤其是在可重用的组件库中。 最常见的方案如下所述。

#### DOM组件的Ref转发

```typescript
const FancyButton: React.FunctionComponent = ({ children }) => (
  <button>{children}</button>
)
```

React组件隐藏其实现细节，包括其渲染输出。 使用FancyButton的其他组件通常不需要获取内部按钮DOM元素的ref。 这很好，因为它可以防止组件过多依赖彼此的DOM结构。

虽然这种封装对于像FeedStory或Comment这样的应用程序级组件是理想的，但对于像FancyButton或MyTextInput这样的高度可重用的“叶子”组件来说可能是不方便的。 这些组件倾向于以与常规DOM按钮和输入类似的方式在整个应用程序中使用，并且访问其DOM节点对于管理焦点，选择或动画可能是不可避免的。

ref转发是一种选择加入功能，允许某些组件接收它们接收的引用，并将其进一步向下传递（换句话说，“转发”它）给孩子。

在下面的示例中，FancyButton使用React.forwardRef来获取传递给它的ref，然后将其转发到它呈现的DOM按钮：

```typescript
interface Props {
  children?: React.ReactNode
}

const FancyButton = React.forwardRef(
  (props: Props, ref: React.RefObject<HTMLButtonElement>) => (
    <button ref={ref}>{props.children}</button>
  )
)

```

使用
```typescript
const ref: React.RefObject<HTMLButtonElement> = React.createRef()

 <FancyButton ref={ref}>FancyButton</FancyButton>
```

> 此时ref.current指向了`<button>` Dom
>
> 第二个ref参数仅在使用React.forwardRef调用定义组件时才存在。 常规函数或类组件不接收ref参数，并且在props中也不提供ref。
>
> Ref转发不仅限于DOM组件。 也可以将refs转发给类组件实例。

#### 高阶组件的refs转发

需要转发的组件

```typescript
export default class FancyButton2 extends React.Component<any> {
  public myRef = React.createRef<HTMLButtonElement>()

  public render() {
    const { label, onClick } = this.props
    return (
      <button ref={this.myRef} onClick={onClick}>
        {label}
      </button>
    )
  }
}
```

定义一个高阶组件

```typescript
function logProps(WrappedComponent: any) {
  class LogProps extends React.Component<any> {
    public componentDidUpdate(prevProps: any) {
      console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    public render() {
      return <WrappedComponent {...this.props} />
    }
  }
  return LogProps
}
```

修改FancyButton

```typescript
export default logProps(FancyButton)
```

到使用的地方，就会发现报一下错误：

```typescript
不能将类型“RefObject<HTMLButtonElement>”分配给类型“string | ((instance: LogProps | null) => void) | RefObject<LogProps> | null | undefined”。
  不能将类型“RefObject<HTMLButtonElement>”分配给类型“RefObject<LogProps>”。
```

那是因为ref不是道具。 和密钥一样，它的处理方式与React不同。 如果将引用添加到HOC，则引用将引用最外面的容器组件，而不是包装组件。这意味着用于我们的FancyButton组件的ref实际上将附加到LogProps组件。

> 使用JS时不会报错，但实际的行为与预期的就不同，需要注意

Typescript中，需要使用React.forwardRef API将refs显式转发到内部FancyButton组件。 React.forwardRef接受一个渲染函数，该函数接收props和ref参数并返回一个React节点。

修改高阶组件

```typescript
export function logPropsRef<
  T extends React.Component,
  OriginalProps extends {}
>(WrappedComponent: React.ComponentClass<OriginalProps>) {
  interface RefProps {
    forwardedRef?: React.RefObject<T>
  }
  type Props = OriginalProps & RefProps

  class LogProps extends React.Component<Props> {
    public componentDidUpdate(prevProps: any) {
      console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    public render() {
      const { forwardedRef, ...restProps } = this.props as RefProps
      const rest = restProps as OriginalProps
      return <WrappedComponent ref={forwardedRef} {...rest} />
    }
  }
  const RefFactory = (props: Props, ref: T) => (
    <LogProps {...props} forwardedRef={ref} />
  )
  return React.forwardRef<T, OriginalProps>(RefFactory as any)
}
```

使用的地方

```typescript
const ref2 = React.createRef<FancyButton2>()
const HOCButton = logPropsRef(FancyButton2)

<HOCButton ref={ref2} label='FancyButton2' onClick={this.hocClick} />
    
private hocClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    console.log(ref2.current)
    const b = ref2.current
    b!.myRef.current!.focus()
    b!.myRef.current!.disabled = true
  }
```

React.forwardRef接受渲染函数。 React DevTools使用此函数来确定要为ref转发组件显示的内容。可以自定义显示的内容，修改高阶函数：

```typescript
export function logPropsRef<
  T extends React.Component,
  OriginalProps extends {}
>(WrappedComponent: React.ComponentClass<OriginalProps>) {
    ...
    const RefFactory = (props: Props, ref: T) => (
    <LogProps {...props} forwardedRef={ref} />
  )
  const name = WrappedComponent.displayName || WrappedComponent.name
  RefFactory.displayName = `logProps(${name})`
  return React.forwardRef<T, OriginalProps>(RefFactory as any)
}
```

### 片段Fragments

React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

```typescript
const Column: React.FunctionComponent = props => (
  //  正常语法  
  //   <React.Fragment>
  //     <td>Hello</td>
  //     <td>World</td>
  //   </React.Fragment>
  // 短语法，但很多工具不支持，使用时要注意
  <>
    <td>Hello</td>
    <td>World</td>
  </>
)
export default Column
```

**使用场景**：

当一个组件要一次返回多个元素，而且不能在这些元素外再加一层的情况下，就可以使用Fragments

### 高阶组件（Higher-Order Components）

高阶组件（HOC）是React中用于重用组件逻辑的高级技术。 HOC本身不是React API的一部分。 它们是React组成性质的一种模式。具体地说，高阶组件是一个获取组件并返回新组件的函数。

组件将props转换为UI，而高阶组件将组件转换为另一个组件。

HOC在第三方React库中很常见，例如Redux的connect和Relay的createFragmentContainer。

使用例子可以参考Refs转发

定义高阶组件**惯例**：

- 不要改变原始组件。 使用组合物。
- 可以将不相关的props传递到包裹的组件
- 最大化可组合性
- 包装显示名称以便轻松调试

**注意事项**：

- 不要在渲染方法中使用HOC

  React的差异算法（称为协调）使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从render返回的组件与前一个渲染中的组件相同（===），则React通过将子树与新子进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树。

  通常，不应该考虑这个。 但它对于HOC很重要，因为这意味着无法将HOC应用于组件的render方法中的组件，因为每次调用的HOC都会生成新的对象

- 静态方法必须复制
  有时在React组件上定义静态方法很有用。 例如，Relay容器公开了一个静态方法getFragment，以便于GraphQL片段的组合。

  但是，当HOC应用于组件时，原始组件将使用容器组件进行包装。 这意味着新组件没有原始组件的任何静态方法。

### 协调

在某一时间节点调用 React 的 `render()` 方法，会创建一棵由 React 元素组成的树。在下一次 state 或 props 更新时，相同的 `render()` 方法会返回一棵不同的树。React 需要基于这两棵树之间的差别来判断如何有效率的更新 UI 以保证当前 UI 与最新的树保持同步。

这个算法问题有一些通用的解决方案，即生成将一棵树转换成另一棵树的最小操作数。 然而，即使在[最前沿的算法中](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)，该算法的复杂程度为 O(n 3 )，其中 n 是树中元素的数量。

如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。于是 React 在以下两个假设的基础之上提出了一套 O(n) 的启发式算法：

1. 两个不同类型的元素会产生出不同的树；
2. 开发者可以通过 `key` prop 来暗示哪些子元素在不同的渲染下能保持稳定；

在实践中，发现以上假设在几乎所有实用的场景下都成立。

#### diffing算法

当对比两颗树时，React 首先比较两棵树的根节点。不同类型的根节点元素会有不同的形态。

##### 比对不同类型的元素

当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树。举个例子，当一个元素从 `<a>` 变成 `<img>`，从 `<Article>` 变成 `<Comment>`，或从 `<Button>` 变成 `<div>` 都会触发一个完整的重建流程。

当拆卸一颗树时，对应的 DOM 节点也会被销毁。组件实例将执行 `componentWillUnmount()`方法。当建立一颗新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 `componentWillMount()` 方法，紧接着 `componentDidMount()` 方法。所有跟之前的树所关联的 state 也会被销毁。

在根节点以下的组件也会被卸载，它们的状态会被销毁。

##### 比对同一类型的元素

当比对两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。比如：

```
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

通过比对这两个元素，React 知道只需要修改 DOM 元素上的 `className` 属性。

当更新 `style` 属性时，React 仅更新有所更变的属性。比如：

```
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```

通过比对这两个元素，React 知道只需要修改 DOM 元素上的 `color` 样式，无需修改 `fontWeight`。

在处理完当前节点之后，React 继续对子节点进行递归。

##### 比对同类型的组件元素

当一个组件更新时，组件实例保持不变，这样 state 在跨越不同的渲染时保持一致。React 将更新该组件实例的 props 以跟最新的元素保持一致，并且调用该实例的`componentWillReceiveProps()` 和 `componentWillUpdate()` 方法。

下一步，调用 `render()` 方法，diff 算法将在之前的结果以及新的结果中进行递归。

##### 对子节点进行递归

在默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。

在子元素列表末尾新增元素时，更变开销比较小。比如：

```
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

React 会先匹配两个 `<li>first</li>` 对应的树，然后匹配第二个元素 `<li>second</li>` 对应的树，最后插入第三个元素的 `<li>third</li>` 树。

如果简单实现的话，那么在列表头部插入会很影响性能，那么更变开销会比较大。比如：

```
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

React 会针对每个子元素 mutate 而不是保持相同的 `<li>Duke</li>` 和 `<li>Villanova</li>`子树完成。这种情况下的低效可能会带来性能问题。

#### Keys

为了解决以上问题，React 支持 `key` 属性。当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。以下例子在新增 `key` 之后使得之前的低效转换变得高效：

```
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

现在 React 知道只有带着 `'2014'` key 的元素是新元素，带着 `'2015'` 以及 `'2016'` key 的元素仅仅移动了。

现实场景中，产生一个 key 并不困难。你要展现的元素可能已经有了一个唯一 ID，于是 key 可以直接从你的数据中提取：

```
<li key={item.id}>{item.name}</li>
```

当以上情况不成立时，可以新增一个 ID 字段到模型中，或者利用一部分内容作为哈希值来生成一个 key。这个 key 不需要全局唯一，但在列表中需要保持唯一。

最后，也可以使用元素在数组中的下标作为 key。这个策略在元素不进行重新排序时比较合适，但一旦有顺序修改，diff 就会变得慢。

当基于下标的组件进行重新排序时，组件 state 可能会遇到一些问题。由于组件实例是基于它们的 key 来决定是否更新以及复用，如果 key 是一个下标，那么修改顺序时会修改当前的 key，导致非受控组件的 state（比如输入框）可能相互篡改导致无法预期的变动。

#### 权衡

请谨记协调算法是一个实现细节。React 可以在每个 action 之后对整个应用进行重新渲染，得到的最终结果也会是一样的。在这个上下文下，重新渲染表示在所有组件内调用 `render` 方法，这不代表 React 会卸载或装载它们。React 只会基于以上提到的规则来决定如何进行差异的合并。

经常改善启发性算法让常用的使用用例更有效的执行。在当前的实现中，可以表达一棵子树在兄弟节点之间移动，但不能表达它移动到其他未知。在这种情况下，算法会重新渲染那棵子树。

由于 React 依赖启发性算法，如果以下假设没有得到满足，性能会有所损耗。

1. 该算法不会尝试匹配不同组件类型的子树。如果发现在两种不同类型的组件中切换，但输出非常相似的内容，建议把它们改成同一类型。

2. Keys 应该具有稳定，可预测，以及列表内唯一的特质。不稳定的 key（比如通过 `Math.random()` 生成的）会导致许多组件实例和 DOM 节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失。

### Ref & DOM

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

#### 何时使用 Refs

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。

举个例子，避免在 `Dialog` 组件里暴露 `open()` 和 `close()` 方法，最好传递 `isOpen` 属性。

#### 勿过度使用 Refs

可能首先会想到使用 refs 在 app 中“让事情发生”。如果是这种情况，请花一点时间，认真再考虑一下 state 属性应该被安排在哪个组件层中。通常会想明白，让更高的组件层级拥有这个 state，是更恰当的。查看 [状态提升](https://zh-hans.reactjs.org/docs/lifting-state-up.html) 以获取更多有关示例。

> 注意
>
> 下面的例子已经更新为使用在 React 16.3 版本引入的 `React.createRef()` API。如果你正在使用一个较早版本的 React，我们推荐你使用[回调形式的 refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)。

#### 创建 Refs

Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```typescript
export default class Ref extends React.Component {
  constructor(props: any) {
    super(props)
  }
  private divRef = React.createRef<HTMLDivElement>()
  render() {
    return <div ref={this.divRef}>Ref Example</div>
  }
}
```

#### 访问 Refs

当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

```
const node = this.myRef.current;
```

ref 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- **不能在函数组件上使用 ref 属性**，因为他们没有实例。

以下例子说明了这些差异。

##### 为 DOM 元素添加 ref

以下代码使用 `ref` 去存储 DOM 节点的引用：

```typescript
export default class CustomTextInput extends React.Component {
  private textInput = React.createRef<HTMLInputElement>()
  private focusTextInput = () => {
    this.textInput.current!.focus()
  }

  public render() {
    return (
      <div>
        <input type='text' ref={this.textInput} />
        <input
          type='button'
          value='Focus the text input'
          onClick={this.focusTextInput}
        />
      </div>
    )
  }
}
```

React 会在组件挂载时给 `current` 属性传入 DOM 元素，并在组件卸载时传入 `null` 值。`ref`会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新。

##### 为 class 组件添加 Ref

如果我们想包装上面的 `CustomTextInput`，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 `focusTextInput` 方法：

```typescript
class AutoFocusTextInput extends React.Component {
  private textInput = React.createRef<HTMLInputElement>()

  componentDidMount() {
    this.textInput.current!.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

请注意，这仅在 `CustomTextInput` 声明为 class 时才有效：

```typescript
class CustomTextInput extends React.Component {
  // ...
}
```

##### Refs 与函数组件

**你不能在函数组件上使用 ref 属性**，因为它们没有实例：

```
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

如果你需要使用 ref，你应该将组件转化为一个 class，就像当你需要使用生命周期钩子或 state 时一样。

不管怎样，你可以**在函数组件内部使用 ref 属性**，只要它指向一个 DOM 元素或 class 组件：

```javascript
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 才可以引用它
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

#### 将 DOM Refs 暴露给父组件

在极少数情况下，可能希望在父组件中引用子节点的 DOM 节点。通常不建议这样做，因为它会打破组件的封装，但它偶尔可用于触发焦点或测量子 DOM 节点的大小或位置。

虽然可以[向子组件添加 ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component)，但这不是一个理想的解决方案，因为只能获取组件实例而不是 DOM 节点。并且，它还在函数组件上无效。

如果使用 16.3 或更高版本的 React, 这种情况下我们推荐使用 [ref 转发](https://zh-hans.reactjs.org/docs/forwarding-refs.html)。**Ref 转发使组件可以像暴露自己的 ref 一样暴露子组件的 ref**。关于怎样对父组件暴露子组件的 DOM 节点，在 [ref 转发文档](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)中有一个详细的例子。

如果你使用 16.2 或更低版本的 React，或者你需要比 ref 转发更高的灵活性，你可以使用[这个替代方案](https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509)将 ref 作为特殊名字的 prop 直接传递。

可能的话，我们不建议暴露 DOM 节点，但有时候它会成为救命稻草。注意这个方案需要你在子组件中增加一些代码。如果你对子组件的实现没有控制权的话，你剩下的选择是使用 [`findDOMNode()`](https://zh-hans.reactjs.org/docs/react-dom.html#finddomnode)，但在[`严格模式`](https://zh-hans.reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage) 下已被废弃且不推荐使用。

#### 回调 Refs

React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。

不同于传递 `createRef()` 创建的 `ref` 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。

下面的例子描述了一个通用的范例：使用 `ref` 回调函数，在实例的属性中存储对 DOM 节点的引用。

```typescript
export default class CustomTextInput extends React.Component {
  private textInput: HTMLInputElement
  private setTextRef = (element: HTMLInputElement) => {
    this.textInput = element
  }
  private focusTextInput = () => {
    this.textInput.focus()
  }

  public render() {
    return (
      <div>
        <input type='text' ref={this.setTextRef} />
        <input
          type='button'
          value='Focus the text input'
          onClick={this.focusTextInput}
        />
      </div>
    )
  }
}
```

React 将在组件挂载时，会调用 `ref` 回调函数并传入 DOM 元素，当卸载时调用它并传入 `null`。在 `componentDidMount` 或 `componentDidUpdate` 触发前，React 会保证 refs 一定是最新的。

可以在组件间传递回调形式的 refs，就像可以传递通过 `React.createRef()` 创建的对象 refs 一样。

```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

在上面的例子中，`Parent` 把它的 refs 回调函数当作 `inputRef` props 传递给了 `CustomTextInput`，而且 `CustomTextInput` 把相同的函数作为特殊的 `ref` 属性传递给了 `<input>`。结果是，在 `Parent` 中的 `this.inputElement` 会被设置为与 `CustomTextInput` 中的 `input` 元素相对应的 DOM 节点。

#### 过时 API：String 类型的 Refs

如果之前使用过 React，可能了解过之前的 API 中的 string 类型的 ref 属性，例如 `"textInput"`。你可以通过 `this.refs.textInput` 来访问 DOM 节点。不建议使用它，因为 string 类型的 refs 存在 [一些问题](https://github.com/facebook/react/pull/8333#issuecomment-271648615)。它已过时并可能会在未来的版本被移除。

> 注意
>
> 如果目前还在使用 `this.refs.textInput` 这种方式访问 refs ，我们建议用[回调函数](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)或 [`createRef` API](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#creating-refs) 的方式代替。

#### 关于回调 refs 的说明

如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

### Render Props

指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。

```
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

使用 render prop 的库有 [React Router](https://reacttraining.com/react-router/web/api/Route/render-func) 和 [Downshift](https://github.com/paypal/downshift).

使用例子：一个组件用来捕捉鼠标的位置，并保存在state中，在组件内显示值。现在想要复用这个行为，一般可以组合组件为新的组件。但这样需要生成新的组件，而且对于不同需要该行为的组件的都要重新封装，并不能达到高度可复用，而render props就解决了这样的问题。

定义个捕获鼠标位置的组件，同时支持children加载

```typescript
interface State {
  x: number
  y: number
}

interface Props {
  render: (state: State) => any
  children?: React.ReactNode
}
export default class Mouse extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = { x: 0, y: 0 }
  }

  private handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log('mouse:', e)
    this.setState({ x: e.clientX, y: e.clientY })
  }

  public render() {
    return (
      <div
        style={{ height: '100%', width: '100%', background: '#F596AA' }}
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)}
        {this.props.children}
      </div>
    )
  }
}
```

```typescript
interface State {
  x: number
  y: number
}

interface Props {
  mouse?: State
  children?: React.ReactNode
}

const Cat: React.FunctionComponent<Props> = (props: Props) => (
  <div
    style={{
      background: '#6E75A4',
      position: 'absolute',
      left: props.mouse!.x,
      top: props.mouse!.y
    }}
  >
    Cat
  </div>
)

export default Cat
```

使用的地方

```typescript
<div>
    <h1>移动鼠标</h1>
    <Mouse render={this.cat} />
</div>

private cat = (mouse: any) => <Cat mouse={mouse} />
```

提供了一个 `render` 方法 让 `<Mouse>` 能够动态决定什么需要渲染，而不是克隆 `<Mouse>` 组件然后硬编码来解决特定的用例。

更具体地说，**render prop 是一个用于告知组件需要渲染什么内容的函数 prop。**

**不一定要定义成render，可以任意的名字，只是一个函数的名字而已**

> 注意事项
>
> 将 Render Props 与 React.PureComponent 一起使用时要小心
>
> 如果你在 render 方法里创建函数，那么使用 render prop 会抵消使用 [`React.PureComponent`](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent) 带来的优势。因为浅比较 props 的时候总会得到 false，并且在这种情况下每一个 `render` 对于 render prop 将会生成一个新的值。
>
> 例子中的使用情况不受影响，以下的使用情况有影响：
>
> ```typescript
> <Mouse render={mouse => <Cat mouse={mouse} />} />
> ```

## Hook

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

Hook 是向下兼容的。

Hook 是一些可以在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

**即，使用Hook使函数组件有状态化**

React 内置了一些像 `useState` 这样的 Hook。也可以创建自己的 Hook 来复用不同组件之间的状态逻辑。

**使用规则**

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中）

### State Hook

`useState` 就是一个 *Hook* 。通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。`useState` 会返回一对值：**当前**状态和一个更新它的函数，可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并，更新 state 变量总是*替换*它而不是合并它。

`useState` 唯一的参数就是初始 state。值得注意的是，不同于 `this.state`，这里的 state 不一定要是一个对象 —— 如果有需要，它也可以是。这个初始 state 参数只有在第一次渲染的会被用到。

可以在一个组件中多次使用 State Hook。

通过用State Hook实现一个计数的组件来理解Hook的使用。

```typescript
const Count: React.FunctionComponent = () => {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <p>You Clicked {count} Times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  )
}
```

上述组件就将函数组件有状态化了，每次点击的时候计数就会增加。

现在来看看使用多个useState的情况

```typescript
const Count: React.FunctionComponent = () => {
  const [count, setCount] = React.useState(0)
  const [time, setTime] = React.useState(new Date().toLocaleTimeString())
  return (
    <div>
      <p>
        You Clicked {count} Times, Updated At {time}
      </p>
      <button
        onClick={() => {
          setCount(count + 1)
          setTime(new Date().toLocaleTimeString())
        }}
      >
        Click Me
      </button>
    </div>
  )
}
```

当然也可以合并相关的变量，不要重复定义多个

```typescript
interface State {
  count: number
  time: string
}

const Count: React.FunctionComponent = () => {
  const [info, setInfo] = React.useState<State>({
    count: 0,
    time: new Date().toLocaleTimeString()
  })

  return (
    <div>
      <p>
        You Clicked {info.count} Times, Updated At {info.time}
      </p>
      <button
        onClick={() => {
          setInfo({
            count: info.count + 1,
            time: new Date().toLocaleTimeString()
          })
        }}
      >
        Click Me
      </button>
    </div>
  )
}
```

### Effect Hook

在 React 组件中数据获取、订阅或者手动修改过 DOM。统一把这些操作称为“副作用”，或者简称为“作用”。

`useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，React 会在每次渲染后调用副作用函数 —— **包括**第一次渲染的时候。

副作用函数还可以通过返回一个函数来指定如何“清除”副作用。

可以在一个组件中多次使用 Effect Hook，按照 effect 声明的顺序依次调用组件中的*每一个* effect

给刚刚的计数组件加一个热度显示，来展示欢迎程度，当点击到7时，热度就会重置，同时页面的title也会被修改。

```typescript
interface State {
  count: number
  time: string
}
const colors: string[] = [
  '#FFBBFF',
  '#EEAEEE',
  '#CD96CD',
  '#E066FF',
  '#D15FEE',
  '#B452CD',
  '#7A378B'
]
const Count: React.FunctionComponent = () => {
  const [info, setInfo] = React.useState<State>({
    count: 0,
    time: new Date().toLocaleTimeString()
  })
  const [hot, setHot] = React.useState('Hot')
  const color = colors[info.count % colors.length]
  React.useEffect(() => {
    document.title = `You clicked ${info.count} times`
    setHot(`Hot ${info.count % colors.length}`)
  })

  return (
    <div>
      <p>
        You Clicked {info.count} Times, Updated At {info.time}
      </p>
      <p>
        <label
          id='hot'
          style={{
            backgroundColor: color,
            width: '20px',
            height: '20px',
            color: 'white'
          }}
        >
          {hot}
        </label>
      </p>
      <button
        onClick={() => {
          setInfo({
            count: info.count + 1,
            time: new Date().toLocaleTimeString()
          })
        }}
      >
        Click Me
      </button>
    </div>
  )
}
```

effect中可以返回一个函数，该函数就是清除函数，在组件卸载的时候被执行。因为effect在每次渲染的时候都会被执行，所以在执行当前effect之前会对上一个effect进行清除。

**effect的第二个参数值，表示要观测的更新值，当这个值变化时才进行更新。如果只想被更新一次，可以传入空数组**

将上面的effect修改为以下，就只会在加载时被设置

```typescript
React.useEffect(() => {
    document.title = `You clicked ${info.count} times`
    setHot(`Hot ${info.count % colors.length}`)
  }, [])
```

### Context Hook

`useContext`接受上下文对象（从React.createContext返回的值）并返回该上下文的当前上下文值。 当前上下文值由树中调用组件上方最近的<MyContext.Provider>的值prop确定。

当组件上方最近的<MyContext.Provider>更新时，此Hook将触发重新呈现，并将最新的上下文值传递给该MyContext提供程序。

> useContext（MyContext）等同于类中的静态contextType = MyContext，或者等同于<MyContext.Consumer>。
>
> useContext（MyContext）只允许读取上下文并订阅其更改。 仍然需要树中的<MyContext.Provider>来提供此上下文的值。

使用`useContext`来重写下Navigator组件

```typescript
const permissions = ['USER']
const PermissionContext = React.createContext(permissions)

const UserMenu: React.FunctionComponent = props => {
  const list: string[] = React.useContext(PermissionContext)
  return (
    <>
      {list.indexOf('USER') > -1 ? (
        <h1>HAS USER MENU</h1>
      ) : (
        <h1>NO USER MENU</h1>
      )}
    </>
  )
}

const ContextHook: React.FunctionComponent = () => {
  const [info, setInfo] = React.useState(permissions)

  const addUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (info.indexOf('USER') < 0) {
      setInfo([...info, 'USER'])
    }
  }

  const removeUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (info.indexOf('USER') > -1) {
      info.splice(info.indexOf('USER'), 1)
      setInfo([...info])
    }
  }

  return (
    <div>
      <PermissionContext.Provider value={info}>
        <UserMenu />
      </PermissionContext.Provider>
      <button onClick={addUser}>add user permission</button>
      <button onClick={removeUser}>remove user permission</button>
    </div>
  )
}
export default ContextHook
```

### Reducer Hook

`useReducer(reducer, initialArg, init)`

useState的替代方案。 接受类型为（state，action）=> newState的reducer，并返回与dispatch方法配对的当前状态。 （如果熟悉Redux，已经知道它是如何工作的。）

当具有涉及多个子值的复杂状态逻辑或下一个状态取决于前一个状态时，useReducer通常优于useState。 useReducer还允许优化触发深度更新的组件的性能，因为可以传递调度而不是回调。

> React保证调度函数标识是稳定的，并且在重新渲染时不会改变。 这就是为什么可以安全地省略useEffect或useCallback依赖项列表。

用新语法来实现下学习Redux时，典型的示例

```typescript
interface State {
  count: number
}

interface Action {
  type: string
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}
const ReducerHook: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 })

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}

export default ReducerHook
```

#### 延迟初始化

还可以懒惰地创建初始状态。 为此，可以将init函数作为第三个参数传递。 初始状态将设置为init（initialArg）。

它允许提取用于计算reducer外部的初始状态的逻辑。 这对于稍后重置状态以响应操作也很方便：

```typescript
interface Props {
  count: number
}
const ReducerHook: React.FunctionComponent<Props> = props => {
  const [state, dispatch] = React.useReducer(reducer, props.count, init)
  ...
}
  
 <ReducerHook count={1} />
```



### Callback Hook

```
useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
)
```

返回一个memoized回调。

传递内联回调和一系列依赖项。 useCallback将返回一个回调的memoized版本，该版本仅在其中一个依赖项发生更改时才会更改。 将回调传递给依赖于引用相等性的优化子组件以防止不必要的渲染（例如，shouldComponentUpdate）时，这非常有用。

useCallback（fn，deps）等效于useMemo（（）=> fn，deps）。

> `useCallback` 的真正目的还是在于缓存了每次渲染时 inline callback 的实例，这样方便配合上子组件的 `shouldComponentUpdate` 或者 `React.memo` 起到减少不必要的渲染的作用。需要不断提醒自己注意的是，在大部分 `callback` 都会是 `inline callback` 的未来，`React.memo` 和 `React.useCallback` 一定记得需要配对使用，缺了一个都可能导致性能不升反“降”，毕竟无意义的浅比较也是要消耗那么一点点点的性能。

### Memo Hook

`useMemo(() => computeExpensiveValue(a, b), [a, b]);`

返回一个memoized值。

传递“创建”函数和依赖项数组。 useMemo只会在其中一个依赖项发生更改时重新计算memoized值。 此优化有助于避免在每个渲染上进行昂贵的计算。

**传递给useMemo的函数在渲染期间运行。** 不要做那些在渲染时通常不会做的事情。 例如，副作用属于useEffect，而不是useMemo。

如果未提供数组，则将在每个渲染上计算新值。

可以依赖useMemo作为性能优化，而不是语义保证。 将来，React可能会选择“忘记”一些以前记忆的值，并在下一次渲染时重新计算它们，例如 为屏幕外组件释放内存。 编写代码，使其在没有useMemo的情况下仍可正常工作 - 然后添加它以优化性能。

> 依赖项数组不作为参数传递给函数。 但从概念上讲，这就是它们所代表的内容：函数内引用的每个值也应出现在依赖项数组中。 将来，一个足够先进的编译器可以自动创建这个数组。

### Ref Hook

`useRef(initialValue);`

useRef返回一个可变的ref对象，其.current属性被初始化为传递的参数（initialValue）。 返回的对象将持续整个组件的生命周期。

从本质上讲，useRef就像一个“盒子”，可以在其.current属性中保存一个可变值。

可能熟悉refs主要是作为访问DOM的一种方式。 如果使用`<div ref = {myRef} />`将ref对象传递给React，只要该节点发生更改，React就会将其`.current`属性设置为相应的DOM节点。

但是，useRef（）比ref属性更有用。 保持任何可变值的方法类似于在类中使用实例字段的方法。

这是有效的，因为useRef（）创建了一个普通的JavaScript对象。 useRef（）与自己创建{current：...}对象之间的唯一区别是**useRef会在每个渲染上提供相同的ref对象**。

请记住，useRef在内容更改时不会通知。 改变.current属性不会导致重新渲染。 如果要在React将引用附加或分离到DOM节点时运行某些代码，则可能需要使用回调引用。

把之前的Input用useRef重写一下：

```typescript
const RefHook: React.FunctionComponent = () => {
  const ref = React.useRef<HTMLInputElement>(null)
  const handleClick = () => {
    ref.current!.focus()
  }
  return (
    <>
      <input ref={ref} type='text' />
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}
```

### Imperativer Handler Hook

```
useImperativeHandle(ref, createHandle, [deps])
```

useImperativeHandle自定义使用ref时公开给父组件的实例值。 与往常一样，在大多数情况下应避免使用refs的命令式代码。 useImperativeHandle应与forwardRef一起使用

重新实现下FancyButton

```typescript
interface Handlers {
  focus(): void
}
interface Props {
  children?: React.ReactNode
}
const FancyButton: React.RefForwardingComponent<Handlers, Props> = (
  props,
  ref
) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      buttonRef.current!.focus()
    }
  }))
  return <button ref={buttonRef}>{props.children}</button>
}

export default React.forwardRef(FancyButton)
```

### Layout Effect Hook

签名与useEffect相同，但在所有DOM突变后它会同步触发。 使用它从DOM读取布局并同步重新渲染。 在浏览器有机会绘制之前，将在useLayoutEffect内部计划的更新将同步刷新。

在可能的情况下首选标准useEffect以避免阻止视觉更新。

>如果要从类组件迁移代码，请注意useLayoutEffect在与componentDidMount和componentDidUpdate相同的阶段触发。 但是，建议首先使用useEffect，如果导致问题，则仅尝试使用useLayoutEffect。
>
>如果使用服务器呈现，请记住，在下载JavaScript之前，useLayoutEffect和useEffect都不能运行。 这就是React在服务器呈现的组件包含useLayoutEffect时发出警告的原因。 要解决这个问题，要么将该逻辑移动到useEffect（如果第一次渲染不需要），要么延迟显示该组件直到客户端呈现之后（如果HTML看起来坏了，直到useLayoutEffect运行）。
>
>要从服务器呈现的HTML中排除需要布局效果的组件，请使用showChild && <Child />有条件地呈现它，并使用useEffect（（）=> {setShowChild（true）;}，[]）延迟显示它。 这样，UI在界面化之前不会出现断裂。



### Debug Value Hook

`useDebugValue(value)`

useDebugValue可用于在React DevTools中显示自定义挂钩的标签。
