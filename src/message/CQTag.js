const deepEqual = require('deep-equal');

module.exports = class CQTag {
  /**
   * @param {string} type
   * @param {object} data
   */
  constructor(type, data = null) {
    this.data = data;
    this._type = type;
    this._modifier = null;
  }

  get tagName() {
    return this._type;
  }

  get modifier() {
    return (
      this._modifier ||
      new Proxy(
        {},
        {
          set: (t, prop, value) => {
            // lazy init
            this._modifier = {
              [prop]: value,
            };
            return true;
          },
        },
      )
    );
  }

  set modifier(val) {
    this._modifier = val;
  }

  /**
   * @param {CQTag} another
   */
  equals(another) {
    if (!(another instanceof CQTag)) return false;
    if (this._type !== another._type) return false;
    return deepEqual(this.data, another.data, {
      strict: true,
    });
  }

  toJSON() {
    const data = {};

    for (const k of Object.keys(this.data || {})) {
      if (this.data[k] !== undefined) {
        data[k] = String(this.data[k]);
      }
    }

    for (const k of Object.keys(this._modifier || {})) {
      if (this._modifier[k] !== undefined) {
        data[k] = String(this._modifier[k]);
      }
    }

    return {
      type: this._type,
      data: Object.keys(data).length > 0 ? data : null,
    };
  }

  valueOf() {
    return this.toString();
  }

  toString() {
    let ret = `[CQ:${this._type}`;

    for (const k of Object.keys(this.data || {})) {
      if (this.data[k] !== undefined) {
        ret += `,${k}=${this.data[k]}`;
      }
    }

    for (const k of Object.keys(this._modifier || {})) {
      if (this._modifier[k] !== undefined) {
        ret += `,${k}=${this._modifier[k]}`;
      }
    }

    ret += ']';
    return ret;
  }

  /**
   * @abstract
   * Force data to cast into proper types
   */
  coerce() {
    return this;
  }
};
