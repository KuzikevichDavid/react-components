import { UserFormType, countries } from "./store/schemes/userForm";

export const mapData = (data: UserFormType) => {
  const { accept, age, country, email, gender, name, password } = data;
  const selectedCountry = countries.find((v) => v.value === country);
  const selectedCountryLabel = selectedCountry ? selectedCountry.label : "";
  return {
    accept,
    age,
    email,
    name,
    gender,
    password: password.first,
    country: selectedCountryLabel,
  };
};
