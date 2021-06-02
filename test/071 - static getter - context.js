function decorator(value, context) {
  console.assert(context.kind === 'getter');
  console.assert(context.name === 'p');
  console.assert(typeof context.setMetadata === 'function');
  console.assert(typeof context.getMetadata === 'function');
  console.assert( context.isStatic );
}
class A {
  @decorator
  static get p() {}
}