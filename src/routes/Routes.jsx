import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RutasProtegidasLayout from "../layouts/RutasProtegidas";
import { AuthLayout } from "../layouts";
import {
    ConfirmarCuenta,
    Login,
    OlvidePassword,
    Registrar,
    NuevoPassword,
} from "../pages";
import {
    CrearProyecto,
    Proyectos,
    Proyecto,
    EditarProyecto,
} from "../pages/paginasProtegidas";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/registrar",
                element: <Registrar />,
            },
            {
                path: "/olvide-password",
                element: <OlvidePassword />,
            },
            {
                path: "/olvide-password/:token",
                element: <NuevoPassword />,
            },
            {
                path: "/confirmar/:id",
                element: <ConfirmarCuenta />,
            },
        ]
    },
    {
        path: '/proyectos',
        element: <RutasProtegidasLayout />,
        children: [
            {
                path: "/proyectos",
                element: <Proyectos />,
            },
            {
                path: "/proyectos/crear-proyecto",
                element: <CrearProyecto />,
            },
            {
                path: "/proyectos/:id",
                element: <Proyecto />,
            },
            {
                path: "/proyectos/editar/:id",
                element: <EditarProyecto />,
            },
        ]
    }
])

const Routes = () => {
    return (
        <RouterProvider router={router} />
    )
}
export default Routes