const ONE = Symbol();

function decorator(value) {
  return function(method, context) {
    const a = context.getMetadata(ONE) || 0;
    context.setMetadata(ONE, a + value);
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

const _C_m_symbol_bdf4cg = Symbol();

class C {
  _C_m_temp_1l838o() {}
  static [_C_m_symbol_bdf4cg] = decorator(1)(C.prototype._C_m_temp_1l838o, {
    kind: "method",
    name: "#m",
    isStatic: false,
    isPrivate: true,
    access: {
      get: C.prototype[_C_m_symbol_bdf4cg]
    },
    ...__PrepareMetadata(C.prototype, "private", "#m")
  }) ?? C.prototype._C_m_temp_1l838o;
  static [_C_m_symbol_bdf4cg] = decorator(2)(C[_C_m_symbol_bdf4cg], {
    kind: "method",
    name: "#m",
    isStatic: false,
    isPrivate: true,
    access: {
      get: C.prototype[_C_m_symbol_bdf4cg]
    },
    ...__PrepareMetadata(C.prototype, "private", "#m")
  }) ?? C[_C_m_symbol_bdf4cg];
  #m = C[_C_m_symbol_bdf4cg];
  [_C_m_symbol_bdf4cg]() {
    return this.#m;
  }
}

delete C.prototype._C_m_temp_1l838o;

console.assert(C.prototype[Symbol.metadata][ONE].private[0] === 3);