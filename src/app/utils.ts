/**
 * It's like `angular.extend` but it can copy getters and setters
 */
export function extend(target, source) {
  const copyDescriptor = (name) => {
    const desc = Object.getOwnPropertyDescriptor(source, name);
    Object.defineProperty(target, name, desc);
  };

  Object.getOwnPropertyNames(source)
    .forEach(copyDescriptor);

  return target;
}
