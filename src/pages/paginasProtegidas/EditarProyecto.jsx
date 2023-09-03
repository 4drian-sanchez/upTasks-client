import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { FormularioProyecto, Spinner } from "../../components"
import { useProyectos } from "../../context/ProyectosProvider"

export const EditarProyecto = () => {
    const { id } = useParams()
    const { obtenerProyecto, proyecto, cargando } = useProyectos()

    useEffect(() => {
        obtenerProyecto(id)
    }, [])

    if (cargando) return (<Spinner />)
    return (
        <>
            <h1 className="text-gray-600 font-bold text-2xl">Editando el proyecto {proyecto.nombre}</h1>
            <FormularioProyecto />
        </>
    )
}
