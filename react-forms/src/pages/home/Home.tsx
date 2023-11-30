import { Outlet } from "react-router-dom";
import Routes from "../../routes";
import style from "./Home.module.css";

function Home() {
  return (
    <>
      <nav className={style["nav-element__wrapper"]}>
        <ol className={style["nav-element__list"]}>
          <li className={style["nav-element__list-item"]}>
            <a href={Routes.UncontrolledComponents}>
              Uncontrolled Components Form
            </a>
          </li>
          <li className={style["nav-element__list-item"]}>
            <a href={Routes.ReactHookForm}>React Hook Form</a>
          </li>
        </ol>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
