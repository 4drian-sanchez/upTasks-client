import { useState, useEffect } from "react"
import { useProyectos } from "../context/ProyectosProvider"
import { useNavigate, useParams } from "react-router-dom"
import { Alerta } from "./Alerta"

export const FormularioProyecto = () => {

    const initialState = { nombre: '', descripcion: '', fechaEntrega: '', cliente: '', id: null }
    const [proyecto, setProyecto] = useState(initialState)
    const { nombre, descripcion, fechaEntrega, cliente } = proyecto
    const navigate = useNavigate()
    const params = useParams()
    const { mostrarAlerta, alerta, submitProyecto, proyecto: proyectoState } = useProyectos()
    const handleSubmit = async e => {
        e.preventDefault()

        if (Object.values(proyecto).includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            setTimeout(() => {
                mostrarAlerta({ msg: '', error: false })
            }, 2000);
            return
        }

        await submitProyecto(proyecto)
        //Reinicio el state de proyecto
        setProyecto(initialState)

        setTimeout(() => {
            mostrarAlerta({ msg: '', error: false })
            navigate('/proyectos')
        }, 2000);
    }

    useEffect(() => {
        if (params.id) {
            setProyecto({
                nombre: proyectoState?.nombre,
                descripcion: proyectoState?.descripcion,
                fechaEntrega: proyectoState.fechaEntrega?.split('T')[0],
                cliente: proyectoState?.cliente,
                id: proyectoState?._id
            })
        }
    }, [params])

    return (
        <form
            className="p-5 mt-5 rounded-md shadow-md bg-white"
            onSubmit={handleSubmit}
        >
            {alerta.msg && <Alerta msg={alerta.msg} error={alerta.error} />}
            <div className="mb-3">
                <label className="block text-lg font-bold text-gray-500 " htmlFor="nombre">Nombre del proyecto</label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Nombre del proyecto"
                    className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600"
                    value={nombre}
                    onChange={e => setProyecto({
                        ...proyecto,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>

            <div className="mb-3">
                <label className="block text-lg font-bold text-gray-500 " htmlFor="descripcion">Descripción</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción del proyecto"
                    className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600"
                    value={descripcion}
                    onChange={e => setProyecto({
                        ...proyecto,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>

            <div className="mb-3">
                <label className="block text-lg font-bold text-gray-500 " htmlFor="fecha-entrega">Fecha de entrega</label>
                <input
                    type='date'
                    id="fecha-entrega"
                    name="fechaEntrega"
                    className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600"
                    value={fechaEntrega}
                    onChange={e => setProyecto({
                        ...proyecto,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>


            <div className="mb-3">
                <label className="block text-lg font-bold text-gray-500 " htmlFor="cliente">Cliente</label>
                <input
                    id="cliente"
                    name="cliente"
                    type="text"
                    placeholder="Nombre del cliente"
                    className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600"
                    value={cliente}
                    onChange={e => setProyecto({
                        ...proyecto,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>

            <input
                type="submit"
                value={proyecto.id ? 'Editar proyecto' : 'Crear proyecto'}
                className="w-full bg-sky-600 hover:bg-sky-700 textt-white py-2 text-white rounded-md font-bold uppercase transition-colors cursor-pointer"
            />
        </form>
    )
}
