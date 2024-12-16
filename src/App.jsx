import s from "./App.module.scss"
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Header } from "./Routs/Header/Header"
import { Registration } from "./Routs/Registration/Registration"
import { LogIn } from "./Routs/LogIn/LogIn"
import { Catalog } from "./Routs/Catalog/Catalog"
import { Page } from './Routs/Page/Page'
import { AboutTitle } from "./Routs/AboutTitle/AboutTitle"
import { Profile } from './Routs/Profile/Profile'
let router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Navigate to="/catalog" />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: 'logIn',
        element: <LogIn />,
      },
      {
        path: 'catalog',
        element: <Catalog />,
      },
      {
        path: ':title/:page',
        element: <Page />
      },
      {
        path: ':title',
        element: <AboutTitle />
      },
      {
        path: '/Profile',
        element: <Profile />
      }
    ]
  },
])

export function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
};

