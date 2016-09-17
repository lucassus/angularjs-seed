import _ from 'lodash';

function mixin(target, source, { restricted }) {
  Object.getOwnPropertyNames(source)
    .filter((name) => !_.includes(restricted, name))
    .forEach((name) => {
      const desc = Object.getOwnPropertyDescriptor(source, name);
      Object.defineProperty(target, name, desc);
    });
}

export default function(target, source) {
  // Mix static properties
  mixin(target, source, {
    restricted: ['arguments', 'length', 'name', 'prototype']
  });

  // Mix instance properties
  mixin(target.prototype, source.prototype, {
    restricted: ['constructor']
  });

  return target;
}
