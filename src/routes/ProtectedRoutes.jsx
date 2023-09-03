import { CrearProyecto, Proyectos, Proyecto, EditarProyecto } from "../pages/paginasProtegidas";

export const ProtectedRoutes = () => {
    return [
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
