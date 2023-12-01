import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import userSchema, { genderList, UserFormType } from "../../store/schemes/userForm";
import { setUserData } from "../../store/reducers/formSlice";
import { connect } from "react-redux";
import { AppRootState } from "../../store/store";

interface PropType {
  setUserData: typeof setUserData
}

function ReactHookFormComponent(props: PropType) {

  console.log(props);

  const { handleSubmit, formState: { errors }, control, trigger, register } = useForm<UserFormType>({
    resolver: yupResolver(userSchema),
    mode: "onChange"
  });

  const onSubmit = (data: UserFormType) => props.setUserData(data);
  return (
    <>
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} >

        <Controller
          render={({ field }) => {
            const id = 'Math.random().toString()'
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
          render={({ field }) => {
            const id = Math.random().toString()
            return (
              <>
                <label htmlFor={id}>{'name'}</label>
                <input {...field} id={id} />
                <p>{errors.name?.message}</p>
              </>
            )
          }}
          name="name"
          control={control}
          defaultValue=""
        />

        <Controller
          render={() => {
            const id = Math.random().toString()
            return (
              <>
                <div id={id} >
                  <Controller
                    render={({ field }) => {
                      const id = Math.random().toString()
                      return (
                        <>
                          <label htmlFor={id}>{'password'}</label>
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
                      const id = Math.random().toString()
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
                </div>
                <p>{errors.password?.message}</p>
              </>
            )
          }}
          name="password"
          control={control}
        />

        <Controller
          render={({ field }) => {
            const id = Math.random().toString()
            return (
              <>
                <label htmlFor={id}>{'age'}</label>
                <input type={"number"} {...field} id={id} />
                <p>{errors.age?.message}</p>
              </>
            )
          }}
          name="age"
          control={control}
          defaultValue={undefined}
        />

        <Controller
          render={({ field }) => {
            const id = Math.random().toString()
            return (
              <>
                <label htmlFor={id}>{'repeat password'}</label>
                <select {...field} >
                  {genderList.map((val) => (<option value={val}>{val}</option>))}
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

        <Controller
          render={({ field }) => {
            const id = Math.random().toString()
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

        <input type="submit" />
      </form>
    </>
  );
}
const mapState = (state: AppRootState) => state.userFormData.data;

const ReactHookForm = connect(mapState, { setUserData })(ReactHookFormComponent);

export default ReactHookForm;
