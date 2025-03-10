const MY_META = Symbol();

function myMeta(value, context) {
  const meta = context.getMetadata(MY_META) || 0;
  context.setMetadata(MY_META, meta + 1);
  return class extends C {};
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

class __C_nbdlb {}

let C = __C_nbdlb;

Object.defineProperty(C, "name", {
  value: "C"
});

C = myMeta(C, {
  kind: "class",
  name: "C",
  ...__PrepareMetadata(C, "constructor", undefined)
}) ?? C;

C = myMeta(C, {
  kind: "class",
  name: "C",
  ...__PrepareMetadata(C, "constructor", undefined)
}) ?? C;

C = myMeta(C, {
  kind: "class",
  name: "C",
  ...__PrepareMetadata(C, "constructor", undefined)
}) ?? C;

console.assert(typeof C[Symbol.metadata] === "object");

console.assert(typeof C[Symbol.metadata][MY_META] === "object");

console.assert(C[Symbol.metadata][MY_META].constructor === 3);