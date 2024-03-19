export function isArray(obj: any): boolean {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(obj) === "[object Array]";
  } else {
    return Array.isArray(obj);
  }
}
