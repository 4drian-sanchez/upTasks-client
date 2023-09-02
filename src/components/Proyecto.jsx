import { Link } from "react-router-dom"

export const Proyecto = ({ proyecto }) => {

    return (
        <>
            <div className="flex flex-col md:flex-row items-center gap-2 py-2 px-2 border-b mb-2 bg-gray-50 rounded-md shadow">
                <p className="md:flex-1  text-gray-700 text-center md:text-start">
                    {proyecto?.nombre} {''}
                    <span className="text-gray-600 text-sm font-bold">{proyecto?.cliente}</span>
                </p>

                <Link
                    className="uppercase text-xs font-bold bg-sky-700 py-2 px-4 text-white rounded-md hover:bg-sky-800 transition-colors"
                    to={`/proyectos/${proyecto?._id}`}
                > Ver proyecto
                </Link>
            </div>
        </>
    )
}
