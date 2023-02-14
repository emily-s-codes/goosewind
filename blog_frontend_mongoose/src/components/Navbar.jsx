import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
    return (
        <nav>
            <ul className="list-none flex gap-5 justify-end m-5">
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
