import { countries } from "./store/schemes/userForm";
import { UserFormWithFileType } from "./store/schemes/userFormWithFile";

const convertToBase64 = (file: File): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const mapData = async (data: UserFormWithFileType) => {
  const { accept, age, country, email, gender, name, password, image } = data;
  const selectedCountry = countries.find((v) => v.value === country);
  const selectedCountryLabel = selectedCountry ? selectedCountry.label : "";
  const files = await Promise.all(
    (image.files as File[]).map(async (file) => {
      const res = (await convertToBase64(file)) as string;
      return res;
    }),
  );
  return {
    accept,
    age,
    email,
    name,
    gender,
    password: password.first,
    country: selectedCountryLabel,
    image: files.length > 0 ? files[0] : "",
  };
};
