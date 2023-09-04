import { useState, createContext, useContext, useEffect } from "react";
import clienteAxios from '../config/clienteAxios'
import { useAuth } from "./AuthContext";

const ProyectosContext = createContext()
export const useProyectos = () => useContext(ProyectosContext)

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [alerta, setAlerta] = useState({ msg: '', error: false })
    const [modalFormularoTarea, setModalFormularoTarea] = useState(false)
    const mostrarAlerta = alerta => setAlerta(alerta)
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('TOKEN')
                if (!token) return


                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/proyectos', config)
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [auth])

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('TOKEN')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/proyectos', proyecto, config)
            setProyectos([...proyectos, data])
            mostrarAlerta({
                msg: 'Proyecto creado correctamente',
                error: false
            })

        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('TOKEN')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            const proyectoActualizado = proyectos.map(proyectoState =>
                proyectoState._id === proyecto?.id ? data : proyectoState)

            setProyectos(proyectoActualizado)
            mostrarAlerta({
                msg: 'Proyecto editado correctamente',
                error: false
            })
        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: false
            })
        }
    }

    //Aqui validamos con un ternario si existe el id para editar con crear un proyecto nuevo
    const submitProyecto = async proyecto =>
        proyecto.id ? await editarProyecto(proyecto) : await nuevoProyecto(proyecto)

    const submitTarea = async tarea => {
        const token = localStorage.getItem('TOKEN')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await clienteAxios.post('/tareas', tarea, config)
            setModalFormularoTarea(false)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('TOKEN')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            console.log(data)
            setProyecto(data)
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('TOKEN')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            await clienteAxios.delete(`/proyectos/${id}`, config)
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const handleMondalTarea = () => setModalFormularoTarea(!modalFormularoTarea)

    return (
        <ProyectosContext.Provider value={{
            proyectos,
            proyecto,
            alerta,
            mostrarAlerta,
            submitProyecto,
            obtenerProyecto,
            cargando,
            eliminarProyecto,
            handleMondalTarea,
            modalFormularoTarea,
            submitTarea
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export default ProyectosProvider