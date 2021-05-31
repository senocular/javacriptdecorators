function addProperty(key, value) {
  return (klass, context) => {
    if (context.kind === "method" && context.addInitializer) {
      context.addInitializer(function() {
        this[key] = value;
      });
    }
  };
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

const _C_member_initializers_it2gso = [];

class C {
  constructor() {
    this.z = 100;
    _C_member_initializers_it2gso.forEach(initialize => initialize.call(this));
  }
  m() {}
}

C.prototype.m = addProperty("a", 1)(C.prototype.m, {
  kind: "method",
  name: "m",
  isStatic: false,
  isPrivate: false,
  ...__PrepareMetadata(C.prototype, "public", "m"),
  addInitializer: initializer => _C_member_initializers_it2gso.push(initializer)
}) ?? C.prototype.m;

C.prototype.m = addProperty("b", 2)(C.prototype.m, {
  kind: "method",
  name: "m",
  isStatic: false,
  isPrivate: false,
  ...__PrepareMetadata(C.prototype, "public", "m"),
  addInitializer: initializer => _C_member_initializers_it2gso.push(initializer)
}) ?? C.prototype.m;

const _D_member_initializers_pilbcg = [];

class D extends C {
  constructor() {
    super();
    _D_member_initializers_pilbcg.forEach(initialize => initialize.call(this));
  }
  m() {}
}

D.prototype.m = addProperty("c", 3)(D.prototype.m, {
  kind: "method",
  name: "m",
  isStatic: false,
  isPrivate: false,
  ...__PrepareMetadata(D.prototype, "public", "m"),
  addInitializer: initializer => _D_member_initializers_pilbcg.push(initializer)
}) ?? D.prototype.m;

D.prototype.m = addProperty("d", 4)(D.prototype.m, {
  kind: "method",
  name: "m",
  isStatic: false,
  isPrivate: false,
  ...__PrepareMetadata(D.prototype, "public", "m"),
  addInitializer: initializer => _D_member_initializers_pilbcg.push(initializer)
}) ?? D.prototype.m;

const c = new C();

console.assert(c.a === 1);

console.assert(c.b === 2);

console.assert(c.c === undefined);

console.assert(c.d === undefined);

const d = new D();

console.assert(d.a === 1);

console.assert(d.b === 2);

console.assert(d.c === 3);

console.assert(d.d === 4);