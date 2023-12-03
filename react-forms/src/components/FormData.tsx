import { useAppSelector } from "../store/hooks";
import FieldData from "./FieldData";
import Image from "./Image";

function FormData() {
  const data = useAppSelector((state) => state.userData.data);

  if (data) {
    return (
      <>
        {Object.entries(data).map((val) => {
          const key = `${val[0]}`;
          if (val[1]) {
            if (key === "image") {
              if (typeof val[1] === "string")
                return <Image data={{ label: key, value: val[1] }} key={key} />;
              return null;
            }
            return (
              <FieldData data={{ label: key, value: `${val[1]}` }} key={key} />
            );
          }
          return null;
        })}
      </>
    );
  }
  return null;
}

export default FormData;
