import style from "./FeildData.module.css";

interface PropType {
  data: {
    label: string;
    value: string;
  };
}

function FieldData({ data: { label, value } }: PropType) {
  return (
    <div className={style["data-field"]}>
      <p>{label}:</p>
      <p>{value}</p>
    </div>
  );
}

export default FieldData;
