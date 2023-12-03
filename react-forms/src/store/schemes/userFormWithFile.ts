import { object, array, TestContext, InferType } from "yup";
import userSchema from "./userForm";

export const imageExt = ["image/png", "image/jpeg"];

function checkIfFilesAreTooBig(files: File[], context: TestContext) {
  let isValid = true;
  if (files) {
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 2) {
        isValid = false;
      }
    });
    if (!isValid) return context.createError({ message: "max file size 2 MB" });
  }
  return isValid;
}

function checkIfFilesAreCorrectType(files: File[], context: TestContext) {
  let isValid = true;
  if (files) {
    files.map((file) => {
      if (!imageExt.includes(file.type)) {
        isValid = false;
      }
    });

    if (!isValid)
      return context.createError({ message: `unsupported file type mas be in: ${imageExt}` });
  }
  return isValid;
}

const userSchemaWithFile = userSchema.shape({
  image: object().shape({
    files: array()
      .nullable()
      .required()
      .test("is-correct-file", checkIfFilesAreCorrectType)
      .test("is-big-file", checkIfFilesAreTooBig),
  }),
});

export type UserFormWithFileType = InferType<typeof userSchemaWithFile>;

export default userSchemaWithFile;
