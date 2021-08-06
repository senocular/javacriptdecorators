const ONE = Symbol();

const TWO = Symbol();

function decorator1(value, context) {
  context.setMetadata(ONE, 1);
}

function decorator2(value, context) {
  context.setMetadata(TWO, 2);
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

const _C_m_symbol_gvq4qg = Symbol();

class C {
  _C_m_temp_c04b6g() {}
  static [_C_m_symbol_gvq4qg] = decorator1(C.prototype._C_m_temp_c04b6g, {
    kind: "method",
    name: "#m",
    isStatic: false,
    isPrivate: true,
    access: {
      get: C.prototype[_C_m_symbol_gvq4qg]
    },
    ...__PrepareMetadata(C.prototype, "private", undefined)
  }) ?? C.prototype._C_m_temp_c04b6g;
  static [_C_m_symbol_gvq4qg] = decorator2(C[_C_m_symbol_gvq4qg], {
    kind: "method",
    name: "#m",
    isStatic: false,
    isPrivate: true,
    access: {
      get: C.prototype[_C_m_symbol_gvq4qg]
    },
    ...__PrepareMetadata(C.prototype, "private", undefined)
  }) ?? C[_C_m_symbol_gvq4qg];
  #m = C[_C_m_symbol_gvq4qg];
  [_C_m_symbol_gvq4qg]() {
    return this.#m;
  }
}

delete C.prototype._C_m_temp_c04b6g;

console.assert(C.prototype[Symbol.metadata][ONE].private[0] === 1);

console.assert(C.prototype[Symbol.metadata][TWO].private[0] === 2);