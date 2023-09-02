import clienteAxios from "../config/clienteAxios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Alerta } from "../components/Alerta"


export const ConfirmarCuenta = () => {
    const [alerta, setAlerta] = useState({})
    const [usuarioConfirmado, setusuarioConfirmado] = useState(false)
    useEffect(() => {

        const confirmarUsuario = async () => {
            try {
                const url = `/usuarios/confirmar/${id}`
                const { data } = await clienteAxios(url)
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setusuarioConfirmado(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }

        }
        confirmarUsuario()

    }, [])


    const { id } = useParams()
    return (
        <>
            <h1 className=" text-2xl text-center md:text-5xl text-sky-500 font-black capitalize mb-3">
                Confirma tu cuenta y comienza a crear {''}
                <span className="text-slate-800"> proyectos</span>
            </h1>
            {alerta?.msg && <Alerta msg={alerta.msg} error={alerta.error} />}
            {usuarioConfirmado && <Link to="/" className="text-gray-700  text-sm block text-center mt-3">Iniciar sesión</Link>}
        </>
    )
}
