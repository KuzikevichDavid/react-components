import { object, string, number, boolean, InferType, TestContext } from "yup";

// name(validate for first uppercased letter)
// age(should be number, no negative values)
// email(validate for email)
// 2 passwords(should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)
// gender(you can use radio buttons or select control)
// accept T & C(checkbox)
// input control to upload picture(validate size and extension, allow png jpeg, save in redux store as base64)
// autocomplete control to select country(all countries shoudl be stored in the Redux store) Form should contain labels, which should be connected with inouts(look at htmlFor)

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

// const imageExt = ['png', 'jpeg']
/* 
function checkIfFilesAreTooBig(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      const size = file.size / 1024 / 1024
      if (size > 10) {
        valid = false
      }
    })
  }
  return valid
}

function checkIfFilesAreCorrectType(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        valid = false
      }
    })
  }
  return valid
} */

const password = string()
  .matches(/([A-Z]+)/)
  .min(8)
  .max(32)
  .required();

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
  country: string().oneOf(countyCodes).default(defaultCountry.value),
  /* image: object().shape({
    files: array()
      .nullable()
      .required('VALIDATION_FIELD_REQUIRED')
      .test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG', checkIfFilesAreTooBig)
      .test(
        'is-big-file',
        'VALIDATION_FIELD_FILE_WRONG_TYPE',
        checkIfFilesAreCorrectType
      ),
  }), */
  accept: boolean().isTrue().required(),
});

export type UserFormType = InferType<typeof userSchema>;

export default userSchema;
