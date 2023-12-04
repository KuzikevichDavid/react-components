import { NavLink, Outlet, useLocation } from "react-router-dom";
import FormData from "../../components/FormData";
import Routes from "../../routes";
import style from "./Home.module.css";

function Home() {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <nav className={style["nav-element__wrapper"]}>
        <ol className={style["nav-element__list"]}>
          <li className={style["nav-element__list-item"]}>
            <NavLink to={Routes.Home}>Home</NavLink>
          </li>
          <li className={style["nav-element__list-item"]}>
            <NavLink to={Routes.UncontrolledComponents}>
              Uncontrolled Components Form
            </NavLink>
          </li>
          <li className={style["nav-element__list-item"]}>
            <NavLink to={Routes.ReactHookForm}>React Hook Form</NavLink>
          </li>
        </ol>
      </nav>
      <div>
        {location.pathname === Routes.Home && <FormData />}
        <Outlet />
      </div>
    </>
  );
}

export default Home;
