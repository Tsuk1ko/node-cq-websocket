/**
 * 转义
 * @template T
 * @param {T} str 欲转义的字符串
 * @param {boolean} [insideCQ] 是否在CQ码内
 * @return {T}
 */
const escapeStrMsg = (str, insideCQ = false) => {
  if (typeof str !== 'string') return str;
  const result = str.replace(/&/g, '&amp;').replace(/\[/g, '&#91;').replace(/\]/g, '&#93;');
  return insideCQ ? result.replace(/,/g, '&#44;') : result;
};

/**
 * 反转义
 * @template T
 * @param {T} str 欲反转义的字符串
 * @return {T}
 */
const unescapeStrMsg = str => {
  if (typeof str !== 'string') return str;
  return str.replace(/&#44;/g, ',').replace(/&#91;/g, '[').replace(/&#93;/g, ']').replace(/&amp;/g, '&');
};

/**
 *
 * @param {Array<{ type: string; data: Record<string, string>}>} msgs
 * @returns {string}
 */
const convertArrayMsgToStringMsg = msgs => {
  if (!Array.isArray(msgs)) return '';
  let msg = '';
  msgs.forEach(obj => {
    if (typeof obj !== 'object' || typeof obj.type !== 'string' || typeof obj.data !== 'object') {
      return;
    }
    // 文本
    if (obj.type === 'text' && typeof obj.data.text === 'string') {
      msg += escapeStrMsg(obj.data.text);
      return;
    }
    // 其他
    const data = Object.entries(obj.data);
    if (!data.length) {
      msg += `[CQ:${obj.type}]`;
      return;
    }
    const dataStr = data.map(([k, v]) => `${k}=${escapeStrMsg(v, true)}`).join(',');
    msg += `[CQ:${obj.type},${dataStr}]`;
  });
  return msg;
};

module.exports = {
  escapeStrMsg,
  unescapeStrMsg,
  convertArrayMsgToStringMsg,
};
