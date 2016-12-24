export function appCheckmark() {
  return function(value) {
    return value ? '\u2713' : '\u2718';
  };
}
