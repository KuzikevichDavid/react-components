import { connect } from "react-redux";
import { setUserData } from "../../store/reducers/dataSlice";
import { setUserFormData } from "../../store/reducers/formSlice";
import { AppRootState } from "../../store/store";
import ReactHookFormComponent from "./ReactHookFormComponent";

const mapState = (state: AppRootState) => ({
  userFormData: state.userFormData.data,
  countries: state.countries.data,
});

const ReactHookForm = connect(mapState, { setUserFormData, setUserData })(
  ReactHookFormComponent,
);

export default ReactHookForm;
