import './App.css'
import { Routes } from './routes'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import Uncontrolled from './pages/Uncontrolled'
import ReactHookForm from './pages/ReactHookForm'

const routes: RouteObject[] = [{
  path: Routes.Home,
  element: <Home />,
  //
  children: [{
    path: Routes.UncontrolledComponents,
    element: <Uncontrolled />,
  }, {
    path: Routes.ReactHookForm,
    element: <ReactHookForm />,
  }]
},]

const router = createBrowserRouter(routes)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
