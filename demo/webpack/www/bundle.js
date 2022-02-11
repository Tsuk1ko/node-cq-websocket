!(function (t) {
  var e = {};
  function r(n) {
    if (e[n]) return e[n].exports;
    var s = (e[n] = { i: n, l: !1, exports: {} });
    return t[n].call(s.exports, s, s.exports, r), (s.l = !0), s.exports;
  }
  (r.m = t),
    (r.c = e),
    (r.d = function (t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (r.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (r.t = function (t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t;
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if ((r.r(n), Object.defineProperty(n, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
        for (var s in t)
          r.d(
            n,
            s,
            function (e) {
              return t[e];
            }.bind(null, s),
          );
      return n;
    }),
    (r.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return r.d(e, 'a', e), e;
    }),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.p = ''),
    r((r.s = 7));
})([
  function (t, e, r) {
    const n = r(24);
    t.exports = class t {
      constructor(t, e = null) {
        (this.data = e), (this._type = t), (this._modifier = null);
      }
      get tagName() {
        return this._type;
      }
      get modifier() {
        return this._modifier || new Proxy({}, { set: (t, e, r) => ((this._modifier = { [e]: r }), !0) });
      }
      set modifier(t) {
        this._modifier = t;
      }
      equals(e) {
        return e instanceof t && this._type === e._type && n(this.data, e.data, { strict: !0 });
      }
      toJSON() {
        const t = {};
        for (let e of Object.keys(this.data || {})) void 0 !== this.data[e] && (t[e] = String(this.data[e]));
        for (let e of Object.keys(this._modifier || {}))
          void 0 !== this._modifier[e] && (t[e] = String(this._modifier[e]));
        return { type: this._type, data: Object.keys(t).length > 0 ? t : null };
      }
      valueOf() {
        return this.toString();
      }
      toString() {
        let t = `[CQ:${this._type}`;
        for (let e of Object.keys(this.data || {})) void 0 !== this.data[e] && (t += `,${e}=${this.data[e]}`);
        for (let e of Object.keys(this._modifier || {}))
          void 0 !== this._modifier[e] && (t += `,${e}=${this._modifier[e]}`);
        return (t += ']');
      }
      coerce() {
        return this;
      }
    };
  },
  function (t, e, r) {
    'use strict';
    var n,
      s,
      o,
      i = r(14),
      a = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
    function c() {
      o = !1;
    }
    function u(t) {
      if (t) {
        if (t !== n) {
          if (t.length !== a.length)
            throw new Error(
              'Custom alphabet for shortid must be ' +
                a.length +
                ' unique characters. You submitted ' +
                t.length +
                ' characters: ' +
                t,
            );
          var e = t.split('').filter(function (t, e, r) {
            return e !== r.lastIndexOf(t);
          });
          if (e.length)
            throw new Error(
              'Custom alphabet for shortid must be ' +
                a.length +
                ' unique characters. These characters were not unique: ' +
                e.join(', '),
            );
          (n = t), c();
        }
      } else n !== a && ((n = a), c());
    }
    function h() {
      return (
        o ||
        (o = (function () {
          n || u(a);
          for (var t, e = n.split(''), r = [], s = i.nextValue(); e.length > 0; )
            (s = i.nextValue()), (t = Math.floor(s * e.length)), r.push(e.splice(t, 1)[0]);
          return r.join('');
        })())
      );
    }
    t.exports = {
      get: function () {
        return n || a;
      },
      characters: function (t) {
        return u(t), n;
      },
      seed: function (t) {
        i.seed(t), s !== t && (c(), (s = t));
      },
      lookup: function (t) {
        return h()[t];
      },
      shuffled: h,
    };
  },
  function (t, e) {
    t.exports = function (t, e) {
      return void 0 !== t ? e(t) : void 0;
    };
  },
  function (t, e, r) {
    (function (e) {
      var r = 'Expected a function',
        n = '__lodash_hash_undefined__',
        s = 1 / 0,
        o = '[object Function]',
        i = '[object GeneratorFunction]',
        a = '[object Symbol]',
        c = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        u = /^\w*$/,
        h = /^\./,
        p = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        l = /\\(\\)?/g,
        d = /^\[object .+?Constructor\]$/,
        f = 'object' == typeof e && e && e.Object === Object && e,
        _ = 'object' == typeof self && self && self.Object === Object && self,
        m = f || _ || Function('return this')();
      var g = Array.prototype,
        y = Function.prototype,
        v = Object.prototype,
        b = m['__core-js_shared__'],
        k = (function () {
          var t = /[^.]+$/.exec((b && b.keys && b.keys.IE_PROTO) || '');
          return t ? 'Symbol(src)_1.' + t : '';
        })(),
        E = y.toString,
        x = v.hasOwnProperty,
        w = v.toString,
        C = RegExp(
          '^' +
            E.call(x)
              .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
              .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
            '$',
        ),
        S = m.Symbol,
        O = g.splice,
        N = H(m, 'Map'),
        B = H(Object, 'create'),
        j = S ? S.prototype : void 0,
        T = j ? j.toString : void 0;
      function I(t) {
        var e = -1,
          r = t ? t.length : 0;
        for (this.clear(); ++e < r; ) {
          var n = t[e];
          this.set(n[0], n[1]);
        }
      }
      function A(t) {
        var e = -1,
          r = t ? t.length : 0;
        for (this.clear(); ++e < r; ) {
          var n = t[e];
          this.set(n[0], n[1]);
        }
      }
      function q(t) {
        var e = -1,
          r = t ? t.length : 0;
        for (this.clear(); ++e < r; ) {
          var n = t[e];
          this.set(n[0], n[1]);
        }
      }
      function D(t, e) {
        for (var r = t.length; r--; ) if (V(t[r][0], e)) return r;
        return -1;
      }
      function M(t, e) {
        for (
          var r = 0,
            n = (e = (function (t, e) {
              if (F(t)) return !1;
              var r = typeof t;
              if ('number' == r || 'symbol' == r || 'boolean' == r || null == t || U(t)) return !0;
              return u.test(t) || !c.test(t) || (null != e && (t in Object(e)));
            })(e, t)
              ? [e]
              : (function (t) {
                  return F(t) ? t : L(t);
                })(e)).length;
          null != t && r < n;

        )
          t = t[$(e[r++])];
        return r && r == n ? t : void 0;
      }
      function Q(t) {
        return (
          !(
            !R(t) ||
            (function (t) {
              return !!k && k in t;
            })(t)
          ) &&
          ((function (t) {
            var e = R(t) ? w.call(t) : '';
            return e == o || e == i;
          })(t) ||
          (function (t) {
            var e = !1;
            if (null != t && 'function' != typeof t.toString)
              try {
                e = !!(t + '');
              } catch (t) {}
            return e;
          })(t)
            ? C
            : d
          ).test(
            (function (t) {
              if (null != t) {
                try {
                  return E.call(t);
                } catch (t) {}
                try {
                  return t + '';
                } catch (t) {}
              }
              return '';
            })(t),
          )
        );
      }
      function P(t, e) {
        var r = t.__data__;
        return (function (t) {
          var e = typeof t;
          return 'string' == e || 'number' == e || 'symbol' == e || 'boolean' == e ? '__proto__' !== t : null === t;
        })(e)
          ? r['string' == typeof e ? 'string' : 'hash']
          : r.map;
      }
      function H(t, e) {
        var r = (function (t, e) {
          return null == t ? void 0 : t[e];
        })(t, e);
        return Q(r) ? r : void 0;
      }
      (I.prototype.clear = function () {
        this.__data__ = B ? B(null) : {};
      }),
        (I.prototype.delete = function (t) {
          return this.has(t) && delete this.__data__[t];
        }),
        (I.prototype.get = function (t) {
          var e = this.__data__;
          if (B) {
            var r = e[t];
            return r === n ? void 0 : r;
          }
          return x.call(e, t) ? e[t] : void 0;
        }),
        (I.prototype.has = function (t) {
          var e = this.__data__;
          return B ? void 0 !== e[t] : x.call(e, t);
        }),
        (I.prototype.set = function (t, e) {
          return (this.__data__[t] = B && void 0 === e ? n : e), this;
        }),
        (A.prototype.clear = function () {
          this.__data__ = [];
        }),
        (A.prototype.delete = function (t) {
          var e = this.__data__,
            r = D(e, t);
          return !(r < 0 || (r == e.length - 1 ? e.pop() : O.call(e, r, 1), 0));
        }),
        (A.prototype.get = function (t) {
          var e = this.__data__,
            r = D(e, t);
          return r < 0 ? void 0 : e[r][1];
        }),
        (A.prototype.has = function (t) {
          return D(this.__data__, t) > -1;
        }),
        (A.prototype.set = function (t, e) {
          var r = this.__data__,
            n = D(r, t);
          return n < 0 ? r.push([t, e]) : (r[n][1] = e), this;
        }),
        (q.prototype.clear = function () {
          this.__data__ = { hash: new I(), map: new (N || A)(), string: new I() };
        }),
        (q.prototype.delete = function (t) {
          return P(this, t).delete(t);
        }),
        (q.prototype.get = function (t) {
          return P(this, t).get(t);
        }),
        (q.prototype.has = function (t) {
          return P(this, t).has(t);
        }),
        (q.prototype.set = function (t, e) {
          return P(this, t).set(t, e), this;
        });
      var L = W(function (t) {
        t = (function (t) {
          return null == t
            ? ''
            : (function (t) {
                if ('string' == typeof t) return t;
                if (U(t)) return T ? T.call(t) : '';
                var e = t + '';
                return '0' == e && 1 / t == -s ? '-0' : e;
              })(t);
        })(t);
        var e = [];
        return (
          h.test(t) && e.push(''),
          t.replace(p, function (t, r, n, s) {
            e.push(n ? s.replace(l, '$1') : r || t);
          }),
          e
        );
      });
      function $(t) {
        if ('string' == typeof t || U(t)) return t;
        var e = t + '';
        return '0' == e && 1 / t == -s ? '-0' : e;
      }
      function W(t, e) {
        if ('function' != typeof t || (e && 'function' != typeof e)) throw new TypeError(r);
        var n = function () {
          var r = arguments,
            s = e ? e.apply(this, r) : r[0],
            o = n.cache;
          if (o.has(s)) return o.get(s);
          var i = t.apply(this, r);
          return (n.cache = o.set(s, i)), i;
        };
        return (n.cache = new (W.Cache || q)()), n;
      }
      function V(t, e) {
        return t === e || (t != t && e != e);
      }
      W.Cache = q;
      var F = Array.isArray;
      function R(t) {
        var e = typeof t;
        return !!t && ('object' == e || 'function' == e);
      }
      function U(t) {
        return (
          'symbol' == typeof t ||
          ((function (t) {
            return !!t && 'object' == typeof t;
          })(t) &&
            w.call(t) == a)
        );
      }
      t.exports = function (t, e, r) {
        var n = null == t ? void 0 : M(t, e);
        return void 0 === n ? r : n;
      };
    }.call(this, r(21)));
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor(t) {
        super('text', { text: t });
      }
      get text() {
        return this.data.text;
      }
      coerce() {
        return (this.data.text = String(this.data.text)), this;
      }
      toString() {
        return this.data.text;
      }
    };
  },
  function (t, e) {
    const r = [
      'face',
      'emoji',
      'bface',
      'sface',
      'image',
      'record',
      'at',
      'rps',
      'dice',
      'shake',
      'anonymous',
      'music',
      'share',
      'text',
    ];
    t.exports = function (t) {
      return r.includes(t);
    };
  },
  function (t, e, r) {
    const n = r(30),
      s = r(31),
      o = r(32),
      i = r(33),
      a = r(34),
      c = r(35),
      u = r(36),
      h = r(37),
      p = r(38),
      l = r(39),
      d = r(40),
      f = r(41),
      _ = r(42),
      m = r(43),
      g = r(4);
    t.exports = {
      CQAnonymous: n,
      CQAt: s,
      CQBFace: o,
      CQCustomMusic: i,
      CQDice: a,
      CQEmoji: c,
      CQFace: u,
      CQImage: h,
      CQMusic: p,
      CQRecord: l,
      CQRPS: d,
      CQSFace: f,
      CQShake: _,
      CQShare: m,
      CQText: g,
    };
  },
  function (t, e, r) {
    const { CQWebSocket: n } = r(8),
      s = new URLSearchParams(window.location.search.substr(1)),
      o = new n({
        host: s.get('host') || '',
        port: s.get('port') || '',
        baseUrl: s.get('url') || '',
        qq: s.get('qq') || -1,
      });
    o.on('message', function (t, { raw_message: e }) {
      document
        .getElementById('messages')
        .appendChild(
          document.createElement('div'),
        ).innerHTML = `\n    <span>${new Date().toLocaleString()}</span><span style="margin-left:40px">${e}</span>\n  `;
    }),
      o.connect();
  },
  function (t, e, r) {
    const n = r(9).w3cwebsocket,
      s = r(12),
      o = r(3),
      i = r(22).CQEventBus,
      a = r(27),
      c = r(28),
      { parse: u } = c,
      {
        SocketError: h,
        InvalidWsTypeError: p,
        InvalidContextError: l,
        APITimeoutError: d,
        UnexpectedContextError: f,
      } = r(44),
      _ = { API: '/api', EVENT: '/event' },
      m = { DISABLED: -1, INIT: 0, CONNECTING: 1, CONNECTED: 2, CLOSING: 3, CLOSED: 4 },
      g = ['https:', 'http:', 'ws:', 'wss:'];
    class y extends a {
      constructor({
        protocol: t = 'ws:',
        host: e = '127.0.0.1',
        port: r = 6700,
        accessToken: n = '',
        baseUrl: s,
        enableAPI: o = !0,
        enableEvent: a = !0,
        qq: c = -1,
        reconnection: u = !0,
        reconnectionAttempts: h = 1 / 0,
        reconnectionDelay: p = 1e3,
        requestOptions: l = {},
        fragmentOutgoingMessages: d = !1,
        fragmentationThreshold: f,
        tlsOptions: _,
      } = {}) {
        super('__call__'),
          (t = t.toLowerCase()) && !t.endsWith(':') && (t += ':'),
          s && 0 === g.filter(t => s.startsWith(t + '//')).length && (s = `${t}//${s}`),
          (this._token = String(n)),
          (this._qq = parseInt(c)),
          (this._baseUrl = s || `${t}//${e}:${r}`),
          (this._reconnectOptions = { reconnection: u, reconnectionAttempts: h, reconnectionDelay: p }),
          (this._requestOptions = l),
          (this._wsOptions = {}),
          Object.entries({ fragmentOutgoingMessages: d, fragmentationThreshold: f, tlsOptions: _ })
            .filter(([t, e]) => void 0 !== e)
            .forEach(([t, e]) => {
              this._wsOptions[t] = e;
            }),
          (this._monitor = {
            EVENT: { attempts: 0, state: a ? m.INIT : m.DISABLED, reconnecting: !1 },
            API: { attempts: 0, state: o ? m.INIT : m.DISABLED, reconnecting: !1 },
          }),
          (this._responseHandlers = new Map()),
          (this._eventBus = new i(this));
      }
      off(t, e) {
        return this._eventBus.off(t, e), this;
      }
      on(t, e) {
        return this._eventBus.on(t, e), this;
      }
      once(t, e) {
        return this._eventBus.once(t, e), this;
      }
      __call__(t, e, r) {
        if (!this._apiSock) return Promise.reject(new Error('API socket has not been initialized.'));
        let n = { timeout: 1 / 0, ...this._requestOptions };
        return (
          'number' == typeof r ? (n.timeout = r) : 'object' == typeof r && (n = { ...n, ...r }),
          new Promise((r, o) => {
            let i;
            const a = { action: t, params: e };
            this._eventBus.emit('api.send.pre', a);
            const c = t => {
                this._responseHandlers.delete(u), o(t);
              },
              u = s.generate();
            this._responseHandlers.set(u, {
              onFailure: c,
              onSuccess: t => {
                i && (clearTimeout(i), (i = void 0)), this._responseHandlers.delete(u), delete t.echo, r(t);
              },
            }),
              this._apiSock.send(JSON.stringify({ ...a, echo: { reqid: u } })),
              this._eventBus.emit('api.send.post'),
              n.timeout < 1 / 0 &&
                (i = setTimeout(() => {
                  this._responseHandlers.delete(u), c(new d(n.timeout, a));
                }, n.timeout));
          })
        );
      }
      _handle(t) {
        switch (t.post_type) {
          case 'message':
            const e = u(t.message);
            switch (t.message_type) {
              case 'private':
                this._eventBus.emit('message.private', t, e);
                break;
              case 'discuss':
                {
                  const r = e.filter(t => 'at' === t.tagName);
                  r.length > 0
                    ? r.filter(t => t.qq === this._qq).length > 0
                      ? this._eventBus.emit('message.discuss.@.me', t, e)
                      : this._eventBus.emit('message.discuss.@', t, e)
                    : this._eventBus.emit('message.discuss', t, e);
                }
                break;
              case 'group':
                {
                  const r = e.filter(t => 'at' === t.tagName);
                  r.length > 0
                    ? r.filter(t => t.qq === this._qq).length > 0
                      ? this._eventBus.emit('message.group.@.me', t, e)
                      : this._eventBus.emit('message.group.@', t, e)
                    : this._eventBus.emit('message.group', t, e);
                }
                break;
              default:
                this._eventBus.emit('error', new f(t, 'unexpected "message_type"'));
            }
            break;
          case 'notice':
            switch (t.notice_type) {
              case 'group_upload':
                this._eventBus.emit('notice.group_upload', t);
                break;
              case 'group_admin':
                switch (t.sub_type) {
                  case 'set':
                    this._eventBus.emit('notice.group_admin.set', t);
                    break;
                  case 'unset':
                    this._eventBus.emit('notice.group_admin.unset', t);
                    break;
                  default:
                    this._eventBus.emit('error', new f(t, 'unexpected "sub_type"'));
                }
                break;
              case 'group_decrease':
                switch (t.sub_type) {
                  case 'leave':
                    this._eventBus.emit('notice.group_decrease.leave', t);
                    break;
                  case 'kick':
                    this._eventBus.emit('notice.group_decrease.kick', t);
                    break;
                  case 'kick_me':
                    this._eventBus.emit('notice.group_decrease.kick_me', t);
                    break;
                  default:
                    this._eventBus.emit('error', new f(t, 'unexpected "sub_type"'));
                }
                break;
              case 'group_increase':
                switch (t.sub_type) {
                  case 'approve':
                    this._eventBus.emit('notice.group_increase.approve', t);
                    break;
                  case 'invite':
                    this._eventBus.emit('notice.group_increase.invite', t);
                    break;
                  default:
                    this._eventBus.emit('error', new f(t, 'unexpected "sub_type"'));
                }
                break;
              case 'friend_add':
                this._eventBus.emit('notice.friend_add', t);
                break;
              default:
                this._eventBus.emit('error', new f(t, 'unexpected "notice_type"'));
            }
            break;
          case 'request':
            switch (t.request_type) {
              case 'friend':
                this._eventBus.emit('request.friend', t);
                break;
              case 'group':
                switch (t.sub_type) {
                  case 'add':
                    this._eventBus.emit('request.group.add', t);
                    break;
                  case 'invite':
                    this._eventBus.emit('request.group.invite', t);
                    break;
                  default:
                    this._eventBus.emit('error', new f(t, 'unexpected "sub_type"'));
                }
                break;
              default:
                this._eventBus.emit('error', new f(t, 'unexpected "request_type"'));
            }
            break;
          case 'meta_event':
            switch (t.meta_event_type) {
              case 'lifecycle':
                this._eventBus.emit('meta_event.lifecycle', t);
                break;
              case 'heartbeat':
                this._eventBus.emit('meta_event.heartbeat', t);
                break;
              default:
                this._eventBus.emit('error', new f(t, 'unexpected "meta_event_type"'));
            }
            break;
          default:
            this._eventBus.emit('error', new f(t, 'unexpected "post_type"'));
        }
      }
      _forEachSock(t, e = [_.EVENT, _.API]) {
        Array.isArray(e) || (e = [e]),
          e.forEach(e => {
            t(e, e === _.EVENT ? 'EVENT' : 'API');
          });
      }
      isSockConnected(t) {
        if (t === _.API) return this._monitor.API.state === m.CONNECTED;
        if (t === _.EVENT) return this._monitor.EVENT.state === m.CONNECTED;
        throw new p(t);
      }
      connect(t) {
        return (
          this._forEachSock((t, e) => {
            if ([m.INIT, m.CLOSED].includes(this._monitor[e].state)) {
              const r = this._token ? `?access_token=${this._token}` : '';
              let s = new n(`${this._baseUrl}/${e.toLowerCase()}${r}`, void 0, this._wsOptions);
              t === _.EVENT ? (this._eventSock = s) : (this._apiSock = s),
                s.addEventListener(
                  'open',
                  () => {
                    (this._monitor[e].state = m.CONNECTED),
                      this._eventBus.emit('socket.connect', _[e], s, this._monitor[e].attempts),
                      this._monitor[e].reconnecting &&
                        this._eventBus.emit('socket.reconnect', _[e], this._monitor[e].attempts),
                      (this._monitor[e].attempts = 0),
                      (this._monitor[e].reconnecting = !1),
                      this.isReady() &&
                        (this._eventBus.emit('ready', this),
                        this._monitor.API.state !== m.DISABLED &&
                          this._qq < 0 &&
                          this('get_login_info')
                            .then(t => {
                              this._qq = parseInt(o(t, 'data.user_id', -1));
                            })
                            .catch(t => {
                              this._eventBus.emit('error', t);
                            }));
                  },
                  { once: !0 },
                );
              const i = e => {
                let r;
                try {
                  r = JSON.parse(e.data);
                } catch (r) {
                  return void this._eventBus.emit('error', new l(t, e.data));
                }
                if (t === _.EVENT) this._handle(r);
                else {
                  const t = o(r, 'echo.reqid', '');
                  let { onSuccess: e } = this._responseHandlers.get(t) || {};
                  'function' == typeof e && e(r), this._eventBus.emit('api.response', r);
                }
              };
              s.addEventListener('message', i),
                s.addEventListener(
                  'close',
                  r => {
                    (this._monitor[e].state = m.CLOSED),
                      this._eventBus.emit('socket.close', _[e], r.code, r.reason),
                      1e3 !== r.code &&
                        this._reconnectOptions.reconnection &&
                        this.reconnect(this._reconnectOptions.reconnectionDelay, _[e]),
                      s.removeEventListener('message', i),
                      (s = null),
                      t === _.EVENT ? (this._eventSock = null) : (this._apiSock = null);
                  },
                  { once: !0 },
                ),
                s.addEventListener(
                  'error',
                  () => {
                    const t =
                      this._monitor[e].state === m.CONNECTING
                        ? 'Failed to establish the websocket connection.'
                        : this._monitor[e].state === m.CONNECTED
                        ? 'The websocket connection has been hung up unexpectedly.'
                        : `Unknown error occured. Conection state: ${this._monitor[e].state}`;
                    this._eventBus.emit('socket.error', _[e], new h(t)),
                      this._monitor[e].state === m.CONNECTED
                        ? ((this._monitor[e].state = m.CLOSING), this._eventBus.emit('socket.closing', _[e]))
                        : this._monitor[e].state === m.CONNECTING &&
                          ((this._monitor[e].state = m.CLOSED),
                          this._eventBus.emit('socket.failed', _[e], this._monitor[e].attempts),
                          this._monitor[e].reconnecting &&
                            this._eventBus.emit('socket.reconnect_failed', _[e], this._monitor[e].attempts),
                          (this._monitor[e].reconnecting = !1),
                          this._reconnectOptions.reconnection &&
                          this._monitor[e].attempts <= this._reconnectOptions.reconnectionAttempts
                            ? this.reconnect(this._reconnectOptions.reconnectionDelay, _[e])
                            : this._eventBus.emit('socket.max_reconnect', _[e], this._monitor[e].attempts));
                  },
                  { once: !0 },
                ),
                (this._monitor[e].state = m.CONNECTING),
                this._monitor[e].attempts++,
                this._eventBus.emit('socket.connecting', t, this._monitor[e].attempts);
            }
          }, t),
          this
        );
      }
      disconnect(t) {
        return (
          this._forEachSock((t, e) => {
            if (this._monitor[e].state === m.CONNECTED) {
              const r = t === _.EVENT ? this._eventSock : this._apiSock;
              (this._monitor[e].state = m.CLOSING),
                r.close(1e3, 'Normal connection closure'),
                this._eventBus.emit('socket.closing', t);
            }
          }, t),
          this
        );
      }
      reconnect(t, e) {
        'number' != typeof t && (t = 0);
        const r = (e, r) => {
          setTimeout(() => {
            this.connect(e);
          }, t);
        };
        return (
          this._forEachSock((t, e) => {
            if (!this._monitor[e].reconnecting)
              switch (this._monitor[e].state) {
                case m.CONNECTED:
                  (this._monitor[e].reconnecting = !0),
                    this._eventBus.emit('socket.reconnecting', t, this._monitor[e].attempts),
                    this.disconnect(t),
                    this._eventBus.once('socket.close', e => e === t && r(t));
                  break;
                case m.CLOSED:
                case m.INIT:
                  (this._monitor[e].reconnecting = !0),
                    this._eventBus.emit('socket.reconnecting', t, this._monitor[e].attempts),
                    r(t);
              }
          }, e),
          this
        );
      }
      isReady() {
        let t = this._monitor.EVENT.state === m.DISABLED || this._monitor.EVENT.state === m.CONNECTED,
          e = this._monitor.API.state === m.DISABLED || this._monitor.API.state === m.CONNECTED;
        return t && e;
      }
    }
    t.exports = {
      default: y,
      CQWebSocket: y,
      WebSocketType: _,
      WebSocketState: m,
      SocketError: h,
      InvalidWsTypeError: p,
      InvalidContextError: l,
      APITimeoutError: d,
      UnexpectedContextError: f,
      ...c,
    };
  },
  function (t, e, r) {
    var n = (function () {
        return this;
      })(),
      s = n.WebSocket || n.MozWebSocket,
      o = r(10);
    function i(t, e) {
      return e ? new s(t, e) : new s(t);
    }
    s &&
      ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (t) {
        Object.defineProperty(i, t, {
          get: function () {
            return s[t];
          },
        });
      }),
      (t.exports = { w3cwebsocket: s ? i : null, version: o });
  },
  function (t, e, r) {
    t.exports = r(11).version;
  },
  function (t) {
    t.exports = {
      _from: 'websocket@1.0.28',
      _id: 'websocket@1.0.28',
      _inBundle: !1,
      _integrity: 'sha512-00y/20/80P7H4bCYkzuuvvfDvh+dgtXi5kzDf3UcZwN6boTYaKvsrtZ5lIYm1Gsg48siMErd9M4zjSYfYFHTrA==',
      _location: '/websocket',
      _phantomChildren: {},
      _requested: {
        type: 'version',
        registry: !0,
        raw: 'websocket@1.0.28',
        name: 'websocket',
        escapedName: 'websocket',
        rawSpec: '1.0.28',
        saveSpec: null,
        fetchSpec: '1.0.28',
      },
      _requiredBy: ['#USER', '/'],
      _resolved: 'https://registry.npmjs.org/websocket/-/websocket-1.0.28.tgz',
      _shasum: '9e5f6fdc8a3fe01d4422647ef93abdd8d45a78d3',
      _spec: 'websocket@1.0.28',
      _where: 'D:\\workspace\\Other\\node-cq-websocket',
      author: { name: 'Brian McKelvey', email: 'theturtle32@gmail.com', url: 'https://github.com/theturtle32' },
      browser: 'lib/browser.js',
      bugs: { url: 'https://github.com/theturtle32/WebSocket-Node/issues' },
      bundleDependencies: !1,
      config: { verbose: !1 },
      contributors: [{ name: 'Iñaki Baz Castillo', email: 'ibc@aliax.net', url: 'http://dev.sipdoc.net' }],
      dependencies: { debug: '^2.2.0', nan: '^2.11.0', 'typedarray-to-buffer': '^3.1.5', yaeti: '^0.0.6' },
      deprecated: !1,
      description: 'Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.',
      devDependencies: {
        'buffer-equal': '^1.0.0',
        faucet: '^0.0.1',
        gulp: 'git+https://github.com/gulpjs/gulp.git#4.0',
        'gulp-jshint': '^2.0.4',
        jshint: '^2.0.0',
        'jshint-stylish': '^2.2.1',
        tape: '^4.9.1',
      },
      directories: { lib: './lib' },
      engines: { node: '>=0.10.0' },
      homepage: 'https://github.com/theturtle32/WebSocket-Node',
      keywords: [
        'websocket',
        'websockets',
        'socket',
        'networking',
        'comet',
        'push',
        'RFC-6455',
        'realtime',
        'server',
        'client',
      ],
      license: 'Apache-2.0',
      main: 'index',
      name: 'websocket',
      repository: { type: 'git', url: 'git+https://github.com/theturtle32/WebSocket-Node.git' },
      scripts: { gulp: 'gulp', install: '(node-gyp rebuild 2> builderror.log) || (exit 0)', test: 'faucet test/unit' },
      version: '1.0.28',
    };
  },
  function (t, e, r) {
    'use strict';
    t.exports = r(13);
  },
  function (t, e, r) {
    'use strict';
    var n = r(1),
      s = r(15),
      o = r(19),
      i = r(20) || 0;
    function a() {
      return s(i);
    }
    (t.exports = a),
      (t.exports.generate = a),
      (t.exports.seed = function (e) {
        return n.seed(e), t.exports;
      }),
      (t.exports.worker = function (e) {
        return (i = e), t.exports;
      }),
      (t.exports.characters = function (t) {
        return void 0 !== t && n.characters(t), n.shuffled();
      }),
      (t.exports.isValid = o);
  },
  function (t, e, r) {
    'use strict';
    var n = 1;
    t.exports = {
      nextValue: function () {
        return (n = (9301 * n + 49297) % 233280) / 233280;
      },
      seed: function (t) {
        n = t;
      },
    };
  },
  function (t, e, r) {
    'use strict';
    var n,
      s,
      o = r(16),
      i = (r(1), 1459707606518),
      a = 6;
    t.exports = function (t) {
      var e = '',
        r = Math.floor(0.001 * (Date.now() - i));
      return r === s ? n++ : ((n = 0), (s = r)), (e += o(a)), (e += o(t)), n > 0 && (e += o(n)), (e += o(r));
    };
  },
  function (t, e, r) {
    'use strict';
    var n = r(1),
      s = r(17),
      o = r(18);
    t.exports = function (t) {
      for (var e, r = 0, i = ''; !e; ) (i += o(s, n.get(), 1)), (e = t < Math.pow(16, r + 1)), r++;
      return i;
    };
  },
  function (t, e, r) {
    'use strict';
    var n,
      s = 'object' == typeof window && (window.crypto || window.msCrypto);
    (n =
      s && s.getRandomValues
        ? function (t) {
            return s.getRandomValues(new Uint8Array(t));
          }
        : function (t) {
            for (var e = [], r = 0; r < t; r++) e.push(Math.floor(256 * Math.random()));
            return e;
          }),
      (t.exports = n);
  },
  function (t, e) {
    t.exports = function (t, e, r) {
      for (var n = (2 << (Math.log(e.length - 1) / Math.LN2)) - 1, s = Math.ceil((1.6 * n * r) / e.length), o = ''; ; )
        for (var i = t(s), a = 0; a < s; a++) {
          var c = i[a] & n;
          if (e[c] && (o += e[c]).length === r) return o;
        }
    };
  },
  function (t, e, r) {
    'use strict';
    var n = r(1);
    t.exports = function (t) {
      return !(
        !t ||
        'string' != typeof t ||
        t.length < 6 ||
        new RegExp('[^' + n.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') + ']').test(t)
      );
    };
  },
  function (t, e, r) {
    'use strict';
    t.exports = 0;
  },
  function (t, e) {
    var r;
    r = (function () {
      return this;
    })();
    try {
      r = r || Function('return this')() || (0, eval)('this');
    } catch (t) {
      'object' == typeof window && (r = window);
    }
    t.exports = r;
  },
  function (t, e, r) {
    const n = r(3),
      s = r(23),
      o = r(0),
      i = r(4);
    function a(t, e) {
      throw (
        ((e.which = t),
        console.error('\nYou should listen on "socket.error" yourself to avoid those unhandled promise warnings.\n'),
        e)
      );
    }
    class c {
      constructor() {
        (this._isCanceled = !1),
          (this._message = ''),
          (this._responseHandler = null),
          (this._responseOptions = null),
          (this._errorHandler = null);
      }
      get messageFormat() {
        return 'string' == typeof this._message ? 'string' : 'array';
      }
      stopPropagation() {
        this._isCanceled = !0;
      }
      getMessage() {
        return this._message;
      }
      hasMessage() {
        return 'string' == typeof this._message ? Boolean(this._message) : this._message.length > 0;
      }
      setMessage(t) {
        Array.isArray(t) && (t = t.map(t => ('string' == typeof t ? new i(t) : t))), (this._message = t);
      }
      appendMessage(t) {
        'string' == typeof this._message
          ? (this._message += String(t))
          : ('string' == typeof t && (t = new i(t)), this._message.push(t));
      }
      onResponse(t, e) {
        'function' != typeof t && ((e = t), (t = null)), (this._responseHandler = t), (this._responseOptions = e);
      }
      onError(t) {
        this._errorHandler = t;
      }
    }
    t.exports = {
      CQEventBus: class {
        constructor(t) {
          (this._EventMap = {
            message: {
              '': [],
              private: [],
              group: { '': [], '@': { '': [], me: [] } },
              discuss: { '': [], '@': { '': [], me: [] } },
            },
            event: [],
            notice: {
              '': [],
              group_upload: [],
              group_admin: { '': [], set: [], unset: [] },
              group_decrease: { '': [], leave: [], kick: [], kick_me: [] },
              group_increase: { '': [], approve: [], invite: [] },
              friend_add: [],
            },
            request: { '': [], friend: [], group: { '': [], add: [], invite: [] } },
            ready: [],
            error: [],
            socket: {
              connecting: [],
              connect: [],
              failed: [],
              reconnecting: [],
              reconnect: [],
              reconnect_failed: [],
              max_reconnect: [],
              error: [],
              closing: [],
              close: [],
            },
            api: { response: [], send: { pre: [], post: [] } },
            meta_event: { '': [], lifecycle: [], heartbeat: [] },
          }),
            (this._onceListeners = new WeakMap()),
            (this._isSocketErrorHandled = !1),
            (this._bot = t),
            this._installDefaultErrorHandler();
        }
        _getHandlerQueue(t) {
          let e = n(this._EventMap, t);
          return Array.isArray(e) ? e : ((e = n(this._EventMap, `${t}.`)), Array.isArray(e) ? e : void 0);
        }
        count(t) {
          let e = this._getHandlerQueue(t);
          return e ? e.length : void 0;
        }
        has(t) {
          return void 0 !== this._getHandlerQueue(t);
        }
        emit(t, ...e) {
          return this._emitThroughHierarchy(t, ...e);
        }
        async _emitThroughHierarchy(t, ...e) {
          let r = [],
            n = t.startsWith('message');
          for (let e = t.split('.'); e.length > 0; e.pop()) {
            let t = this._getHandlerQueue(e.join('.'));
            t && t.length > 0 && r.push(...t);
          }
          if (r && r.length > 0) {
            let t = n ? new c() : void 0;
            n && Array.isArray(e) && e.unshift(t);
            for (let s of r) {
              n && (t._errorHandler = t._responseHandler = t._responseOptions = null);
              let r = await Promise.resolve(s(...e));
              if (
                (n && ('string' == typeof r || Array.isArray(r)) && (t.stopPropagation(), t.setMessage(r)),
                n && t._isCanceled)
              )
                break;
            }
            if (n && t.hasMessage()) {
              let r = t.getMessage();
              (r = Array.isArray(r)
                ? r.filter(t => 'object' == typeof t).map(t => (t instanceof o ? t.toJSON() : t))
                : r),
                this._bot('send_msg', { ...e[1], message: r }, t._responseOptions)
                  .then(e => {
                    'function' == typeof t._responseHandler && t._responseHandler(e);
                  })
                  .catch(e => {
                    'function' == typeof t._errorHandler ? t._errorHandler(e) : this.emit('error', e);
                  });
            }
          }
        }
        once(t, e) {
          const r = (...n) => {
            let s = e(...n);
            if (!1 !== s) return this.off(t, r), s;
          };
          return this._onceListeners.set(e, r), this.on(t, r);
        }
        off(t, e) {
          if ('string' != typeof t)
            return (
              (this._onceListeners = new WeakMap()),
              s(this._EventMap, t => {
                if (Array.isArray(t)) return t.splice(0, t.length), !1;
              }),
              this._installDefaultErrorHandler(),
              this
            );
          const r = this._getHandlerQueue(t);
          if (void 0 === r) return this;
          if ('function' != typeof e)
            return r.splice(0, r.length), 'socket.error' === t && this._installDefaultErrorHandler(), this;
          const n = r.indexOf(e),
            o = this._onceListeners.has(e) ? r.indexOf(this._onceListeners.get(e)) : -1,
            i = n >= 0 && o >= 0 ? Math.min(n, o) : n >= 0 ? n : o >= 0 ? o : -1;
          return i >= 0
            ? (r.splice(i, 1),
              i === o && this._onceListeners.delete(e),
              'socket.error' === t && 0 === r.length && this._installDefaultErrorHandler(),
              this)
            : this;
        }
        _installDefaultErrorHandler() {
          0 === this._EventMap.socket.error.length &&
            (this._EventMap.socket.error.push(a), (this._isSocketErrorHandled = !1));
        }
        _removeDefaultErrorHandler() {
          this._isSocketErrorHandled ||
            (this._EventMap.socket.error.splice(0, this._EventMap.socket.error.length),
            (this._isSocketErrorHandled = !0));
        }
        on(t, e) {
          if ((t.endsWith('@me') && (t = t.replace(/\.@me$/, '.@.me')), !this.has(t))) return this;
          'socket.error' === t && this._removeDefaultErrorHandler();
          let r = this._getHandlerQueue(t);
          return r && r.push(e), this;
        }
      },
      CQEvent: c,
    };
  },
  function (t, e) {
    t.exports = function t(e, r = function () {}) {
      'object' == typeof e &&
        Object.keys(e).forEach(function (n) {
          !1 !== r(e[n], n, e) && t(e[n], r);
        });
    };
  },
  function (t, e, r) {
    var n = Array.prototype.slice,
      s = r(25),
      o = r(26),
      i = (t.exports = function (t, e, r) {
        return (
          r || (r = {}),
          t === e ||
            (t instanceof Date && e instanceof Date
              ? t.getTime() === e.getTime()
              : !t || !e || ('object' != typeof t && 'object' != typeof e)
              ? r.strict
                ? t === e
                : t == e
              : (function (t, e, r) {
                  var u, h;
                  if (a(t) || a(e)) return !1;
                  if (t.prototype !== e.prototype) return !1;
                  if (o(t)) return !!o(e) && ((t = n.call(t)), (e = n.call(e)), i(t, e, r));
                  if (c(t)) {
                    if (!c(e)) return !1;
                    if (t.length !== e.length) return !1;
                    for (u = 0; u < t.length; u++) if (t[u] !== e[u]) return !1;
                    return !0;
                  }
                  try {
                    var p = s(t),
                      l = s(e);
                  } catch (t) {
                    return !1;
                  }
                  if (p.length != l.length) return !1;
                  for (p.sort(), l.sort(), u = p.length - 1; u >= 0; u--) if (p[u] != l[u]) return !1;
                  for (u = p.length - 1; u >= 0; u--) if (((h = p[u]), !i(t[h], e[h], r))) return !1;
                  return typeof t == typeof e;
                })(t, e, r))
        );
      });
    function a(t) {
      return null === t || void 0 === t;
    }
    function c(t) {
      return (
        !(!t || 'object' != typeof t || 'number' != typeof t.length) &&
        'function' == typeof t.copy &&
        'function' == typeof t.slice &&
        !(t.length > 0 && 'number' != typeof t[0])
      );
    }
  },
  function (t, e) {
    function r(t) {
      var e = [];
      for (var r in t) e.push(r);
      return e;
    }
    (t.exports = 'function' == typeof Object.keys ? Object.keys : r).shim = r;
  },
  function (t, e) {
    var r =
      '[object Arguments]' ==
      (function () {
        return Object.prototype.toString.call(arguments);
      })();
    function n(t) {
      return '[object Arguments]' == Object.prototype.toString.call(t);
    }
    function s(t) {
      return (
        (t &&
          'object' == typeof t &&
          'number' == typeof t.length &&
          Object.prototype.hasOwnProperty.call(t, 'callee') &&
          !Object.prototype.propertyIsEnumerable.call(t, 'callee')) ||
        !1
      );
    }
    ((e = t.exports = r ? n : s).supported = n), (e.unsupported = s);
  },
  function (t, e) {
    function r(t) {
      const e = this.constructor.prototype[t],
        r = function () {
          return e.apply(r, arguments);
        };
      return (
        Object.setPrototypeOf(r, this.constructor.prototype),
        Object.getOwnPropertyNames(e).forEach(function (t) {
          Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(e, t));
        }),
        r
      );
    }
    (r.prototype = Object.create(Function.prototype)), (t.exports = r);
  },
  function (t, e, r) {
    const n = r(5),
      s = r(29),
      o = r(6);
    t.exports = { parse: s, isSupportedTag: n, ...o };
  },
  function (t, e, r) {
    const n = r(5),
      s = r(0),
      {
        CQAt: o,
        CQAnonymous: i,
        CQBFace: a,
        CQCustomMusic: c,
        CQDice: u,
        CQEmoji: h,
        CQFace: p,
        CQImage: l,
        CQMusic: d,
        CQRecord: f,
        CQRPS: _,
        CQSFace: m,
        CQShake: g,
        CQShare: y,
        CQText: v,
      } = r(6),
      b = /\[CQ[^\]]*\]/g,
      k = /\[CQ:([a-z]+?)(?:,((,?[a-zA-Z0-9-_.]+=[^,[\]]*)*))?\]/;
    function E(t) {
      let e;
      switch (t._type) {
        case 'anonymous':
          e = i.prototype;
          break;
        case 'at':
          e = o.prototype;
          break;
        case 'bface':
          e = a.prototype;
          break;
        case 'music':
          e = 'custom' === t.data.type ? c.prototype : d.prototype;
          break;
        case 'dice':
          e = u.prototype;
          break;
        case 'emoji':
          e = h.prototype;
          break;
        case 'face':
          e = p.prototype;
          break;
        case 'image':
          e = l.prototype;
          break;
        case 'record':
          e = f.prototype;
          break;
        case 'rps':
          e = _.prototype;
          break;
        case 'sface':
          e = m.prototype;
          break;
        case 'shake':
          e = g.prototype;
          break;
        case 'share':
          e = y.prototype;
          break;
        case 'text':
          e = v.prototype;
      }
      return Object.setPrototypeOf(t, e).coerce();
    }
    t.exports = function (t) {
      if ('string' == typeof t) {
        let e = 0;
        const r = (t.match(b) || [])
          .map(t => t.match(k))
          .filter(t => t && n(t[1]))
          .map(
            t =>
              new s(
                t[1],
                (function (t = '') {
                  return t
                    ? t
                        .split(',')
                        .map(t => t.split('='))
                        .reduce((t, [e, r]) => ((t[e] = r), t), {})
                    : null;
                })(t[2]),
              ),
          )
          .map(E)
          .reduce((r, n, s) => {
            const o = n.toString(),
              i = t.indexOf(o);
            if (i !== e) {
              const n = t.substring(e, i);
              r.push(new v(n));
            }
            return r.push(n), (e = i + o.length), r;
          }, []);
        if (e < t.length) {
          const n = t.substring(e);
          r.push(new v(n));
        }
        return r;
      }
      return Array.isArray(t)
        ? t
            .filter(t => n(t.type))
            .map(t => new s(t.type, t.data))
            .map(E)
        : [];
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor(t) {
        super('anonymous'), (this.modifier.ignore = Boolean(t));
      }
      get ignore() {
        return this.modifier.ignore;
      }
      set ignore(t) {
        this.modifier.ignore = Boolean(t);
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor(t) {
        super('at', { qq: t });
      }
      get qq() {
        return this.data.qq;
      }
      coerce() {
        return (this.data.qq = Number(this.data.qq)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor(t, e) {
        super('bface', { id: t }), (this.modifier.p = e);
      }
      get id() {
        return this.data.id;
      }
      coerce() {
        return (this.data.id = Number(this.data.id)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0),
      s = r(2);
    t.exports = class extends n {
      constructor(t, e, r, n, s) {
        super('music', { type: 'custom', url: t, audio: e, title: r, content: n, image: s });
      }
      get type() {
        return 'custom';
      }
      get url() {
        return this.data.url;
      }
      get audio() {
        return this.data.audio;
      }
      get title() {
        return this.data.title;
      }
      get content() {
        return this.data.content;
      }
      get image() {
        return this.data.image;
      }
      coerce() {
        return (
          (this.data.type = 'custom'),
          (this.data.url = String(this.data.url)),
          (this.data.audio = String(this.data.audio)),
          (this.data.title = String(this.data.title)),
          (this.data.content = s(this.data.content, String)),
          (this.data.image = s(this.data.image, String)),
          this
        );
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor() {
        super('dice');
      }
      get type() {
        return this.data.type;
      }
      coerce() {
        return (this.data.type = Number(this.data.type)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor(t) {
        super('emoji', { id: t });
      }
      get id() {
        return this.data.id;
      }
      coerce() {
        return (this.data.id = Number(this.data.id)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor(t) {
        super('face', { id: t });
      }
      get id() {
        return this.data.id;
      }
      coerce() {
        return (this.data.id = Number(this.data.id)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0),
      s = r(2);
    t.exports = class extends n {
      constructor(t, e = !0) {
        super('image', { file: t }), (this.cache = e);
      }
      get file() {
        return this.data.file;
      }
      get url() {
        return this.data.url;
      }
      get cache() {
        return this.modifier.cache;
      }
      set cache(t) {
        this.modifier.cache = t ? void 0 : 0;
      }
      coerce() {
        return (this.data.file = String(this.data.file)), (this.data.url = s(this.data.url, String)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor(t, e) {
        super('music', { type: t, id: e });
      }
      get type() {
        return this.data.type;
      }
      get id() {
        return this.data.id;
      }
      coerce() {
        return (this.data.type = String(this.data.type)), (this.data.id = Number(this.data.id)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor(t, e) {
        super('record', { file: t }), (this.magic = e);
      }
      get file() {
        return this.data.file;
      }
      hasMagic() {
        return Boolean(this.modifier.magic);
      }
      get magic() {
        return this.modifier.magic;
      }
      set magic(t) {
        this.modifier.magic = !!t || void 0;
      }
      coerce() {
        return (this.data.file = String(this.data.file)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor() {
        super('rps');
      }
      get type() {
        return this.data.type;
      }
      coerce() {
        return (this.data.type = Number(this.data.type)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor(t) {
        super('sface', { id: t });
      }
      get id() {
        return this.data.id;
      }
      coerce() {
        return (this.data.id = Number(this.data.id)), this;
      }
    };
  },
  function (t, e, r) {
    const n = r(0);
    t.exports = class extends n {
      constructor() {
        super('shake');
      }
    };
  },
  function (t, e, r) {
    const n = r(0),
      s = r(2);
    t.exports = class extends n {
      constructor(t, e, r, n) {
        super('share', { url: t, title: e, content: r, image: n });
      }
      get url() {
        return this.data.url;
      }
      get title() {
        return this.data.title;
      }
      get content() {
        return this.data.content;
      }
      get image() {
        return this.data.image;
      }
      coerce() {
        return (
          (this.data.url = String(this.data.url)),
          (this.data.title = String(this.data.title)),
          (this.data.content = s(this.data.content, String)),
          (this.data.image = s(this.data.image, String)),
          this
        );
      }
    };
  },
  function (t, e) {
    t.exports = {
      SocketError: class extends Error {
        constructor(t) {
          super(t), (this.name = 'SocketError');
        }
      },
      UnexpectedContextError: class extends Error {
        constructor(t, e) {
          super('Unexpected context is received.'),
            (this.name = 'UnexpectedContextError'),
            (this.context = t),
            (this.reason = e);
        }
      },
      InvalidWsTypeError: class extends Error {
        constructor(t) {
          super(`"${t}" is not a valid websocket type.`), (this.which = t);
        }
      },
      InvalidContextError: class extends SyntaxError {
        constructor(t, e) {
          super(`[Websocket: ${t}] has received an invalid context.\nRaw data: ${e}`),
            (this.name = 'InvalidContextError'),
            (this.which = t),
            (this.data = e);
        }
      },
      APITimeoutError: class extends Error {
        constructor(t, e) {
          super(`The API response has reached the timeout (${t} ms).`), (this.req = e);
        }
      },
    };
  },
]);
