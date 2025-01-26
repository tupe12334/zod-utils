# zod-utils

A utility library for Zod.

## Installation

```bash
npm install @tupe12334/zod-utils
```

## Usage

```javascript
const zodUtils = require("@tupe12334/zod-utils");
// ...usage examples...
```

### zodEnumToValuesEnum

Type-safe way to access the values of a ZodEnum.

#### Parameters

- `zodEnum` (ZodEnum): ZodEnum object.

#### Returns

- An object with the values of the ZodEnum.

#### Example

```javascript
const { z } = require("zod");
const { zodEnumToValuesEnum } = require("@tupe12334/zod-utils");

const MyEnum = z.enum(["a", "b", "c"]);
const MyEnumValues = zodEnumToValuesEnum(MyEnum);

console.log(MyEnumValues.a); // "a"
console.log(MyEnumValues.b); // "b"
console.log(MyEnumValues.c); // "c"
console.log(MyEnumValues.d); // Error: Property 'd' does not exist on type '{ a: "a"; b: "b"; c: "c"; }'.
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
