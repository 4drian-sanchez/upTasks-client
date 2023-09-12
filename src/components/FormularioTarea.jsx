import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProyectos } from '../context/ProyectosProvider'
import { Alerta } from './Alerta'

const FormularioTarea = () => {

    const { id: proyecto } = useParams()
    
    const tareaInitialState = { nombre: '', descripcion: '', prioridad: '', proyecto, fechaEntrega: '' }
    const [tarea, setTarea] = useState(tareaInitialState)
    const PRIORIDAD = ["Baja", "Media", "Alta"]
    const { mostrarAlerta, alerta, submitTarea, tarea: tareaProvider } = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()

        if (Object.values(tarea).includes('')) return mostrarAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        })
        submitTarea(tarea)
        mostrarAlerta({})

    }

    useEffect(() => {
        const { nombre, descripcion, prioridad, fechaEntrega, _id } = tareaProvider
        
        if (tareaProvider?._id) {
            setTarea({
                idTarea: _id,
                nombre,
                descripcion,
                prioridad,
                proyecto,
                fechaEntrega: fechaEntrega?.split('T')[0]
            })
            return
        }

        setTimeout(() => {
            setTarea(tareaInitialState)
        }, 2000);

    }, [tareaProvider])

    return (
        <>
            {alerta.msg && <Alerta msg={alerta.msg} error={alerta.error} />}
            <form
                onSubmit={handleSubmit}
                className='mt-5'
            >
                <div className="mb-3 text-start">
                    <label htmlFor="nombre" className=' w-full uppercase font-bold text-gray-500 text-sm mb-2'>nombre</label>
                    <input
                        type="text"
                        placeholder='Nombre de la tarea'
                        className='p-2 w-full placeholder:text-gray-400 outline-none rounded border'
                        name='nombre'
                        value={tarea.nombre}
                        onChange={e => {
                            setTarea({
                                ...tarea,
                                [e.target.name]: e.target.value
                            })
                        }}
                    />
                </div>

                <div className="mb-3 text-start">
                    <label htmlFor="descripcion" className=' w-full uppercase font-bold text-gray-500 text-sm mb-2'>descripción</label>
                    <textarea
                        placeholder='Escribe una breve descripción'
                        className='p-2 w-full placeholder:text-gray-400 outline-none rounded border'
                        name='descripcion'
                        value={tarea.descripcion}
                        onChange={e => {
                            setTarea({
                                ...tarea,
                                [e.target.name]: e.target.value
                            })
                        }}
                    />
                </div>

                <div className="mb-3 text-start">
                    <label
                        htmlFor="fechaEntrega"
                        className=' w-full uppercase font-bold text-gray-500 text-sm mb-2'>Fecha entrega</label>
                    <input
                        type="date"
                        id='fechaEntrega'
                        className='p-2 w-full placeholder:text-gray-400 outline-none rounded border'
                        name='fechaEntrega'
                        value={tarea.fechaEntrega}
                        onChange={e => {
                            setTarea({
                                ...tarea,
                                [e.target.name]: e.target.value
                            })
                        }}
                    />
                </div>

                <div className="mb-3 text-start">
                    <label htmlFor="prioridad" className=' w-full uppercase font-bold text-gray-500 text-sm mb-2'>Prioridad</label>
                    <select
                        className='p-2 w-full placeholder:text-gray-400 outline-none rounded border cursor-pointer'
                        name='prioridad'
                        value={tarea.prioridad}
                        onChange={e => {
                            setTarea({
                                ...tarea,
                                [e.target.name]: e.target.value
                            })
                        }}
                    >
                        <option value="" >-- Seleccione ---</option>
                        {
                            PRIORIDAD.map(p => (
                                <option key={p}>{p}</option>
                            ))
                        }
                    </select>
                </div>

                <input
                    className='mt-3 w-full bg-sky-500 hover:bg-sky-700 transition-colors p-3 rounded-md text-white text-sm font-bold uppercase cursor-pointer'
                    type="submit"
                    value={tarea?.idTarea ? "Guardar cambios" : "Crear tarea"}
                />

            </form>

        </>
    )
}

export default FormularioTarea