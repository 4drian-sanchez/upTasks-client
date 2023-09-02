import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useAuth } from "../context/AuthContext"

const RutasProtegidas = () => {

    const { auth, cargando } = useAuth()
    const navigate = useNavigate()

    if (cargando) return (<p className="text-2xl text-gray-600 font-bold my-5 text-center">Cargando...</p>)
    return (
        <>
            {
                auth?._id
                    ? (
                        <div className="md:min-h-screen">
                            <Header />
                            <div className="md:flex">
                                <main className="md:w-2/3 md:order-2 lg:w-3/4 py-5 pl-3 pr-6">
                                    <Outlet />
                                </main>

                                <aside className={`md:w-1/3 md:order-1 lg:w-1/4 py-5 px-3 text-center space-y-2`}>
                                    <p>Hola <span className="font-bold capitalize">{auth?.nombre}</span></p>

                                    <button
                                        onClick={() => navigate('/proyectos/crear-proyecto')}
                                        className="text-white text-sm uppercase font-bold py-2 px-3 bg-sky-500 hover:bg-sky-700 transition-all rounded-md ">
                                        Crear proyecto
                                    </button>
                                </aside>
                            </div>
                        </div>
                    )
                    : <Navigate to={'/'} />
            }

        </>
    )
}

export default RutasProtegidas