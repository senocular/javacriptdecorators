const log = [];

function decorator(value, context) {
  if (context.kind === "method" && context.addInitializer) {
    context.addInitializer(function() {
      log.push(`initializing ${context.name}`);
    });
    return function(...args) {
      log.push(`starting ${context.name} with arguments ${args.join(", ")}`);
      const ret = value.call(this, ...args);
      log.push(`ending ${context.name}`);
      return ret;
    };
  }
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

const _C_member_initializers_nesvb8 = [];

class __C_5au1r8 {
  constructor() {
    _C_member_initializers_nesvb8.forEach(initialize => initialize.call(this));
  }
  m(v) {
    return v * 2;
  }
}

__C_5au1r8.prototype.m = decorator(__C_5au1r8.prototype.m, {
  kind: "method",
  name: "m",
  isStatic: false,
  isPrivate: false,
  ...__PrepareMetadata(__C_5au1r8.prototype, "public", "m"),
  addInitializer: initializer => _C_member_initializers_nesvb8.push(initializer)
}) ?? __C_5au1r8.prototype.m;

let C = __C_5au1r8;

Object.defineProperty(C, "name", {
  value: "C"
});

console.assert(new C().m(2) === 4);

console.assert(log[0] === "initializing m");

console.assert(log[1] === "starting m with arguments 2");

console.assert(log[2] === "ending m");