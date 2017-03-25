import assert from 'assert';

export function isPromise(object) {
  assert(object.then instanceof Function);
  assert(object.catch instanceof Function);
  assert(object.finally instanceof Function);

  return true;
}
