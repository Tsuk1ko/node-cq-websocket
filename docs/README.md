# CQWebSocket SDK 說明文件

## 使用方式

### CDN

如果你在網頁前端上使用，可以通過 CDN 引入。

- 最新版
  ```html
  <script src="https://cdn.jsdelivr.net/npm/@tsuk1ko/cq-websocket/dist/cq-websocket.min.js"></script>
  ```

- 指定版本 (以 `v2.0.0` 為例, 可依照實際需求版本自行替換版號)
  > CDN 引入方式僅提供 v2.2.0 以上的版本使用
  ```html
  <script src="https://cdn.jsdelivr.net/npm/@tsuk1ko/cq-websocket@2.2.0/dist/cq-websocket.min.js"></script>
  ```

在你的 js 代碼中, 使用全局變數 `CQWebSocketSDK` 獲取 SDK。

```js
// 全局變數 CQWebSocketSDK 存在於 window 對象下
const { CQWebSocket } = window.CQWebSocketSDK
const bot = new CQWebSocket()
```

### NPM

如果你使用打包工具(如 webpack, browserify...)或 NodeJS，可以通過 NPM 安裝。

```bash
npm install @tsuk1ko/cq-websocket
```

將 SDK 導入代碼

```js
const { CQWebSocket } = require('@tsuk1ko/cq-websocket')
```

或是使用 ES6 import

```js
import { CQWebSocket } from '@tsuk1ko/cq-websocket'
```

## 快速開始

[閱讀更多 ➡️](get-started/README.md)

## API 文件

[閱讀更多 ➡️](api/README.md)
