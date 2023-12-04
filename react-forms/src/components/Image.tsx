import style from "./FeildData.module.css";

interface PropType {
  data: {
    label: string;
    value: string;
  };
}

function Image({ data: { label, value } }: PropType) {
  return (
    <div className={style["data-field"]}>
      <p>{label}:</p>
      <img src={value} alt="image" />
    </div>
  );
}

export default Image;
