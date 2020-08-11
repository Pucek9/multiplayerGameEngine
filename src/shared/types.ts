export type ParameterlessConstructor<T> = new (props?) => T;

export type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

export type Colors = {
  red: number;
  green: number;
  blue: number;
};

export type ImageFilter = (pixels: ImageData, params?: any) => ImageData;
