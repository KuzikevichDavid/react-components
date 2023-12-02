import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import userSchema, { countries, genderList, SelectItem, UserFormType } from "../../store/schemes/userForm";
import { setUserFormData } from "../../store/reducers/formSlice";
import { connect } from "react-redux";
import { AppRootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../store/reducers/dataSlice";

interface PropType {
  setUserFormData: typeof setUserFormData;
  setUserData: typeof setUserData;
  userFormData: Partial<UserFormType>;
  countries: SelectItem[];
}

function ReactHookFormComponent(props: PropType) {
  const navigate = useNavigate()

  console.log(props);

  const userForm = useForm<UserFormType>({
    resolver: yupResolver<UserFormType>(userSchema),
    mode: "onChange",
    defaultValues: props.userFormData,
  });

  const { handleSubmit, formState: { errors, isValid }, control } = userForm

  const onSubmit = (data: UserFormType) => {
    console.log(data);

    props.setUserFormData(data);

    const { accept, age, country, email, gender, name, password } = data
    const selectedCountry: string = (countries.find(v => v.value === country)?.label)!
    props.setUserData({ accept, age, email, name, gender, password: password.first, country: selectedCountry })

    navigate('..');
  };
  return (
    <>
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} >

        <Controller
          render={({ field }) => {
            const id = 'email'
            return (
              <>
                <label htmlFor={id}>{'email'}</label>
                <input {...field} id={id} />
                <p>{errors.email?.message}</p>
              </>
            )
          }}
          name="email"
          control={control}
          defaultValue=""
        />

        <Controller
          render={({ field, fieldState, }) => {
            const id = 'name'
            return (
              <>
                <label htmlFor={id}>{id}</label>
                <input {...field} id={id} />
                <p>{fieldState.error?.message}</p>
              </>
            )
          }}
          name="name"
          control={control}
          defaultValue=""
        />

        {/*  <fieldset >
          <Controller
            render={({ field }) => {
              const id = 'password_first'
              return (
                <>
                  <label htmlFor={id}>{id}</label>
                  <input type={"password"} {...field} id={id} />
                  <p>{errors.password?.first?.message}</p>
                </>
              )
            }}
            name="password.first"
            control={control}
            defaultValue=""
          />

          <Controller
            render={({ field }) => {
              const id = 'repeat_password'
              return (
                <>
                  <label htmlFor={id}>{'repeat password'}</label>
                  <input type={"password"} {...field} id={id} />
                  <p>{errors.password?.second?.message}</p>
                </>
              )
            }}
            name="password.second"
            control={control}
            defaultValue=""
          />


        </fieldset>
        <p>{errors.password?.message}</p> */}

        <Controller
          render={({ field: rootField, fieldState: rootFieldState }) => {
            const rootId = 'password'
            return (
              <>
                <fieldset id={rootId} ref={rootField.ref}>
                  <Controller
                    render={({ field }) => {
                      const id = 'password_first'
                      return (
                        <>
                          <label htmlFor={id}>{id}</label>
                          <input type={"password"} {...field} id={id} />
                          <p>{errors.password?.first?.message}</p>
                        </>
                      )
                    }}
                    name="password.first"
                    control={control}
                    defaultValue=""
                  />

                  <Controller
                    render={({ field }) => {
                      const id = 'repeat_password'
                      return (
                        <>
                          <label htmlFor={id}>{'repeat password'}</label>
                          <input type={"password"} {...field} id={id} />
                          <p>{errors.password?.second?.message}</p>
                        </>
                      )
                    }}
                    name="password.second"
                    control={control}
                    defaultValue=""
                  />
                </fieldset>
                <p>{`${rootFieldState.invalid}`}</p>
                <p>{rootFieldState.error?.message}</p>
              </>
            )
          }}
          name="password"
          control={control}
        />

        <Controller
          render={({ field }) => {
            const id = 'age'
            return (
              <>
                <label htmlFor={id}>{id}</label>
                <input type={"number"} {...field} id={id} />
                <p>{errors.age?.message}</p>
              </>
            )
          }}
          name="age"
          control={control}
        />

        <Controller
          render={({ field }) => {
            const id = 'country'
            return (
              <>
                <label htmlFor={id}>{id}</label>
                <select {...field} id={id} >
                  {props.countries.map((val) => (<option value={val.value} key={val.value}>{val.label}</option>))}
                  <option value=''></option>
                </select>
                <p>{errors.country?.message}</p>
              </>
            )
          }}
          name="country"
          control={control}
          defaultValue=''
        />

        <Controller
          render={({ field }) => {
            const id = 'gender'
            return (
              <>
                <label htmlFor={id}>{id}</label>
                <select {...field} id={id} >
                  {genderList.map((val) => (<option value={val} key={val}>{val}</option>))}
                  <option value=''></option>
                </select>
                <p>{errors.gender?.message}</p>
              </>
            )
          }}
          name="gender"
          control={control}
          defaultValue=''
        />

        {/* <Controller
          render={({ field }) => {
            const id = 'image'
            return (
              <>
                <label htmlFor={id}>{id}</label>
                <input type={"file"} name={field.name} onBlur={field.onBlur} onChange={field.onChange} ref={field.ref} id={id} />
                <p>{errors.image?.message}</p>
              </>
            )
          }}
          name="image"
          control={control}
          defaultValue={undefined}
        /> 

        <label htmlFor={'image'}>{'image'}</label>
        <input type={"file"} {...register('image')} id={'image'} />
        <p>{errors.image?.message}</p>
        */}

        <Controller
          render={({ field }) => {
            const id = 'accept'
            return (
              <>
                <label htmlFor={id}>{'accept T&C'}</label>
                <input type={"checkbox"} {...field} id={id} />
                <p>{errors.accept?.message}</p>
              </>
            )
          }}
          name="accept"
          control={control}
          defaultValue={undefined}
        />
        <p>{errors.root?.message}</p>
        <input type="submit" disabled={!isValid} />
      </form>
    </>
  );
}
const mapState = (state: AppRootState) => ({ userFormData: state.userFormData.data, countries: state.countries.data });

const ReactHookForm = connect(mapState, { setUserFormData, setUserData })(ReactHookFormComponent);

export default ReactHookForm;
