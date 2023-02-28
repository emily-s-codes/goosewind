import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = ({setTimedOut, setFetching, setUser}) => {
    const user = useContext(UserContext)

    useEffect(() => { 
        setFetching(true)
        const userData = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user`, {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setUser(data)
            }
            else {
                setFetching(false)
                setUser(null)
                // console.log('fetch failed', response)
                try {
                    setTimedOut(true)
                } catch (error) {
                    console.log(error.message)
                }
            }
        }
        userData()
    }, [])
    return (
        <nav>
            <ul className="list-none flex gap-5 justify-end my-5 mx-10">
                <li className="">
                    <NavLink className={({ isActive }) =>
                        isActive ? "text-blue-500 underline" : "text-blue-800 hover:underline hover:text-blue-500"
                    } to="/">Blog</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) =>
                        isActive ? "text-blue-500 underline" : "text-blue-800 hover:underline hover:text-blue-500"
                    } to={user ? "/dashboard" : "/login"}>{user ? "Dashboard" : "Log In"}</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
