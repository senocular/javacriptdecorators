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
  function createObjectWithPrototype(obj, key) {
    if (!Object.hasOwnProperty.call(obj, key)) {
      for (let proto = obj; proto; proto = Object.getPrototypeOf(proto)) {
        if (Object.hasOwnProperty.call(proto, key)) {
          return obj[key] = Object.create(proto[key]);
        }
      }
      obj[key] = Object.create(null);
    }
  }
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
      createObjectWithPrototype(base, Symbol.metadata);
      createObjectWithPrototype(base[Symbol.metadata], key);
      createObjectWithPrototype(base[Symbol.metadata][key], "public");
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

class C {
  static get P() {
    return "a";
  }
}

const _C_P_descriptor_rdqlgg = Object.getOwnPropertyDescriptor(C, "P");

_C_P_descriptor_rdqlgg.get = decorator2(_C_P_descriptor_rdqlgg.get, {
  kind: "getter",
  name: "P",
  isStatic: true,
  isPrivate: false,
  ...__PrepareMetadata(C, "public", "P")
}) ?? _C_P_descriptor_rdqlgg.get;

Object.defineProperty(C, "P", _C_P_descriptor_rdqlgg);

const _C_P_descriptor_7ueua8 = Object.getOwnPropertyDescriptor(C, "P");

_C_P_descriptor_7ueua8.get = decorator1(_C_P_descriptor_7ueua8.get, {
  kind: "getter",
  name: "P",
  isStatic: true,
  isPrivate: false,
  ...__PrepareMetadata(C, "public", "P")
}) ?? _C_P_descriptor_7ueua8.get;

Object.defineProperty(C, "P", _C_P_descriptor_7ueua8);

console.assert(C[Symbol.metadata][ONE].public.P === 1);

console.assert(C[Symbol.metadata][TWO].public.P === 2);