# node-cq-websocket

此 fork 为 [Tsuk1ko/cq-picsearcher-bot](https://github.com/Tsuk1ko/cq-picsearcher-bot) 专用，仅适配 [Mrs4s/go-cqhttp](https://github.com/Mrs4s/go-cqhttp)

## 🎉 功能/特色
- 輕鬆配置, 快速搭建 QQ 聊天機器人。
- 自動維護底層連線, 開發者只需專注在聊天應用的開發。若斷線, 可依照配置[重新連線](docs/get-started/features.md#%E6%96%B7%E7%B7%9A%E9%87%8D%E9%80%A3)。
- 支持消息監聽器內, [快速響應](docs/get-started/features.md#%E5%BF%AB%E9%80%9F%E9%9F%BF%E6%87%89)。

## 🗎 SDK 文件
[閱讀更多 ➡️](docs/README.md)

## 🛠️ 開發者看板
本 SDK 採用 [ava](https://github.com/avajs/ava) 框架執行測試。

### 打包 CQWebSocket 至 browser 環境
```bash
npm run build
```
使用 webpack 將 SDK 及所有依賴打包, 並在 `/dist`目錄下產生一個 `cq-websocket.min.js`。

### 建置 demo/webpack
```bash
npm run build-demo
```
打包 `/demo/webpack/app.js` 內容, 在 `/demo/webpack/www` 目錄下產生一個 `bundle.js`。

### 開發日誌
[閱讀更多 ➡️](docs/CHANGELOG.md)

### Known Issues
- CQHTTP API 插件尚未支援收發 Fragmant, 暫時禁用
  - 自`v1.2.6`
  - [node-cq-websocket #2](https://github.com/momocow/node-cq-websocket/pull/2)
  - [coolq-http-api #85](https://github.com/richardchien/coolq-http-api/issues/85)
- 在 Node 10.x 下, Buffer 寫入時的 RangeError (發生在 SDK 調用 API 方法時)。
  > 這是 Node 的問題, 暫時使用 Node 8.x 以下就沒問題。
  ```
  RangeError [ERR_OUT_OF_RANGE]: The value of "value" is out of range. It must be >= 0 and <= 4294967295. Received -805456141
      at checkInt (internal/buffer.js:35:11)
      at writeU_Int32BE (internal/buffer.js:625:3)
      at Buffer.writeUInt32BE (internal/buffer.js:638:10)
      at WebSocketFrame.toBuffer (/***/node-cq-websocket/node_modules/websocket/lib/WebSocketFrame.js:257:24)
      at WebSocketConnection.sendFrame (/***/node-cq-websocket/node_modules/websocket/lib/WebSocketConnection.js:857:43)
      at WebSocketConnection.fragmentAndSend (/***/node-cq-websocket/node_modules/websocket/lib/WebSocketConnection.js:793:14)
      at WebSocketConnection.sendUTF (/***/node-cq-websocket/node_modules/websocket/lib/WebSocketConnection.js:733:10)
      at W3CWebSocket.send (/***/node-cq-websocket/node_modules/websocket/lib/W3CWebSocket.js:116:26)
  ```
