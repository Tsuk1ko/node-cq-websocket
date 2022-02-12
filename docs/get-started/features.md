# SDK 介紹

- [SDK 介紹](#sdk-%E4%BB%8B%E7%B4%B9)
  - [核心概念](#%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)
  - [自動獲取機器人QQ號](#%E8%87%AA%E5%8B%95%E7%8D%B2%E5%8F%96%E6%A9%9F%E5%99%A8%E4%BA%BAqq%E8%99%9F)
  - [事件傳播](#%E4%BA%8B%E4%BB%B6%E5%82%B3%E6%92%AD)
  - [快速響應](#%E5%BF%AB%E9%80%9F%E9%9F%BF%E6%87%89)
    - [範例: 協議式響應](#%E7%AF%84%E4%BE%8B-%E5%8D%94%E8%AD%B0%E5%BC%8F%E9%9F%BF%E6%87%89)
  - [發送結果追蹤](#%E7%99%BC%E9%80%81%E7%B5%90%E6%9E%9C%E8%BF%BD%E8%B9%A4)
  - [消息格式](#%E6%B6%88%E6%81%AF%E6%A0%BC%E5%BC%8F)
    - [上報消息](#%E4%B8%8A%E5%A0%B1%E6%B6%88%E6%81%AF)
    - [發送消息](#%E7%99%BC%E9%80%81%E6%B6%88%E6%81%AF)
    - [延伸閱讀](#%E5%BB%B6%E4%BC%B8%E9%96%B1%E8%AE%80)

## 核心概念

CQWebSocket SDK 是基於 CQHTTP API 插件之 WebSocket 通訊，底層封裝了兩個 socket，分別為 `/api` 和 `/event` (詳細功能描述可見 [coolq-http-api/websocket](https://cqhttp.cc/docs/#/WebSocketAPI?id=api-%E6%8E%A5%E5%8F%A3))。

CQWebSocket SDK 使開發者能夠更專心於機器人應用的開發，SDK 為開發者提供底層連線的維護、斷線重連等功能，並第一手先處理了上報事件，依照不同事件類型，將事件文本分發至各事件監聽器處理。

## 事件傳播

事件具有向上傳播的機制，一個事件上報之後，該事件之所有**親事件**也會依序上報。  
事件名稱以 `.` 相互連接，形成具有繼承關係的結構，如 `message` (任意消息事件) 為 `message.group` (群消息) 的親事件。  
關於事件親子關係的構成，可參考[事件樹](../api/events.md#%E4%BA%8B%E4%BB%B6%E6%A8%B9)。

舉個例子，群消息有人@某機器人，該機器人則會首先上報 `message.group.@.me` 事件，該事件之親事件由下而上依序為 `message.group.@`, `message.group` 、 `message` ，則這幾個事件也會依照這個順序上報，這樣稱為一次**事件傳播**。

## 快速響應

> 僅 `message` 及其子事件支援此機制。

`message` 及其子事件監聽器的第一個參數： `CQEvent` 類別實例，在這個機制中扮演重要的角色。  
透過 `CQEvent` 實例，所有監聽器皆可在自己的運行期間調用 `CQEvent #stopPropagation()` 方法聲明自己的處理權，以截獲事件並阻斷後續監聽器的調用，並立即以該事件返回之文字訊息(或透過調用 `CQEvent #setMessage(msg)` 設定之文字訊息，也可以透過 `Promise` 對象 resolve 之文字訊息)作為響應，送回至 CQHTTP API 插件端。

由於在一次事件傳播中的所有監聽器都會收到同一個 `CQEvent` 實例，因此對於響應的決定方式，除了 `CQEvent #stopPropagation()` 所提供的事件截獲機制之外，也可以採取協議式的方式，就是透過每個監聽器調用 `CQEvent #getMessage()` `CQEvent #setMessage(msg)` 協議出一個最終的響應訊息。

### 範例: 協議式響應

假設機器人具有以下代碼。

```js
// app.js

const { CQWebSocket } = require('@tsuk1ko/cq-websocket')
const bot = CQWebSocket()

const plugins = [
  require('./pluginA'),
  require('./pluginB')
]

plugins.forEach(plugin => {
  bot.on('message.private', plugin)
})

```

```js
// pluginA.js
module.exports = function (e) {
  if (e.hasMessage()) {
    e.appendMessage(' world!')
  } else {
    e.setMessage('Hello')
  }
}
```

```js
// pluginB.js
module.exports = function (e) {
  if (e.hasMessage()) {
    e.appendMessage(' CQWebSocket!')
  } else {
    e.setMessage('Hi')
  }
}
```

此時若機器人收到了一則私人消息，則會響應 `"Hello CQWebSocket!"`。

我們也可以藉此機制，加入消息過濾的功能。  
首先在機器人的 `app.js` 加入以下代碼。

```js
// app.js
const pluginGuard = require('./pluginGuard')

// 於最上層親事件檢查所有響應訊息
bot.on('message', pluginGuard)
```

```js
// pluginGuard.js
module.exports = function (e) {
  if (e.hasMessage()) {
    e.stopPropagation()

    // 關鍵字過濾
    e.setMessage(
      e.getMessage().replace(/關鍵字/g, '')
    )
  }
}
```

## 發送結果追蹤

不論是快速響應或是 API 調用均有此機制。

追蹤快速響應之結果，可通過 CQEvent `#onResponse()` 設置結果監聽器, 並透過 CQEvent `#onError()` 處理響應的錯誤。  
若沒有 CQEvent `#onError()` 進行錯誤處理, 發生響應錯誤時會觸發 [`error` 事件](#基本事件)。

追蹤 API 調用之結果，可以利用 [`bot(method[, params[, options]])`](../api/CQWebSocket.md#api-call) 返回的 Promise 對象進行追蹤。

## 消息格式

### 上報消息

`message` 事件中，監聽器第三個參數為一個 `CQTag` 的數組，關於該數組內可能出現的元素，可以參考[CQ 碼相關類別](../api/messages.md)。

※除了已定義的 CQTag 之外，其餘的內容都會當作 CQText 的字符串處理。

舉例，上報消息中含有一個不在定義中的 CQ 碼 `"[CQ:unknown,key=value]"`，則此 CQ 碼會被 Parser 判定為一個 CQText 實例，等同 `new CQText('[CQ:unknown,key=value]')`。

### 發送消息

不論是快速響應或是 API 調用發送消息，均可使用以下消息格式。

1. [字符串格式](https://cqhttp.cc/docs/#/Message?id=%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%A0%BC%E5%BC%8F)
2. [數組格式](https://cqhttp.cc/docs/#/Message?id=%E6%95%B0%E7%BB%84%E6%A0%BC%E5%BC%8F)

其中，數組格式在本 SDK 的擴增下，支持了將本 SDK 的 [CQ 碼相關類別](../api/messages.md)直接作為數組的內容。

首先可以先了解一下 CQHTTP API 所提供的[消息段對象](../api/CQHTTPMessage.md)，此消息段在這邊我們姑且稱之為 `CQHTTPMessage`。

快速響應或是 API 調用發送消息時，可以使用一個含有 `CQHTTPMessage` **或** `CQTag` **或** `string` 的數組作為消息文本。
(`CQTag` 可參考 [CQ 碼相關類別](../api/messages.md))

舉個快速響應的例子：

```js
bot.on('message', () => {
  return [
    {
      type: 'at',
      data: {
        qq: '123'
      }
    },
    '你好~ ',
    new CQEmoji(129303) // 🤗
  ]
})
```

每當機器人收到消息時，便會回應 `"[CQ:at,qq=123]你好~ 🤗"`。

### 延伸閱讀

- [CQ 碼](https://d.cqp.me/Pro/CQ%E7%A0%81)
- [CQHTTP API 之消息格式](https://cqhttp.cc/docs/#/Message)
- [CQHTTP API 之 CQ 碼](https://cqhttp.cc/docs/#/CQCode)
