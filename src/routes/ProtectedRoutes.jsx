import { CrearProyecto, Proyectos, Proyecto, EditarProyecto } from "../pages/paginasProtegidas";
import { NuevoColaborador } from "../pages/paginasProtegidas/nuevoColaborador";

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
        {
            path: "/proyectos/nuevo-colaborador/:id",
            element: <NuevoColaborador />,
        },
    ]
}
