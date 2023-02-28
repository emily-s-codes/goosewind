import { useEffect, useState } from "react";
import SinglePost from "../components/SinglePost";
import Spinner from "../components/Spinner";
import BlogViewSection from "../shared/BlogViewSection";
import H1 from "../shared/H1";

const PublicBlog = ({ update, setFetching, fetching }) => {
    const [allPosts, setAllPosts] = useState(null)

    useEffect(() => {
        setFetching(true)
        const getBlogPosts = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/allposts`)
            if (response.ok) {
                setFetching(false)
                const data = await response.json()
                setAllPosts(data)
            }
            else {
                console.log('error loading blog posts')
            }
        }
        getBlogPosts()
    }, [update])


    return (
        <main>
            <H1 />
            <BlogViewSection>
                {fetching ? <Spinner /> :
                    allPosts?.map((post, key) => {
                        return <SinglePost key={key} post={post} />
                    })}
            </BlogViewSection>
        </main>
    );
}

export default PublicBlog;