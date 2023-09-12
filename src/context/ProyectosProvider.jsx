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
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const { auth } = useAuth()
    const mostrarAlerta = alerta => setAlerta(alerta)
    const TOKEN = localStorage.getItem('TOKEN')
    const CONFIG = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`
        }
    }

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const { data } = await clienteAxios('/proyectos', CONFIG)
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [auth])


    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const { data } = await clienteAxios(`/proyectos/${id}`, CONFIG)
            setProyecto(data)
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const { data } = await clienteAxios.post('/proyectos', proyecto, CONFIG)
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
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, CONFIG)

            //Actualizar el state de proyectos
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

    const eliminarProyecto = async id => {
        try {
            await clienteAxios.delete(`/proyectos/${id}`, CONFIG)
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
    //Crear o editar un proyecto
    const submitProyecto = async proyecto =>
        proyecto.id ? await editarProyecto(proyecto) : await nuevoProyecto(proyecto)


    const nuevaTarea = async tarea => {
        
        try {
            const { data } = await clienteAxios.post('/tareas', tarea, CONFIG)
            //Actualizar las tareas
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = [...proyectoActualizado.tareas, data]
            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormularoTarea(false)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const editarTarea = async tarea => {
        try {
            const { data } = await clienteAxios.put(`/tareas/${tarea.idTarea}`, tarea, CONFIG)
            //Actualizar las tareas
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas =  proyectoActualizado.tareas.map( tareaState => 
                tareaState._id === data._id ? data : tareaState
            )
            setProyecto(proyectoActualizado)
            setModalFormularoTarea(false)
            setAlerta({})
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarTarea = async tarea => {
        await clienteAxios.delete(`/tareas/${tarea._id}`, CONFIG)
        const proyectoActualizado = {...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => 
         tareaState._id !== tarea._id)

        setProyecto(proyectoActualizado)
        setModalEliminarTarea(false)
        setTarea({})
    }
    
    //Crear o editar una tarea
    const submitTarea = async tarea => {
        
        if (tarea.idTarea) {
            await editarTarea(tarea)
        } else {
            await nuevaTarea(tarea)
        }

    }

    const handleMondalTarea = () => {
        setModalFormularoTarea(!modalFormularoTarea)
        setTarea({})
    }

    const handleModalEditarTarea = tarea => setTarea(tarea)
    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }
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
            submitTarea,
            handleModalEditarTarea,
            tarea,
            handleModalEliminarTarea,
            modalEliminarTarea,
            eliminarTarea
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export default ProyectosProvider


