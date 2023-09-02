import clienteAxios from "../config/clienteAxios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alerta } from "../components/Alerta"
import { useForm } from "../hooks/useForm"

export const Registrar = () => {

    const [alerta, setAlerta] = useState({ msg: '', error: false })
    const { nombre, email, password, repetirPassword, handleChange, setFormState } = useForm({
        nombre: '',
        email: '',
        password: '',
        repetirPassword: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
            return
        }

        if (password.length < 6) {
            setAlerta({ msg: 'Tu contraseña es muy corta, introduce almenos 6 carácteres', error: true })
            return
        }

        if (password !== repetirPassword) {
            setAlerta({ msg: 'Repite bien tu contraseña', error: true })
            return
        }

        setAlerta({ msg: '', error: false })

        try {
            const { data } = await clienteAxios.post(`/usuarios`, { nombre, email, password })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setFormState({
                nombre: '',
                email: '',
                password: '',
                repetirPassword: ''
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }
    return (
        <>
            <h1 className=" text-2xl text-center md:text-5xl text-sky-500 font-black capitalize">Crea tu cuenta y administra tus <span className="text-slate-800">proyectos</span></h1>

            {alerta.msg && <Alerta msg={alerta.msg} error={alerta.error} />}
            <form
                onSubmit={handleSubmit}
                className={`${alerta.msg ? 'mt-3' : 'mt-10'} px-10 py-5 shadow bg-white w-full  rounded-md`}
            >
                <div className="mb-3">
                    <label className="block text-2xl font-bold text-gray-500 " htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        placeholder="Escribe tu nombre"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-2xl font-bold text-gray-500 " htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Ejem: correo@correo.com"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600"
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-2xl font-bold text-gray-500 " htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Coloque su contraseña"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600 "
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-2xl font-bold text-gray-500 " htmlFor="repetirPassword">Repite tu Contraseña</label>
                    <input
                        type="password"
                        name="repetirPassword"
                        id="repetirPassword"
                        value={repetirPassword}
                        onChange={handleChange}
                        placeholder="Coloque su contraseña"
                        className="w-full p-2 shadow rounded-sm outline-none placeholder:text-xs text-gray-600 "
                    />
                </div>

                <input type="submit" value="Crear cuenta" className="w-full bg-sky-600 hover:bg-sky-700 textt-white py-2 text-white rounded-md font-bold uppercase transition-colors cursor-pointer" />
            </form>
            <div className="flex flex-col  items-center gap-2 md:flex-row justify-between  mt-5 w-full">
                <Link to="/" className="text-gray-700  text-sm">Iniciar sesión</Link>
                <Link to="/olvide-password" className="text-gray-700  text-sm">Olvide la contraseña</Link>
            </div>
        </>
    )
}
