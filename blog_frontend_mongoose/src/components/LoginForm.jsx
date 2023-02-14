import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";

const LoginForm = ({ setUnsuccessful, setFetching }) => {
    const [register, setRegister] = useState(false)
    const navigate = useNavigate()

    const sendAuth = async (e) => {
        e.preventDefault()
        setFetching(true)
        const form = new FormData(e.target)
        //  
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/${register ? "register" : "login"}`, {
            method: 'POST',
            credentials: 'include',
            body: form
        })

        if (response.ok) {
            setFetching(false)
            register ? setRegister(false) : navigate('/dashboard')
        }
        else {
            setFetching(false)
            setUnsuccessful(true)
        }
    }


    return (
        <section className="flex flex-col items-center">
            <form onSubmit={sendAuth} className="flex flex-col w-2/3 p-10">
                <input className="my-2 p-2 rounded bg-white" type="email" name="email" placeholder="email" />
                <input className="my-2 p-2 rounded" type="password" name="pass" placeholder="password" />
                {register &&
                    <input className="my-2 p-2 rounded" type="text" name="first" placeholder="first name" />}
                {register &&
                    <input className="my-2 p-2 rounded" type="text" name="last" placeholder="last name" />}
                <Button type="submit" title={register ? "register" : "login"}></Button>
            </form>
            <p onClick={() => setRegister(!register)}>{!register ? "New" : "Existing"} user? Click to {!register ? "register" : "log in"}</p>
        </section>
    );
}

export default LoginForm;