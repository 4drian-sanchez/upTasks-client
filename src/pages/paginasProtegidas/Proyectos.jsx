import { Proyecto, Spinner } from "../../components"
import { useProyectos } from "../../context/ProyectosProvider"

export const Proyectos = () => {

    const { proyectos, cargando } = useProyectos()
    if (cargando) return (<Spinner />)


    return (
        <>
            <h1 className="text-center text-2xl text-gray-600 mb-5 uppercase font-bold">Proyectos</h1>
            <div className="bg-white py-7 px-6 rounded-md shadow ">

                {
                    proyectos.map(proyecto => (
                        <Proyecto key={proyecto._id} proyecto={proyecto} />
                    ))
                }
            </div>

        </>
    )

}
