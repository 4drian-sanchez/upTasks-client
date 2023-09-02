import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export const Header = () => {

    const { setHeaderHeight } = useAuth()
    const headerRef = useRef(null);


    useEffect(() => {
        if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
    }, []);

    return (
        <header
            ref={headerRef}
            className="bg-white p-5 border-b shadow"
        >
            <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
                <Link to={'/proyectos'} className="font-black text-sky-500  text-2xl">UpTasks</Link>

                <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-center mt-5 md:mt-0">
                    <Link
                        to={'/proyectos'}
                        className="text-gray-600 font-bold uppercase text-sm"
                    >Proyectos
                    </Link>

                    <button
                        className="text-white text-sm uppercase font-bold py-2 px-3 bg-sky-500 hover:bg-sky-700 transition-all rounded-md ">
                        Cerrar sesiòn
                    </button>

                </div>

            </div>
        </header>
    )
}
