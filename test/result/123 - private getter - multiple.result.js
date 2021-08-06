function decorator1(value, context) {
  if (context.kind === "getter") {
    return function() {
      return value.call(this) * 2;
    };
  }
}

function decorator2(value, context) {
  if (context.kind === "getter") {
    return function() {
      return value.call(this) * 3;
    };
  }
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

const _C_p_symbol_0gosoo = Symbol();

class C {
  _C_p_temp_crmrgo() {
    return 2;
  }
  static [_C_p_symbol_0gosoo] = decorator1(C.prototype._C_p_temp_crmrgo, {
    kind: "getter",
    name: "#p",
    isStatic: false,
    isPrivate: true,
    access: {
      get: C.prototype[_C_p_symbol_0gosoo]
    },
    ...__PrepareMetadata(C.prototype, "private", undefined)
  }) ?? C.prototype._C_p_temp_crmrgo;
  static [_C_p_symbol_0gosoo] = decorator2(C[_C_p_symbol_0gosoo], {
    kind: "getter",
    name: "#p",
    isStatic: false,
    isPrivate: true,
    access: {
      get: C.prototype[_C_p_symbol_0gosoo]
    },
    ...__PrepareMetadata(C.prototype, "private", undefined)
  }) ?? C[_C_p_symbol_0gosoo];
  get #p() {
    return C[_C_p_symbol_0gosoo].bind(this)();
  }
  [_C_p_symbol_0gosoo]() {
    return C[_C_p_symbol_0gosoo].bind(this);
  }
  get check() {
    return this.#p;
  }
}

delete C.prototype._C_p_temp_crmrgo;

const a = new C();

console.assert(a.check === 12);