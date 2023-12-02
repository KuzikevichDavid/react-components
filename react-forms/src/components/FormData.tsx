import { useAppSelector } from "../store/hooks";
import FieldData from "./FieldData";

function FormData() {
    const data = useAppSelector((state) => (state.userFormData.data));
    // const countries = useAppSelector((state) => state.countries.data);

    if (data) {
        return (
            <>
                {Object.entries(data).map((val) => {
                    const key = `${val[0]}`
                    if (val[1])
                        return <FieldData data={{ label: key, value: `${val[1]}` }} key={key} />
                })}
            </>
        )
    } else return null
}

export default FormData;