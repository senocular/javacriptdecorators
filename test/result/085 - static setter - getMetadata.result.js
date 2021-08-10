const META = Symbol();

function meta(value) {
  return function(element, context) {
    const n = context.getMetadata(META) || 0;
    context.setMetadata(META, n + value);
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

class __C_ckmmi {
  static set p(v) {}
  static get p() {}
}

let C = __C_ckmmi;

Object.defineProperty(C, "name", {
  value: "C"
});

const _C_p_descriptor_ro1n38 = Object.getOwnPropertyDescriptor(C, "p");

_C_p_descriptor_ro1n38.get = meta(4)(_C_p_descriptor_ro1n38.get, {
  kind: "getter",
  name: "p",
  isStatic: true,
  isPrivate: false,
  ...__PrepareMetadata(C, "public", "p")
}) ?? _C_p_descriptor_ro1n38.get;

Object.defineProperty(C, "p", _C_p_descriptor_ro1n38);

const _C_p_descriptor_684s8g = Object.getOwnPropertyDescriptor(C, "p");

_C_p_descriptor_684s8g.get = meta(3)(_C_p_descriptor_684s8g.get, {
  kind: "getter",
  name: "p",
  isStatic: true,
  isPrivate: false,
  ...__PrepareMetadata(C, "public", "p")
}) ?? _C_p_descriptor_684s8g.get;

Object.defineProperty(C, "p", _C_p_descriptor_684s8g);

const _C_p_descriptor_5t7e0g = Object.getOwnPropertyDescriptor(C, "p");

_C_p_descriptor_5t7e0g.set = meta(2)(_C_p_descriptor_5t7e0g.set, {
  kind: "setter",
  name: "p",
  isStatic: true,
  isPrivate: false,
  ...__PrepareMetadata(C, "public", "p")
}) ?? _C_p_descriptor_5t7e0g.set;

Object.defineProperty(C, "p", _C_p_descriptor_5t7e0g);

const _C_p_descriptor_61m9sg = Object.getOwnPropertyDescriptor(C, "p");

_C_p_descriptor_61m9sg.set = meta(1)(_C_p_descriptor_61m9sg.set, {
  kind: "setter",
  name: "p",
  isStatic: true,
  isPrivate: false,
  ...__PrepareMetadata(C, "public", "p")
}) ?? _C_p_descriptor_61m9sg.set;

Object.defineProperty(C, "p", _C_p_descriptor_61m9sg);

console.assert(C[Symbol.metadata][META].public.p === 10);