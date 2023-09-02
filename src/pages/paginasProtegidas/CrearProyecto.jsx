import { FormularioProyecto } from "../../components"

export const CrearProyecto = () => {
    return (
        <div className="w-11/12 md:w-4/6 lg:w-2/3 mx-auto ">

            <h1 className="text-center md:text-start font-bold text-gray-600 text-2xl leading-none mt-5">Crea un nuevo {''}
                <span className="block text-sky-500 text-3xl font-black">proyecto</span>
            </h1>
            <FormularioProyecto />

        </div>
    )
}