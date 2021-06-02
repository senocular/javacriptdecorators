const ONE = Symbol();
const TWO = Symbol();
function decorator1 (value, context) {
  context.setMetadata (ONE, 1);
}

function decorator2 (value, context) {
  context.setMetadata (TWO, 2);
}


class C {
  @decorator1
  @decorator2
  accessor
  p = 10;
}

const c = new C ();
console.assert (C.prototype[ Symbol.metadata ][ONE].public.p === 1);
console.assert (C.prototype[ Symbol.metadata ][TWO].public.p === 2);