export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function generateId() {
  return Date.now() + Math.floor(Math.random() * 100);
}

export function rand(x: number) {
  return Math.floor(Math.random() * x + 1);
}


export function normalizeKey(key: string): string {
  return key.length !== 1 ? key : key.toUpperCase();
}
