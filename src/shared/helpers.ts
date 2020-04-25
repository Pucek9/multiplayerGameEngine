import { SubType } from './types';

function* incrementer(): Generator<number> {
  let index = 0;
  while (true) yield Date.now() + index++;
}

const gen = incrementer();

export function generateId(): number {
  return gen.next().value;
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function rand(max: number, min = 0): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randItem<T>(items: Array<T>): T {
  return items[rand(items.length - 1)];
}

export function normalizeKey(key: string): string {
  return key.length !== 1 ? key : key.toUpperCase();
}

export function randRGB(): number {
  return Math.floor(Math.random() * 255);
}

export function randColor(): string {
  return `rgb(${randRGB()},${randRGB()},${randRGB()})`;
}

export function times(
  count: number,
  callback: (value: number, index?: number, array?: Array<number>) => void,
) {
  Array.from(Array(count).keys()).forEach(callback);
}

export function createArrayFilledValue<T>(length: number, value: T): Array<T> {
  return new Array(length).fill(value);
}

export function hasKeys(set: Set<string>, keys: Array<string>): boolean {
  return keys.some((key: string) => set.has(key));
}

export function compareBy<T>(
  obj1: T,
  obj2: T,
  conditions: { [P in keyof SubType<T, number>]?: 1 | -1 },
  index = 0,
): number {
  const condition = Object.keys(conditions)[index];
  const sign = conditions[condition];
  if (obj1[condition] < obj2[condition]) {
    return sign;
  }
  if (obj1[condition] > obj2[condition]) {
    return -sign;
  }
  if (index === Object.keys(conditions).length - 1) {
    return 0;
  }
  return compareBy(obj1, obj2, conditions, ++index);
}
