# 使用 Flow 作為 React prop-Types 的最佳替代品！

> 範例使用我的 repository [react-mouse-event](https://github.com/mvpdw06/react-mouse-event) 作為範例

## Install

```
$ npm install flow-bin babel-preset-flow
```

## .babelrc 加上設定

```
{
  "presets": ["flow"],
}
```

## package.json 加上 script

```
"scripts": {
  "flow": "flow"
}
```

## 初始化 Flow

下 `$ npm run flow init`，即會在專案根目錄產生 **.flowconfig** 設定檔

## 在【要使用】的檔案最上方加上

```
// @flow

或是

/* @flow */
```

> 注意：除了【被檢查】(export) 的 Component 中要用，【檢查】(import) 的 Component 也要用才會有效果！

## 在 React Component 中宣告要檢查的 props

```
type Prop = {
  name: string
  age?: int
}
```

> ? 代表可選， | 代表定義多個型別 ... 更多範例請查詢 [Flow Type Annotations](https://flow.org/en/docs/types/)

並在 React Component 中引用

```
// functional component
const Comp = (props: Props) =>
  <p>
    {props.content}
  </p>

// normal component
class Comp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return(
      <p>
        {this.props.content}
      </p>
    )
  }
}
```

## 開始檢查！

```
$ npm run flow
```

## 等等！為什麼我的 react, react-dom 都會噴 error 給我？我不想要檢查這些啊！

Flow 提供了我們一些的彈性，讓我們可以忽略檢查 library 的方法，這部分是否優於 TypeScript 見仁見智，畢竟少了檢查 library，其實也會少了 intellisense。

```
// .flowconfig

[ignore]
.*/node_modules/fbjs/.*
.*/node_modules/react/.*
.*/node_modules/react-dom/.*
```

> 這部分我也還沒研究得很透徹，看起來只需要忽略我們在 source code 中有 import 的 library 即可。並使用 regular expression！

## 不對啊！我的 IDE 是 VS Code，為什麼都會有 JavaScript error 給我？

簡單來說呢，這是 VS Code 對於 JavaScript 檔案類型的基本檢查，但因為 JavaScript 本身是弱型別，並沒有強型別定義，所以會有 error。

如果你跟我一樣，不想要直接關閉 VS Code 裡面的這個設定，那我提供你一個「只在」這個 project 才使用這種設定的方法

VS Code 可以在 project 根目錄底下建立一個 **.vscode** 資料夾，並在底下新增一個 **settings.json**

```
// settings.json
{
  "flowide.pathToFlow": "flow",
  "javascript.validate.enable": false
}
```

## 最後提一個我踩了一個大雷 **event handling**

如果要全部都使用強型別的方法定義，寫起來真的是挺痛苦的...而且官方文件不完整，我還一個一個 issue 去看，結果還是沒辦法解完整，後來決定使用退一步的方法，一整個海闊天空。

```
class Comp extends Component<Props, State> {
  handler = (event: MouseEvent) => {
    this.setState({
      mouseX: event.pageX,
      mouseY: event.pageY
    })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handler)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handler)
  }
}

```

這樣就可以解完一切的問題了，為什麼說是大雷？因為 Flow 對於 HTML Element 與 Event Listener 還有各種 Event 都有定義，只要一個環節驗證出錯，就會噴一堆 error 給你，後來碰壁碰一碰，還是這樣好，畢竟 `document.addEventListener` 這種簡單的方法其實不太會出錯，會出錯都是自己寫的 function 對吧？

> 如果你想看詳細定義，請看 [Flow dom](https://github.com/facebook/flow/blob/v0.52.0/lib/dom.js)

## 以上

這算是一個簡單的 Flow + React 範例，試試看「稍微」的強型別檢查，大概就是像這樣。如果你喜歡保有 JavaScript 的彈性，又不要像 TypeScript 幫你做太多事情，那麼這套 Flow 值得你來試試看！