function decorator(value, context) {
  console.assert(context.kind === "auto-accessor");
  console.assert(context.name === "#p");
  console.assert(typeof context.setMetadata === "function");
  console.assert(typeof context.getMetadata === "function");
  console.assert(context.isPrivate);
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

const _A_p_get_symbol_31s74 = Symbol();

const _A_p_set_symbol_7cetn = Symbol();

let _A_p_getter_aojtu;

let _A_p_setter_e7f28g;

let _A_p_initializer_1uehfo;

class A {
  #_p_private_property_i58n3 = _A_p_initializer_1uehfo.call(this, 1);
  get #p() {
    return _A_p_getter_aojtu.call(this);
  }
  set #p(v) {
    return _A_p_setter_e7f28g.call(this, v);
  }
  static _A_p_getter_aojtu() {
    return this.#_p_private_property_i58n3;
  }
  static _A_p_setter_e7f28g(v) {
    this.#_p_private_property_i58n3 = v;
  }
  [_A_p_get_symbol_31s74]() {
    return this.#p;
  }
  [_A_p_set_symbol_7cetn](v) {
    this.#p = v;
  }
}

_A_p_getter_aojtu = A._A_p_getter_aojtu;

_A_p_setter_e7f28g = A._A_p_setter_e7f28g;

delete A._A_p_getter_aojtu;

delete A._A_p_setter_e7f28g;

const _A_p_result_so97ko = decorator({
  get: _A_p_getter_aojtu,
  set: _A_p_setter_e7f28g
}, {
  kind: "auto-accessor",
  name: "#p",
  access: {
    get: A.prototype[_A_p_get_symbol_31s74],
    set: A.prototype[_A_p_set_symbol_7cetn]
  },
  isStatic: false,
  isPrivate: true,
  ...__PrepareMetadata(A.prototype, "private", undefined)
}) || {};

_A_p_initializer_1uehfo = _A_p_result_so97ko.initialize || (v => v);

_A_p_getter_aojtu = _A_p_result_so97ko.get || _A_p_getter_aojtu;

_A_p_setter_e7f28g = _A_p_result_so97ko.set || _A_p_setter_e7f28g;