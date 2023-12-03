import { object, string, number, boolean, InferType, TestContext } from "yup";

const defaultGender = "other";
export const genderList = ["male", "female", defaultGender];

export interface SelectItem {
  value: string;
  label: string;
}
const defaultCountry: SelectItem = {
  label: "Belarus",
  value: "BY",
};

export const countries: SelectItem[] = [
  {
    label: "Russuia",
    value: "RU",
  },
  {
    label: "Poland",
    value: "PL",
  },
  {
    label: "England",
    value: "EN",
  },
  defaultCountry,
];

const countyCodes = countries.map((val) => val.value);
const countryNames = countries.map((val) => val.label);

const msg = "field must contain at least";

const specials = ["!", "?", "@", "#", "$", "&"];

const comparePredicate = (
  value: string,
  symbolArr: string[],
  index: number,
): boolean => value[index] === symbolArr[index];
const comparePredicateLoop = (
  value: string,
  symbolArr: string[],
  index: number,
): boolean => symbolArr.includes(value[index]);

type Predicate = typeof comparePredicate;

const testContainSymbol = (
  value: string,
  context: TestContext,
  symbolArr: string[],
  predicate: Predicate,
  message: string,
) => {
  let isValid = false;
  for (let index = 0; index < value.length; index += 1) {
    if (predicate(value, symbolArr, index)) {
      isValid = true;
      break;
    }
  }
  if (!isValid) return context.createError({ message });
  return isValid;
};

const password = string()
  .min(8)
  .max(32)
  .required()
  .matches(/([0-9]+)/, `${msg} 1 number`)
  .test({
    test: (value: string, context: TestContext) =>
      testContainSymbol(
        value,
        context,
        value.toLowerCase().split(""),
        comparePredicate,
        `${msg} 1 lowercased letter`,
      ),
  })
  .test({
    test: (value: string, context: TestContext) =>
      testContainSymbol(
        value,
        context,
        value.toUpperCase().split(""),
        comparePredicate,
        `${msg} 1 uppercased letter`,
      ),
  })
  .test({
    test: (value: string, context: TestContext) =>
      testContainSymbol(
        value,
        context,
        specials,
        comparePredicateLoop,
        `${msg} 1 special character in list: ${specials}`,
      ),
  });

const passwordObject = object().shape({
  first: password,
  second: password,
});

type PasswordObject = InferType<typeof passwordObject>;

const passwordSchema = passwordObject.test({
  test: (value: PasswordObject, context: TestContext) => {
    const isValid = value.first === value.second;
    return isValid || context.createError({ message: "Passwords don't match" });
  },
});

const name = string()
  .required()
  .test({
    test: (value: string, context: TestContext) => {
      const firsChar = value.charAt(0);
      const other = value.slice(1);
      if (firsChar !== firsChar.toUpperCase()) {
        return context.createError({
          message: "First letter must be uppercased!",
        });
      }
      if (other !== other.toLowerCase()) {
        return context.createError({
          message: "Only first letter must be uppercased!",
        });
      }
      return true;
    },
  });

const userSchema = object({
  email: string().email().required(),
  password: passwordSchema,
  name,
  age: number().required().positive().integer().min(3).max(120),
  gender: string().oneOf(genderList).default(defaultGender),
  country: string()
    .oneOf(countyCodes, `Country value must be in ${countryNames}`)
    .default(defaultCountry.value),
  accept: boolean()
    .isTrue("To continue you must agry with term and cont")
    .required(),
});

export type UserFormType = InferType<typeof userSchema>;

export default userSchema;
