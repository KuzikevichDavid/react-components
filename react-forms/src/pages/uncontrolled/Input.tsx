import { HTMLInputTypeAttribute, RefObject } from "react";

interface PropType {
  prop: {
    type: HTMLInputTypeAttribute;
    label: string;
    name: string;
    inputId: string;
    msgRef: RefObject<HTMLParagraphElement>;
    ref: RefObject<HTMLInputElement>;
  };
}

function UncontrolledInput({
  prop: { type, label, name, inputId, msgRef, ref },
}: PropType) {
  return (
    <>
      <label htmlFor={inputId}>{label}</label>
      <input type={type} id={inputId} name={name} ref={ref} />
      <p ref={msgRef} />
    </>
  );
}

export default UncontrolledInput;
