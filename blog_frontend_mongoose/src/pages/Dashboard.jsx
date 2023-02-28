import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPost from "../components/AddPost";
import SinglePost from "../components/SinglePost";
import Spinner from "../components/Spinner";
import BlogViewSection from "../shared/BlogViewSection";
import Button from "../shared/Button";
import H1 from "../shared/H1";
import StandardP from "../shared/StandardP";

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
            if (!data[0]) {
                setNoPosts(true)
            }
            else setNoPosts(false)
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
            }
            else {
                setFetching(false)
                console.log('fetch failed', response)
                try {
                    console.log('refresh token process to be added here')
                    nav('/login')
                    setTimedOut(true)
                } catch (error) {
                    return console.log(error.message)
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
            <H1 />
            {fetching &&
                <Spinner />}
            {user &&
                <>
                    <section className="flex flex-col">
                        <StandardP>Welcome back, {user.first}!</StandardP>
                        <section className="flex justify-center gap-10 my-10">
                            <Button onclick={() => setOpenEditor(prev => !prev)} title={openEditor ? 'Cancel' : 'Add Post'} />
                            <Button onclick={logout} title="Log Out" />
                        </section>
                        {openEditor && 
                            <AddPost setOpenEditor={setOpenEditor} setUpdate={setUpdate} fetching={fetching} setFetching={setFetching} />
                        }
                        {noPosts ?
                            <StandardP>You have no posts. Add your first post now!</StandardP> :
                            <StandardP>Here are your posts:</StandardP>}
                    </section>
                    <BlogViewSection>
                        {!posts ? 
                        <Spinner />:
                        <>{posts?.map((post, key) => {
                            return <SinglePost key={key} post={post} user={user} setUpdate={setUpdate} posts={posts} />
                        })}</>
                        }
                    </BlogViewSection>
                </>}
        </main>

    );
}

export default Dashboard;