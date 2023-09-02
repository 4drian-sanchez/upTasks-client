import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
    return (
        <>
            <main className="md:flex flex-col justify-center items-center w-11/12 md:w-2/3 lg:w-1/3 min-h-screen mx-auto py-5">
                <Outlet />
            </main>
        </>
    )
}