export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export type InputEntry = string | JSONValue[] | { [key: string]: JSONValue };

export type Options = Partial<{
  entryPoints: InputEntry[];
  outfile: string;
  merge?: (items: JSONValue[]) => JSONValue;
}>;
