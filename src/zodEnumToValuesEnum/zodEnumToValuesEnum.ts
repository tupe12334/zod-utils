import { ZodEnum } from "zod";

/**
 * Type-safe way to access the values of a ZodEnum
 *
 * Provide a const object that takes the values of a ZodEnum and provide a <value, value> const.
 * @param zodEnum ZodEnum object.
 * @returns An object with the values of the ZodEnum.
 * @example
 * const MyEnum = z.enum(["a", "b", "c"]);
 * const MyEnumValues = zodEnumToValuesEnum(MyEnum);
 * console.log(MyEnumValues.a); // "a"
 * console.log(MyEnumValues.b); // "b"
 * console.log(MyEnumValues.c); // "c"
 * console.log(MyEnumValues.d); // Error: Property 'd' does not exist on type '{ a: "a"; b: "b"; c: "c"; }'.
 */
export function zodEnumToValuesEnum<T extends [string, ...string[]]>(
  zodEnum: ZodEnum<T>
): { [K in T[number]]: K } {
  const entries = zodEnum.options.map((value) => [value, value] as const);
  // The runtime object is a faithful <value, value> map, but TypeScript cannot
  // infer the precise mapped return type from `Object.fromEntries`, so a single
  // assertion to the declared return type is unavoidable here.
  // eslint-disable-next-line no-restricted-syntax
  return Object.fromEntries(entries) as { [K in T[number]]: K };
}
