import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import userSchema, {
  countries,
  genderList,
  SelectItem,
  UserFormType,
} from "../../store/schemes/userForm";
import { setUserFormData as setUserFormDataAction } from "../../store/reducers/formSlice";
import { setUserData as setUserDataAction } from "../../store/reducers/dataSlice";

interface PropType {
  setUserFormData: typeof setUserFormDataAction;
  setUserData: typeof setUserDataAction;
  userFormData: Partial<UserFormType>;
  countries: SelectItem[];
}

function ReactHookFormComponent({
  countries: propsCountries,
  setUserData,
  setUserFormData,
  userFormData,
}: PropType) {
  const navigate = useNavigate();

  const userForm = useForm<UserFormType>({
    resolver: yupResolver<UserFormType>(userSchema),
    mode: "onChange",
    defaultValues: userFormData,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = userForm;

  const onSubmit = (data: UserFormType) => {
    console.log(data);

    setUserFormData(data);

    const { accept, age, country, email, gender, name, password } = data;
    const selectedCountry = countries.find((v) => v.value === country);
    const selectedCountryLabel = selectedCountry ? selectedCountry.label : "";
    setUserData({
      accept,
      age,
      email,
      name,
      gender,
      password: password.first,
      country: selectedCountryLabel,
      image: "",
    });

    navigate("..");
  };
  return (
    <>
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          render={({ field }) => {
            const id = "email";
            return (
              <>
                <label htmlFor={id}>email</label>
                <input {...field} id={id} />
                <p role="alert">{errors.email?.message}</p>
              </>
            );
          }}
          name="email"
          control={control}
          defaultValue=""
        />

        <Controller
          render={({ field, fieldState }) => {
            const id = "name";
            return (
              <>
                <label htmlFor={id}>{id}</label>
                <input {...field} id={id} />
                <p role="alert">{fieldState.error?.message}</p>
              </>
            );
          }}
          name="name"
          control={control}
          defaultValue=""
        />

        <Controller
          render={({ field: rootField, fieldState: rootFieldState }) => {
            const rootId = "password";
            return (
              <>
                <fieldset id={rootId} ref={rootField.ref}>
                  <Controller
                    render={({ field }) => {
                      const id = "password_first";
                      return (
                        <>
                          <label htmlFor={id}>{id}</label>
                          <input type="password" {...field} id={id} />
                          <p role="alert">{errors.password?.first?.message}</p>
                        </>
                      );
                    }}
                    name="password.first"
                    control={control}
                    defaultValue=""
                  />

                  <Controller
                    render={({ field }) => {
                      const id = "repeat_password";
                      return (
                        <>
                          <label htmlFor={id}>repeat password</label>
                          <input type="password" {...field} id={id} />
                          <p role="alert">{errors.password?.second?.message}</p>
                        </>
                      );
                    }}
                    name="password.second"
                    control={control}
                    defaultValue=""
                  />
                </fieldset>
                <p role="alert">{rootFieldState.error?.message}</p>
              </>
            );
          }}
          name="password"
          control={control}
        />

        <Controller
          render={({ field }) => {
            const id = "age";
            return (
              <>
                <label htmlFor={id}>{id}</label>
                <input type="number" {...field} id={id} />
                <p role="alert">{errors.age?.message}</p>
              </>
            );
          }}
          name="age"
          control={control}
        />

        <Controller
          render={({ field }) => {
            const id = "country";
            return (
              <>
                <label htmlFor={id}>{id}</label>
                <select {...field} id={id}>
                  {propsCountries.map((val) => (
                    <option value={val.value} key={val.value}>
                      {val.label}
                    </option>
                  ))}
                  <option value="" />
                </select>
                <p role="alert">{errors.country?.message}</p>
              </>
            );
          }}
          name="country"
          control={control}
          defaultValue=""
        />

        <Controller
          render={({ field }) => {
            const id = "gender";
            return (
              <>
                <label htmlFor={id}>{id}</label>
                <select {...field} id={id}>
                  {genderList.map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                  <option value="" />
                </select>
                <p role="alert">{errors.gender?.message}</p>
              </>
            );
          }}
          name="gender"
          control={control}
          defaultValue=""
        />

        <Controller
          render={({ field }) => {
            const id = "accept";
            return (
              <>
                <label htmlFor={id}>accept T&C</label>
                <input type="checkbox" {...field} id={id} />
                <p role="alert">{errors.accept?.message}</p>
              </>
            );
          }}
          name="accept"
          control={control}
          defaultValue={undefined}
        />
        <p role="alert">{errors.root?.message}</p>
        <input type="submit" disabled={!isValid} />
      </form>
    </>
  );
}

export default ReactHookFormComponent;
