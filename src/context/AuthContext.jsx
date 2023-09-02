import { useContext, useState, createContext, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const autenticarUsuario = async () => {

            const token = localStorage.getItem('TOKEN')
            if (!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)

            } catch (error) {
                setAuth({})
                console.log(error.response.data.msg)
            }
            setCargando(false)
        }
        autenticarUsuario()

    }, [])


    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            cargando,
            setHeaderHeight,
            headerHeight
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider