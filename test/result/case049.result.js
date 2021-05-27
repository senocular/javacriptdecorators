function decorator(value, context) {
  console.log("value", value);
  console.log("context", context);
  context.addInitializer(function() {
    this.test = 10;
  });
  return function(v) {
    return v * 2;
  };
}

if (!Symbol.metadata) {
  Symbol.metadata = Symbol();
}

function __DefineMetadata(base, name) {
  return function(key, value) {
    if (!base[Symbol.metadata]) {
      base[Symbol.metadata] = Object.create(null);
    }
    if (!base[Symbol.metadata][name]) {
      base[Symbol.metadata][name] = {};
    }
    const db = base[Symbol.metadata][name];
    if (key in db) {
      if (!Array.isArray(db[key])) {
        return db[key] = [db[key], value];
      }
      return db[key].push(value);
    }
    return db[key] = value;
  };
}

let _C_p_initializer_vabll;

const _C_member_initializers_mljh4o = [];

class C {
  constructor() {
    _C_member_initializers_mljh4o.forEach(initialize => initialize.call(this));
  }
  p = _C_p_initializer_vabll.call(this, 10);
}

_C_p_initializer_vabll = decorator(undefined, {
  kind: "field",
  name: "p",
  isStatic: false,
  isPrivate: false,
  defineMetadata: __DefineMetadata(C.prototype, "p"),
  addInitializer: initializer => _C_member_initializers_mljh4o.push(initializer)
}) ?? (v => v);

const c = new C();

console.assert(c.test === 10);

console.assert(c.p === 20);