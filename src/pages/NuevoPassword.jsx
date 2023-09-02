import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import { Alerta } from "../components/Alerta"

export const NuevoPassword = () => {
    const { token } = useParams()
    const [tokenValido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState({ msg: '', error: false })
    const [password, setPassword] = useState('')
    const [passwordModificado, setPasswordModificado] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()

        if (password.length < 6) return setAlerta({
            msg: 'La contraseña debe tener minimo 6 carácteres',
            error: true
        })

        try {
            const url = `/usuarios/olvide-password/${token}`
            await clienteAxios.post(url, { password })
            setPasswordModificado(true)
            setAlerta({
                msg: 'contraseña editada correctamente',
                error: false
            })
        } catch (error) {
            setPasswordModificado(false)
            setAlerta({
                msg: 'Error al editar la contraseña',
                error: true
            })
        }

    }

    useEffect(() => {
        const comprobarToken = async () => {

            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setTokenValido(false)
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    return (
        <>
            <h1 className=" text-2xl text-center md:text-5xl text-sky-500 font-black capitalize">
                Reestablece tu {''}
                <span className="text-slate-800"> contraseña</span>
            </h1>
            {alerta.msg && <Alerta msg={alerta.msg} error={alerta.error} />}

            {
                tokenValido && (
                    <form
                        onSubmit={handleSubmit}
                        className="px-10 py-5 shadow bg-white w-full mt-10 rounded-md"
                    >

                        <div className="mb-5">
                            <label className="block text-2xl font-bold text-gray-500 " htmlFor="password">Nueva Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Coloca tu nueva contraseña"
                                name="email"
                                className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600 "
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar"
                            className="w-full bg-sky-600 hover:bg-sky-700 textt-white py-2 text-white rounded-md font-bold uppercase transition-colors cursor-pointer"
                        />
                    </form>
                )
            }
            {passwordModificado && (
                <Link to="/" className="text-gray-700  text-sm block mt-5">Iniciar sesión</Link>
            )}
        </>
    )
}
