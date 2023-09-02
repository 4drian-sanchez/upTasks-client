export const Alerta = ({ msg, error }) => {
    return (
        <p
            className={`${error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600 shadow-indigo-950'} 
        text-center p-3 bg-gradient-to-r text-white font-bold rounded-md uppercase my-5 shadow`}
        >{msg}</p>
    )
}