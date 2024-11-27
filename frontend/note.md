## Create project

```sh
# Install node 18+
# https://stackoverflow.com/questions/76318653/how-can-i-install-node-js-version-18-on-ubuntu-22-04
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

npm create vite .
npm install
npm run dev
npm i react-router-dom bootstrap react-bootstrap # install routing and styling lib

mkdir backend && cd backend
npm init -y
npm install express sqlite3 cors body-parser
node initDB.js
```

## Run project

```sh
node server.js
npm run dev
```

## Folder Structures

- components: shopping cart, shopping cart items
- pages: various pages, the high level routes
- data: json data
- context: react context
- hooks: custom hooks such as using local storage
- utilities: utility functions

- App.tsx: all of routes and generic code that goes outside of all the routes

## Q&A

### Export function name is better for large projects

`export default function x()` 默认导出允许你导出一个主要的值或功能，不需要指定名称（可以随便命名在导入时）。

`export function x()` 命名导出允许导出多个带名称的值或功能。导入时必须使用相同的名称，或通过 as 重命名。

### Navbar.tsx needs the `<Container>`

Inside a container so it can has the same sizing info as other pages

### `<className>` and `<class>`

class: 是标准的 HTML 属性，用于指定元素的 CSS 类

className: 是 React 中使用的属性，用于代替 HTML 的 class。在 React 的 JSX 代码中，必须使用 className 来设置 CSS 类。

Exampels:

1. index.html `<body class="bg-light">`
   - 这是在标准 HTML 结构中定义一个背景颜色为 light 的类。
   - 它作用于整个页面的 body 元素。
2. Navbar.tsx `<NavbarBs className="bg-white shadow-sm mb-3">`
   - bg-white: 背景为白色。
   - shadow-sm: 添加一个小阴影。
   - mb-3: 添加一个底部外边距。
3. `me-auto` in Navbar.tsx: `<Nav className="me-auto">`
   - me-auto 是 Bootstrap 提供的一个实用工具类，用于设置外边距（margin）。
   - me：表示 margin-end，即右侧外边距（在从左到右的布局中）。
   - auto：表示自动分配剩余空间。
   - 整体效果是：`<Nav>` 会占据剩余的空间，通常用于将导航项推到容器的左侧。

### `<div>3</div>` indicate # of items inside

- see Navbar.tsx: Button

### Cart items number sign

- 用 div 和 transform 去叠加在 cart 的图片上并 offset

### Navbar 使用 `style='sticky'` scroll 时保持不动

### Public folder 存图

必须 outside the src folder

### 不同 screen size 上面的布局

https://getbootstrap.com/docs/4.0/layout/grid/
`<Row md={2} xs={1} lg={3} className="">`

### JSX/TSX 中大括号的作用

1. 表达式插值
   在 JSX/TSX 中，大括号 {} 用于将 JavaScript 表达式插入到 HTML 结构中。

   1.1. 插值变量

   ```tsx
   const name = "Alice";
   return <h1>{name}</h1>; // 输出: Alice
   ```

   1.2. 调用函数

   ```tsx
   function greet(name: string): string {
     return `Hello, ${name}`;
   }

   return <p>{greet("Alice")}</p>; // 输出: Hello, Alice
   ```

   1.3. 动态属性值

   ```tsx
   const isActive = true;
   return <button disabled={!isActive}>Click me</button>; // 动态设置属性
   ```

2. 对象字面量（用于内联样式）
   在 JSX 中，style 属性需要一个对象字面量，而大括号用于表示该对象。

   示例：内联样式

   ```tsx
   const styles = { color: "blue", fontSize: "20px" };
   return <p style={styles}>Styled text</p>;
   ```

3. 循环渲染

   大括号中可以插入数组的 .map() 方法用于渲染列表。

   示例：列表渲染

   ```tsx
   const items = ["Apple", "Banana", "Cherry"];
   return (
     <ul>
       {items.map((item, index) => (
         <li key={index}>{item}</li>
       ))}
     </ul>
   );
   ```

### Store page 图片排版

```tsx
<Card>
  <Card.Img
    variant="top"
    src={imgUrl}
    style={{
      width: "300px",
      height: "400px",
      objectFit: "contain", // 确保图片等比例缩放，且不会被裁剪
      backgroundColor: "white", // 或其他你想要的背景颜色
      display: "block", // 确保图片在父容器内对齐
      margin: "auto", // 图片居中
    }}
  />
</Card>
```

### `map --> {...item}` in Store.tsx

...item 将 item 对象的所有属性展开为单独的 props，并传递给 StoreItem 组件。

对于 item：

```js
Copy code
const item = {
  id: 1,
  name: "textbook",
  price: 10.99,
  imgUrl: "/images/book.jpg"
};
```

`<StoreItem {...item} />` 会被解释为：

```tsx
Copy code
<StoreItem
  id={1}
  name="textbook"
  price={10.99}
  imgUrl="/images/book.jpg"
/>
```

它的作用是将 item 的每个属性（id、name、price、imgUrl）作为独立的 prop 传递给 StoreItem。

### Button color

`<Button variant="danger">` using info, danger etc. to control color

https://getbootstrap.com/docs/4.0/utilities/colors/#color

### 用 reduce() 计算购物车中所有物品的总数量

```tsx
const cartQuantity = cartItems.reduce(
  (quantity, item) => item.quantity + quantity,
  0
);
```

reduce: 一个数组方法，用于将数组中的所有元素依次组合为一个累积值。它接受两个参数：

- 回调函数 (quantity, item):
  - quantity: 累加器，存储当前的累积值。
  - item: 当前迭代到的 cartItems 数组中的元素。
- 初始值 0:
  - 设置累加器的初始值为 0。

### 定义函数：const vs. function

| 特性       | const（箭头函数）          | function（函数声明） |
| ---------- | -------------------------- | -------------------- |
| 定义方式   | **函数表达式，赋值给变量** | 独立的函数声明       |
| this 行为  | 继承外层上下文             | 有自己的上下文       |
| 是否提升   | 不提升                     | 提升                 |
| 语法简洁性 | 更简洁，适合回调和短小函数 | 更清晰，适合复杂逻辑 |
| 用法限制   | 必须在定义后调用           | 可在定义前调用       |

### 使用 Local Storage 储存数据

使用 "useLocalStraoge" hook

### div, container, card

对比总结

| 元素/类名 | 类型                                           | 特点                                                                           | 常见用途     |
| --------- | ---------------------------------------------- | ------------------------------------------------------------------------------ | ------------ |
| \<div\>   | 块级元素                                       | 用于分组和布局 HTML 元素。占据整行，适合布局和分组内容                         | 布局容器     |
| container | 类名，通常用于框架（如 Bootstrap）中           | 响应式容器，定义页面的宽度和边距，根据屏幕大小动态调整宽度（常用在 Bootstrap） | 页面布局     |
| card 类名 | 样式化的内容块，通常用于框架（如 Bootstrap）中 | 商品、文章等内容展示                                                           |
| \<span\>  | 内联元素                                       | 包裹短小内容，不占整行，适合样式化文字或部分内容                               | 修饰行内内容 |

### ShoppingCartProvider 的作用 `ShoppingCartContext.tsx`

```tsx
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  return (
    <ShoppingCartContex.Provider value={{}}>
      {children}
    </ShoppingCartContex.Provider>
  );
}
```

- ShoppingCartProvider 是一个组件:
  - 它是 Context 的 Provider。
  - 负责提供共享的数据（value={{}}）给嵌套的子组件。
- value 的作用:
  - value={{}} 是提供给 Context 的共享状态（这里还没有具体实现）。
  - 通常会包括购物车数据和操作方法，比如 addItem, removeItem, cartItems 等。
- children:
  - 这是一个 React 特性，children 表示嵌套在 ShoppingCartProvider 中的所有子组件。
  - 这些子组件可以访问 Context 提供的共享数据。
- 完整作用:
  - 将共享状态通过 Context 提供给子组件。

### `ShoppingCartProvider({ children }: ShoppingCartProviderProps) {}`

这是对象解构赋值，提取了 ShoppingCartProviderProps 类型中的 children 字段

等价于：

```tsx
function ShoppingCartProvider(props: ShoppingCartProviderProps) {
  const children = props.children;
}
```

```tsx
type ShoppingCartProviderProps = {
  children: ReactNode;
};
```

ShoppingCartProviderProps 是这个组件的 props 类型，规定它接收一个 children，类型是 ReactNode。

ReactNode 是 TypeScript 的一个类型，表示任何合法的 JSX 元素。
例如，\<div\>, \<span\>, null，甚至是字符串、数组都可以作为 ReactNode。

### JS find() 和 `[...currItems, { id, quantity: 1 }]`

```tsx
if (currItems.find((item) => item.id === id) == null) {
  // add item when it doesn't exist
  return [...currItems, { id, quantity: 1 }];
}
```

1. currItems.find((item) => item.id === id):

- find 是 JavaScript 数组的方法，用于找到第一个满足条件的元素。如果找不到，返回 undefined。
- (item) => item.id === id 是回调函数，表示检查当前数组中的 item 是否有 id 与传入的 id 匹配。
- find(\*\*\* ) == null 的作用:

  - 在 JavaScript 中，== null 会同时检查是否为 null 或 undefined。
  - 这里用来判断是否未找到匹配的 item（即 find 返回 undefined）。

2. `...` 是解构语法 (Spread Syntax)

- `[...currItems, { id, quantity: 1 }]` 表示复制 currItems 数组的所有元素, 然后在新数组中添加一个新对象 `{ id, quantity: 1 }`。

  ```tsx
  function addItem(currItems, id) {
    return [...currItems, { id, quantity: 1 }];
  }

  const currItems = [{ id: 1, quantity: 2 }];

  const updatedItems = addItem(currItems, 2);

  console.log(updatedItems);

  [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ];
  ```

- `return { ...item, quantity: item.quantity + 1 }`
  - 解构并复制 item 对象的所有属性。
  - { ...item, quantity: item.quantity + 1 } 会覆盖 item 中的 quantity 属性，并赋予新的值 (item.quantity + 1)。
    这是一个浅拷贝，用于生成更新后的对象，而不会改变原始对象。

### Event Listener `onClick`

### `ts` vs `tsx`

Use .ts for pure TypeScript files.

Use .tsx for files which contain JSX.

For example, a React component would be .tsx, but a file containing helper functions would be .ts.

### React 调用函数 JSX `<function />` 和直接调用函数 `function()`

ref: https://qiuyedx.com/?p=2294

1. `<Component />`：JSX 写法

   ```tsx
   function Greeting() {
     return <h1>Hello, world!</h1>;
   }

   function App() {
     return <Greeting />;
   }
   ```

   当你使用 `<Component />` 这种写法时，你实际上是在使用 JSX 语法。React 会通过 `React.createElement` 方法来处理这种写法，并创建一个 React 元素。

   在上述代码中，`<Greeting />` 会被转换为 React.createElement(Greeting, null)。

   **x`当你使用 JSX 写法 <Component /> 调用组件时，React 会处理组件的生命周期方法和钩子（如 useEffect）。而直接调用函数 Component() 不会触发这些生命周期方法和钩子。**

2. `Component()`：直接函数调用

   当你直接调用函数式组件，如 `Component()`，你实际上是在直接调用 JavaScript 函数，而不是创建一个 React 元素。

   ````js
   function Greeting() {
       return <h1>Hello, world!</h1>;
       }

       function App() {
       return Greeting();
       }
       ```
   ````

### 什么是 props？

props 是 React 组件的输入参数，父组件用来向子组件传递数据。

**它是一个对象，包含从父组件传递的值或函数。**

只读：子组件不能直接修改 props，它只能用 props 来渲染内容或调用函数。

灵活性：props 可以传递任何类型的数据，比如字符串、数组、对象，甚至是函数。

1. 传递数据

父组件传递 name 和 age 给子组件：

```tsx
// { name: string; age: number } 部分
function ChildComponent({ name, age }: { name: string; age: number }) {
  return (
    <p>
      {name} is {age} years old.
    </p>
  );
}

function ParentComponent() {
  return <ChildComponent name="Alice" age={25} />;
}
```

2. 传递函数

父组件通过 props 向子组件传递一个函数，子组件可以调用它：

```tsx
// { onClick: () => void } 部分
function ChildComponent({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Click me</button>;
}

function ParentComponent() {
  function handleClick() {
    alert("Button clicked!");
  }

  return <ChildComponent onClick={handleClick} />;
}
```

子组件点击按钮时会触发 handleClick 函数。

## React Hooks

### useContext

React Context is a way to manage state globally.

> > >

    It can be used together with the useState Hook to share state between deeply nested components more easily than with useState alone.

    State should be held by the highest parent component in the stack that requires access to the state.

    To illustrate, we have many nested components. The component at the top and bottom of the stack need access to the state.

    To do this without Context, we will need to pass the state as "props" through each nested component. This is called "prop drilling".

    The solution is to create context.

> > >

**Create Context**

```tsx
import { useState, createContext } from "react";
const UserContext = createContext();
```

Context Provider

Wrap child components in the Context Provider and supply the state value to the whole tree structure

```js
function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </UserContext.Provider>
  );
}
```

For details:

- https://www.w3schools.com/react/react_usecontext.asp
- https://react.dev/reference/react/useContext

#### 什么是 provider

Provider 是 React Context 的一部分，用来将数据 “注入” 到整个组件树中，让子组件可以共享数据，而不需要层层传递 props

**Provider 的工作原理**

定义 Context 和 Provider：

```tsx
const ThemeContext = createContext("light");

function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>;
}
```

React automatically re-renders all the **children** that use a particular context **starting from the provider that receives a different value.**

使用 Provider 包裹组件树：

```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

在子组件中获取数据：

```tsx
function Component() {
  const theme = useContext(ThemeContext); // 获取 value "dark"
  return <div>Current theme: {theme}</div>;
}
```

### useEffect

useEffect() 是 React 的一个 Hook，用于在函数式组件中管理副作用（side effects）。副作用是指组件渲染过程中需要执行的额外逻辑，例如：

- 数据获取（API 调用）
- 订阅事件（如监听键盘或鼠标事件）
- 操作 DOM（如设置标题或滚动条位置）
- 清除计时器等资源

useEffect accepts two arguments. The second argument is optional.

`useEffect(<function>, <dependency>)`

1. No dependency passed:

```tsx
useEffect(() => {
  //Runs on every render
});
```

2. An empty array:

```tsx
useEffect(() => {
  //Runs only on the first render
}, []);
```

3. Props or state values:

```tsx
useEffect(() => {
  //Runs on the first render
  //And any time any dependency value changes
}, [prop, state]);
```

### useState

The React useState Hook allows us to track state in a function component.

State generally refers to data or properties that need to be tracking in an application.

#### Initialize useState

We initialize our state by calling useState in our function component.

useState accepts an initial state and returns two values:

- The current state.
- A function that updates the state.

```js
function FavoriteColor() {
  const [color, setColor] = useState("");
}
```

- The first value, `color`, is our current state.
- The second value, `setColor`, is the function that is used to update our state.

#### Update State

To update our state, we use our state updater function.

```tsx
function FavoriteColor() {
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button type="button" onClick={() => setColor("blue")}>
        Blue
      </button>
    </>
  );
}
```

## TODO

### 添加 account

### 改成 db 可以

- 添加图片和 items
- 下单的时候链接 db?

```

```
