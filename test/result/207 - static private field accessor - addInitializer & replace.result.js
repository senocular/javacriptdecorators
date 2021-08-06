function decorator(value, context) {
  context.addInitializer(function() {
    this.test = 10;
  });
  return {
    initialize(v) {
      return v * 2;
    },
    set(v) {
      value.set.call(this, v * 2);
    }
  };
}

if (!Symbol.metadata) {
  Symbol.metadata = Symbol("Symbol.metadata");
}

const __metadataPrivate = new WeakMap();

function __PrepareMetadata(base, kind, property) {
  const createObjectWithPrototype = (obj, key) => Object.hasOwnProperty.call(obj, key) ? obj[key] : Object.create(obj[key] || {});
  return {
    getMetadata(key) {
      if (base[Symbol.metadata] && base[Symbol.metadata][key] && typeof base[Symbol.metadata][key][kind] !== "undefined") {
        return kind === "public" ? base[Symbol.metadata][key].public[property] : base[Symbol.metadata][key][kind];
      }
    },
    setMetadata(key, value) {
      if (typeof key !== "symbol") {
        throw new TypeError("the key must be a Symbol");
      }
      base[Symbol.metadata] = createObjectWithPrototype(base, Symbol.metadata);
      base[Symbol.metadata][key] = createObjectWithPrototype(base[Symbol.metadata], key);
      base[Symbol.metadata][key].public = createObjectWithPrototype(base[Symbol.metadata][key], "public");
      if (!Object.hasOwnProperty.call(base[Symbol.metadata][key], "private")) {
        Object.defineProperty(base[Symbol.metadata][key], "private", {
          get() {
            return (__metadataPrivate.get(base[Symbol.metadata][key]) || []).concat(Object.getPrototypeOf(base[Symbol.metadata][key])?.private || []);
          }
        });
      }
      if (kind === "public") {
        base[Symbol.metadata][key].public[property] = value;
      } else if (kind === "private") {
        if (!__metadataPrivate.has(base[Symbol.metadata][key])) {
          __metadataPrivate.set(base[Symbol.metadata][key], []);
        }
        __metadataPrivate.get(base[Symbol.metadata][key]).push(value);
      } else if (kind === "constructor") {
        base[Symbol.metadata][key].constructor = value;
      }
    }
  };
}

const _C_p_get_symbol_24uo6o = Symbol();

const _C_p_set_symbol_ta6tio = Symbol();

let _C_p_getter_hn2g78;

let _C_p_setter_qbo32;

const _C_static_initializers_gc8om = [];

class C {
  static #_p_private_property_pedaqo = 10;
  static get #p() {
    return _C_p_getter_hn2g78.call(this);
  }
  static set #p(v) {
    return _C_p_setter_qbo32.call(this, v);
  }
  static _C_p_getter_hn2g78() {
    return this.#_p_private_property_pedaqo;
  }
  static _C_p_setter_qbo32(v) {
    this.#_p_private_property_pedaqo = v;
  }
  static [_C_p_get_symbol_24uo6o]() {
    return C.#p;
  }
  static [_C_p_set_symbol_ta6tio](v) {
    C.#p = v;
  }
  static get check() {
    return this.#p;
  }
  static set check(v) {
    this.#p = v;
  }
}

const _C_p_initializer_91vp6g = {
  get: C._C_p_getter_hn2g78,
  set: C._C_p_setter_qbo32
};

_C_p_getter_hn2g78 = C._C_p_getter_hn2g78;

_C_p_setter_qbo32 = C._C_p_setter_qbo32;

delete C._C_p_getter_hn2g78;

delete C._C_p_setter_qbo32;

const _C_p_result_s02ql = decorator({
  get: _C_p_getter_hn2g78,
  set: _C_p_setter_qbo32
}, {
  kind: "auto-accessor",
  name: "#p",
  access: {
    get: C[_C_p_get_symbol_24uo6o],
    set: C[_C_p_set_symbol_ta6tio]
  },
  isStatic: true,
  isPrivate: true,
  ...__PrepareMetadata(C, "private", undefined),
  addInitializer: initializer => _C_static_initializers_gc8om.push(initializer)
}) || {};

_C_p_initializer_91vp6g.set.call(
  C,
  (_C_p_result_s02ql.initialize || (v => v))(_C_p_initializer_91vp6g.get.call(C))
);

_C_p_getter_hn2g78 = _C_p_result_s02ql.get || _C_p_getter_hn2g78;

_C_p_setter_qbo32 = _C_p_result_s02ql.set || _C_p_setter_qbo32;

_C_static_initializers_gc8om.forEach(initialize => initialize.call(C, C));

console.assert(C.test === 10);

console.assert(C.check === 20);

C.check = 20;

console.assert(C.check === 40);