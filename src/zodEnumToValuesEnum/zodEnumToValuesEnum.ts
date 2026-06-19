import type { ZodEnum } from "zod";

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
  // eslint-disable-next-line no-restricted-syntax -- the accumulator is built up key-by-key in the loop below; the assertion names its final mapped type.
  const valuesEnum = {} as { [K in T[number]]: K };
  // eslint-disable-next-line no-restricted-syntax -- ZodEnum.options is typed as readonly string[]; narrow it to the enum's literal union to keep the loop type-safe.
  for (const value of zodEnum.options as T[number][]) {
    // eslint-disable-next-line security/detect-object-injection -- `value` comes from the enum's own options, not external input.
    valuesEnum[value] = value;
  }
  return valuesEnum;
}
