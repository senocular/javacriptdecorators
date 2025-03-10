function decorator(value, context) {
  context.addInitializer(function() {
    this.test = 10;
  });
  return function() {
    return value.call(this) * 2;
  };
}

if (!Symbol.metadata) {
  Symbol.metadata = Symbol("Symbol.metadata");
}

const __metadataPrivate = new WeakMap();

function __PrepareMetadata(base, kind, property) {
  const createObjectWithPrototype = (obj, key) => Object.hasOwnProperty.call(obj, key) ? obj[key] : Object.create(obj[key] || Object.prototype);
  return {
    getMetadata(key) {
      if (base[Symbol.metadata] && base[Symbol.metadata][key] && typeof base[Symbol.metadata][key][kind] !== "undefined") {
        return kind === "public" ? base[Symbol.metadata][key].public[property] : kind === "private" ? __metadataPrivate.has(base[Symbol.metadata][key]) ? __metadataPrivate.get(base[Symbol.metadata][key])[property] : undefined : base[Symbol.metadata][key][kind];
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
            return Object.values(__metadataPrivate.get(base[Symbol.metadata][key]) || {}).concat(Object.getPrototypeOf(base[Symbol.metadata][key])?.private || []);
          }
        });
      }
      if (kind === "public") {
        base[Symbol.metadata][key].public[property] = value;
      } else if (kind === "private") {
        if (!__metadataPrivate.has(base[Symbol.metadata][key])) {
          __metadataPrivate.set(base[Symbol.metadata][key], {});
        }
        __metadataPrivate.get(base[Symbol.metadata][key])[property] = value;
      } else if (kind === "constructor") {
        base[Symbol.metadata][key].constructor = value;
      }
    }
  };
}

const _C_static_initializers_ea89g8 = [];

const _C_p_symbol_cccbv8 = Symbol();

class __C_74d7lg {
  static #q = 10;
  static _C_p_temp_7o0avo() {
    return this.#q;
  }
  static [_C_p_symbol_cccbv8] = decorator(__C_74d7lg._C_p_temp_7o0avo, {
    kind: "getter",
    name: "#p",
    isStatic: true,
    isPrivate: true,
    access: {
      get: __C_74d7lg[_C_p_symbol_cccbv8]
    },
    ...__PrepareMetadata(__C_74d7lg, "private", "#p"),
    addInitializer: initializer => _C_static_initializers_ea89g8.push(initializer)
  }) ?? __C_74d7lg._C_p_temp_7o0avo;
  static get #p() {
    return __C_74d7lg[_C_p_symbol_cccbv8].bind(this)();
  }
  static [_C_p_symbol_cccbv8]() {
    return __C_74d7lg[_C_p_symbol_cccbv8].bind(this);
  }
  static get check() {
    return this.#p;
  }
}

delete __C_74d7lg._C_p_temp_7o0avo;

let C = __C_74d7lg;

Object.defineProperty(C, "name", {
  value: "C"
});

_C_static_initializers_ea89g8.forEach(initialize => initialize.call(C, C));

console.assert(C.test === 10);

console.assert(C.check === 20);