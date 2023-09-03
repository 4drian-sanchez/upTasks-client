import { ConfirmarCuenta, Login, OlvidePassword, Registrar, NuevoPassword, } from "../pages";

export const AuthRoutes = () => {
    return [
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
}
