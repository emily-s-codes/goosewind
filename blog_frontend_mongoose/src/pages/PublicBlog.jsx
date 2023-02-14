import { useEffect, useState } from "react";
import SinglePost from "../components/SinglePost";
import Spinner from "../components/Spinner";

const PublicBlog = ({ update, setFetching, fetching }) => {
    const [allPosts, setAllPosts] = useState(null)

    useEffect(() => {
        setFetching(true)
        const getBlogPosts = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/allposts`)
            if (response.ok) {
                setFetching(false)
                const data = await response.json()
                await setAllPosts(data)
            }
            else {
                console.log('error loading blog posts')
            }
        }
        getBlogPosts()
    }, [update])


    return (
        <main>
            <h1 className="text-center text-6xl text-blue-800">GooseWind</h1>
            <section className="grid grid-cols-2 my-10 mx-20">
                {fetching ? <Spinner /> :
                    allPosts?.map((post, key) => {
                        return <SinglePost key={key} post={post} />
                    })}
            </section>
        </main>
    );
}

export default PublicBlog;