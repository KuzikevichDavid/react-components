import "./App.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Routes from "./routes";
import Home from "./pages/home/Home";
import Uncontrolled from "./pages/Uncontrolled";
import ReactHookForm from "./pages/ReactHookForm/ReactHookForm";

const routes: RouteObject[] = [
  {
    path: Routes.Home,
    element: <Home />,
    children: [
      {
        path: Routes.UncontrolledComponents,
        element: <Uncontrolled />,
      },
      {
        path: Routes.ReactHookForm,
        element: <ReactHookForm />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
