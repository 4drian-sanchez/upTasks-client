import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RutasProtegidasLayout from "../layouts/RutasProtegidas";
import { AuthLayout } from "../layouts";
import { AuthRoutes, ProtectedRoutes } from "./";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: AuthRoutes()
    },
    {
        path: '/proyectos',
        element: <RutasProtegidasLayout />,
        children: ProtectedRoutes()
    }
])

const Routes = () => <RouterProvider router={router} />
export default Routes