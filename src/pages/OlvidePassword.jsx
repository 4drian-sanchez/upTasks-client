import clienteAxios from "../config/clienteAxios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alerta } from "../components/Alerta"
import { emailRegex } from "../helpers/emailRegex"

export const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({ msg: '', error: false })

    const handleSubmmit = async e => {

        e.preventDefault()
        if (!emailRegex.test(email)) return setAlerta({
            msg: 'El email no es válido',
            error: true
        })
        setAlerta({ msg: '', error: false })
        try {
            await clienteAxios.post(`/usuarios/olvide-password`,
                { email })
            setAlerta({ msg: 'Revisa tu email para reestablecer tu contraseña', error: false })
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        }

    }

    return (
        <>
            <h1 className=" text-2xl text-center md:text-5xl text-sky-500 font-black capitalize">
                Recupera tu cuenta y no pierdas acceso a tus {''}
                <span className="text-slate-800">proyectos</span>
            </h1>

            <form
                className="px-10 py-5 shadow bg-white w-full mt-10 rounded-md"
                onSubmit={handleSubmmit}
                noValidate
            >
                {alerta.msg && <Alerta msg={alerta.msg} error={alerta.error} />}
                <div className="my-3">
                    <label className="block text-2xl font-bold text-gray-500 " htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Ejem: correo@correo.com"
                        name="email"
                        className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Enviar instrucciones"
                    className="w-full bg-sky-600 hover:bg-sky-700 textt-white py-2 text-white rounded-md font-bold uppercase transition-colors cursor-pointer"
                />
            </form>
            <div className="flex flex-col  items-center gap-2 md:flex-row justify-between  mt-5 w-full">
                <Link to="/" className="text-gray-700  text-sm">Iniciar sesión</Link>
                <Link to="/registrar" className="text-gray-700  text-sm">Crear cuenta</Link>
            </div>
        </>
    )
}
