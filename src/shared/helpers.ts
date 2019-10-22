export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function generateId() {
  return Date.now() + Math.floor(Math.random() * 100);
}

export function rand(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randItem(items: Array<any>) {
  return items[rand(items.length - 1)];
}

export function normalizeKey(key: string): string {
  return key.length !== 1 ? key : key.toUpperCase();
}

export function randRGB() {
  return Math.floor(Math.random() * 255);
}

export function randColor() {
  return `rgb(${randRGB()},${randRGB()},${randRGB()})`;
}

export function times(count, callback) {
  Array.from(Array(count).keys()).forEach(callback);
}

export function createArrayFilledValue(length, value) {
  return Array.from({ length }, () => value);
}

export function hasKeys(set: Set<string>, keys: Array<string>) {
  return keys.some((key: string) => set.has(key));
}

export function compareBy(
  obj1,
  obj2,
  conditions,
  signs = createArrayFilledValue(conditions.length, 1),
  index = 0,
) {
  const condition = conditions[index];
  const sign = signs[index];
  if (obj1[condition] < obj2[condition]) {
    return sign;
  }
  if (obj1[condition] > obj2[condition]) {
    return -sign;
  }
  if (index === conditions.length - 1) {
    return 0;
  }
  return compareBy(obj1, obj2, conditions, signs, ++index);
}
