import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alerta } from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import { useAuth } from "../context/AuthContext"

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({ msg: '', error: false })
    const navigate = useNavigate()
    const { setAuth, auth } = useAuth()

    if (auth?._id) return navigate('/proyectos')
    const handleSubmit = async e => {
        e.preventDefault()

        if ([email, password].includes('')) return setAlerta({
            msg: 'Todos los campos son obligatorios', error: true
        })

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            const { token } = await data
            localStorage.setItem('TOKEN', token)
            setAuth(data)
            setAlerta({})
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    return (
        <>
            <h1 className=" text-2xl text-center md:text-5xl text-sky-500 font-black capitalize">
                Inicia sesión y administra tus {''}
                <span className="text-slate-800"> proyectos</span>
            </h1>
            <form
                onSubmit={handleSubmit}
                className="px-10 py-5 shadow bg-white w-full mt-10 rounded-md"
            >
                {alerta.msg && <Alerta msg={alerta.msg} error={alerta.error} />}
                <div className="mb-3">
                    <label className="block text-2xl font-bold text-gray-500 " htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Ejem: correo@correo.com"
                        name="email"
                        className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-2xl font-bold text-gray-500 " htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Coloque su contraseña"
                        name="email"
                        className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600 "
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <input type="submit" value="Iniciar sesión" className="w-full bg-sky-600 hover:bg-sky-700 textt-white py-2 text-white rounded-md font-bold uppercase transition-colors cursor-pointer" />
            </form>
            <div className="flex flex-col  items-center gap-2 md:flex-row justify-between  mt-5 w-full">
                <Link to="/registrar" className="text-gray-700  text-sm">Crear cuenta</Link>
                <Link to="/olvide-password" className="text-gray-700  text-sm">Olvide mi contraseña</Link>
            </div>
        </>
    )
}
