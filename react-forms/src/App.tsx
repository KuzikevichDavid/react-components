import "./styles/App.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Routes from "./routes";
import FormData from "./components/FormData";
import Home from "./pages/home/Home";
import Uncontrolled from "./pages/Uncontrolled";
import ReactHookForm from "./pages/ReactHookForm/ReactHookFormComponent";

const routes: RouteObject[] = [
  {
    path: Routes.Home,
    element: <Home />,
    children: [
      {
        index: true,
        element: <FormData />,
      },
    ],
  },
  {
    path: Routes.UncontrolledComponents,
    element: <Uncontrolled />,
  },
  {
    path: Routes.ReactHookForm,
    element: <ReactHookForm />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
