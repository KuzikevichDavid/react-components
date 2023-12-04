import { FormEvent, RefObject, useRef } from "react";
import { ValidationError } from "yup";
import { useNavigate } from "react-router-dom";
import { genderList } from "../../store/schemes/userForm";
import Input from "./Input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserFormData } from "../../store/reducers/formSlice";
import { mapData } from "../../utils";
import { setUserData } from "../../store/reducers/dataSlice";
import userSchemaWithFile from "../../store/schemes/userFormWithFile";

function Uncontrolled() {
  const emailRef = useRef<HTMLInputElement>(null);
  const emailMsgRef = useRef<HTMLParagraphElement>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const nameMsgRef = useRef<HTMLParagraphElement>(null);

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordMsgRef = useRef<HTMLParagraphElement>(null);

  const passRepeatRef = useRef<HTMLInputElement>(null);
  const passRepeatMsgRef = useRef<HTMLParagraphElement>(null);

  const passMsgRef = useRef<HTMLParagraphElement>(null);

  const ageRef = useRef<HTMLInputElement>(null);
  const ageMsgRef = useRef<HTMLParagraphElement>(null);

  const genderRef = useRef<HTMLSelectElement>(null);
  const genderMsgRef = useRef<HTMLParagraphElement>(null);

  const countryRef = useRef<HTMLSelectElement>(null);
  const countryMsgRef = useRef<HTMLParagraphElement>(null);

  const acceptRef = useRef<HTMLInputElement>(null);
  const acceptMsgRef = useRef<HTMLParagraphElement>(null);

  const imageRef = useRef<HTMLInputElement>(null);
  const imageMsgRef = useRef<HTMLParagraphElement>(null);

  const msgRefsRecord: Record<string, unknown> = {
    name: nameMsgRef,
    email: emailMsgRef,
    password: passMsgRef,
    "password.first": passwordMsgRef,
    "password.second": passRepeatMsgRef,
    age: ageMsgRef,
    gender: genderMsgRef,
    country: countryMsgRef,
    accept: acceptMsgRef,
    "image.files": imageMsgRef,
  };

  const msgRefs: RefObject<HTMLParagraphElement>[] = [
    emailMsgRef,
    nameMsgRef,
    passRepeatMsgRef,
    passwordMsgRef,
    passMsgRef,
    ageMsgRef,
    genderMsgRef,
    countryMsgRef,
    acceptMsgRef,
    imageMsgRef,
  ];

  const countries = useAppSelector((state) => state.countries.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // reset errors
    msgRefs.forEach((val) => {
      if (val.current) val.current.replaceChildren("");
    });

    const fileList = imageRef.current?.files;
    const files: File[] = [];
    if (fileList) {
      for (const file of fileList) {
        files.push(file);
      }
    }

    const dto: Record<string, unknown> = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: {
        first: passwordRef.current?.value,
        second: passRepeatRef.current?.value,
      },
      age: ageRef.current?.value ? +ageRef.current?.value : undefined,
      gender: genderRef.current?.value,
      country: countryRef.current?.value,
      accept: acceptRef.current?.checked,
      image: { files },
    };

    try {
      const res = await userSchemaWithFile.validate(dto, {
        strict: true,
        abortEarly: false,
      });
      dispatch(setUserFormData(res));
      dispatch(setUserData(await mapData(res)));
      navigate("..");
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          const val = err.path;
          if (val) {
            const msgRef = msgRefsRecord[
              val
            ] as RefObject<HTMLParagraphElement>;
            if (msgRef?.current) {
              msgRef.current.innerText +=
                msgRef.current.innerText.length === 0
                  ? err.message
                  : `\n${err.message}`;
            }
          }
        });
      }
    }
  };

  return (
    <>
      <h1 style={{ whiteSpace: "break-spaces" }}>
        Uncontrolled Components Form
      </h1>

      <form
        onSubmit={(event: FormEvent<HTMLFormElement>): Promise<void> =>
          handleSubmit(event)
        }
      >
        <Input
          prop={{
            type: "email",
            inputId: "email",
            label: "email",
            name: "email",
            msgRef: emailMsgRef,
            ref: emailRef,
          }}
        />
        <Input
          prop={{
            type: "text",
            inputId: "name",
            label: "name",
            name: "name",
            msgRef: nameMsgRef,
            ref: nameRef,
          }}
        />
        <fieldset>
          <Input
            prop={{
              type: "password",
              inputId: "password",
              label: "password",
              name: "passwordFirst",
              msgRef: passwordMsgRef,
              ref: passwordRef,
            }}
          />
          <Input
            prop={{
              type: "password",
              inputId: "passwordRepeat",
              label: "repeat password",
              name: "passwordSecond",
              msgRef: passRepeatMsgRef,
              ref: passRepeatRef,
            }}
          />
          <p role="alert" ref={passMsgRef} />
        </fieldset>
        <Input
          prop={{
            type: "number",
            inputId: "age",
            label: "age",
            name: "age",
            msgRef: ageMsgRef,
            ref: ageRef,
          }}
        />
        <Input
          prop={{
            type: "file",
            inputId: "image",
            label: "upload image",
            name: "image",
            msgRef: imageMsgRef,
            ref: imageRef,
          }}
        />

        <label htmlFor="country">
          country
          <select
            id="country"
            ref={countryRef}
            defaultValue=""
            autoComplete="country"
          >
            {countries.map((val) => (
              <option value={val.value} key={val.value}>
                {val.label}
              </option>
            ))}
            <option value="" />
          </select>
        </label>
        <p role="alert" ref={countryMsgRef} />

        <label htmlFor="gender">
          geder
          <select
            id="gender"
            ref={genderRef}
            defaultValue=""
            autoComplete="gender"
          >
            {genderList.map((val) => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
            <option value="" />
          </select>
        </label>
        <p role="alert" ref={genderMsgRef} />

        <Input
          prop={{
            type: "checkbox",
            inputId: "accept",
            label: "accept T&C",
            name: "accept",
            msgRef: acceptMsgRef,
            ref: acceptRef,
          }}
        />

        <button type="submit">Submit form</button>
      </form>
    </>
  );
}

export default Uncontrolled;