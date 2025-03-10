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

let _C_p_initializer_l0gkv8;

const _C_static_initializers_g8tc2o = [];

class __C_94c898 {
  static #_p_private_property_72bse = 10;
  static get p() {
    return this.#_p_private_property_72bse;
  }
  static set p(v) {
    this.#_p_private_property_72bse = v;
  }
}

const ___C_94c898_p_descriptor_p1eg28 = Object.getOwnPropertyDescriptor(__C_94c898, "p");

const ___C_94c898_p_result_lqqfu = decorator({
  get: ___C_94c898_p_descriptor_p1eg28.get,
  set: ___C_94c898_p_descriptor_p1eg28.set
}, {
  kind: "auto-accessor",
  name: "p",
  isStatic: true,
  isPrivate: false,
  ...__PrepareMetadata(__C_94c898, "public", "p"),
  addInitializer: initializer => _C_static_initializers_g8tc2o.push(initializer)
}) || {};

_C_p_initializer_l0gkv8 = ___C_94c898_p_result_lqqfu.initialize || (v => v);

Object.defineProperty(__C_94c898, "p", {
  get: ___C_94c898_p_result_lqqfu.get || ___C_94c898_p_descriptor_p1eg28.get,
  set: ___C_94c898_p_result_lqqfu.set || ___C_94c898_p_descriptor_p1eg28.set
});

___C_94c898_p_descriptor_p1eg28.set.call(
  __C_94c898,
  _C_p_initializer_l0gkv8(___C_94c898_p_descriptor_p1eg28.get.call(__C_94c898))
);

let C = __C_94c898;

Object.defineProperty(C, "name", {
  value: "C"
});

_C_static_initializers_g8tc2o.forEach(initialize => initialize.call(C, C));

console.assert(C.test === 10);

console.assert(C.p === 20);

C.p = 20;

console.assert(C.p === 40);