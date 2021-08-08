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
  @decorator2
  static get #p () {
    return 'a';
  }
  static get check(){
    return this.#p;
  }
}

console.assert (C.check === 'a');
console.assert (C[ Symbol.metadata ][ONE].private[0] === 1);
console.assert (C[ Symbol.metadata ][TWO].private[0] === 2);
console.assert (C[ Symbol.metadata ][TWO].private.length === 1);