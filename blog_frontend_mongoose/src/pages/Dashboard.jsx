import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPost from "../components/AddPost";
import SinglePost from "../components/SinglePost";
import Spinner from "../components/Spinner";
import Button from "../shared/Button";

const Dashboard = ({ setTimedOut, setFetching, fetching, setUpdate, update, user, setUser }) => {
    const [openEditor, setOpenEditor] = useState(false)
    const [posts, setPosts] = useState(null)
    const [noPosts, setNoPosts] = useState(false)

    const nav = useNavigate()

    const getPosts = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/posts`, {
            credentials: 'include'
        })
        if (response.ok) {
            setFetching(false)
            const data = await response.json()
            setPosts(data)
            setNoPosts(false)
        }
        else {
            setFetching(false)
            setNoPosts(true)
        }
    }


    useEffect(() => {
        setFetching(true)
        const userData = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user`, {
                credentials: 'include'
            })
            if (response.ok) {
                getPosts()
                const data = await response.json()
                setUser(data)
                nav('/dashboard')
            }
            else {
                setFetching(false)
                console.log('fetch failed', response)
                try {
                    console.log('refresh token process to be added here')
                    nav('/login')
                    setTimedOut(true)
                } catch (error) {
                    return console.log(err.message)
                }
            }
        }
        userData()
    }, [update])

    const logout = async () => {
        setUser(null)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/logout`, {
            credentials: 'include'
        })
        if (response.ok) {
            nav('/')
        } else {
            console.log('problem logging out')
        }
    }


    return (
        <main>
            <h1>My Blog</h1>
            {fetching &&
                <Spinner />}
            {user &&
                <>
                    <section>
                        <p>Welcome back, {user.first}!</p>
                        <Button onclick={() => setOpenEditor(prev => !prev)} title={openEditor ? 'Cancel' : 'Add Post'} />
                        {openEditor &&
                            <AddPost setOpenEditor={setOpenEditor} setUpdate={setUpdate} />}
                        <Button onclick={logout} title="Log Out" />
                    </section>
                    <section className="grid grid-cols-2 auto-rows-max">
                        {noPosts &&
                            <p>You have no posts. Add your first post now!</p>}
                        {posts?.map((post, key) => {
                            return <SinglePost key={key} post={post} user={user} setUpdate={setUpdate} posts={posts} />
                        })}
                    </section>
                </>}
        </main>

    );
}

export default Dashboard;