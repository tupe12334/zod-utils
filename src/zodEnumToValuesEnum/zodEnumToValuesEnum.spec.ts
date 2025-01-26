import { describe, it, expect } from "vitest";
import { z } from "zod";
import { zodEnumToValuesEnum } from "./zodEnumToValuesEnum";

describe("zodEnumToValuesEnum", () => {
  it("should return an object with the values of the ZodEnum", () => {
    const MyEnum = z.enum(["a", "b", "c"]);
    const MyEnumValues = zodEnumToValuesEnum(MyEnum);

    expect(MyEnumValues.a).toBe("a");
    expect(MyEnumValues.b).toBe("b");
    expect(MyEnumValues.c).toBe("c");
  });

  it("should throw an error for accessing a non-existent property", () => {
    const MyEnum = z.enum(["a", "b", "c"]);
    const MyEnumValues = zodEnumToValuesEnum(MyEnum);

    //@ts-expect-error
    expect(() => MyEnumValues.d).toBeUndefined();
  });
});
