import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "../components/SinglePost.jsx";
import Spinner from "../components/Spinner.jsx";
import BlogViewSection from "../shared/BlogViewSection.jsx"
import H1 from "../shared/H1.jsx";
import H2 from "../shared/H2.jsx";

const SortByTag = ({setFetching, fetching}) => {
    const params = useParams()
    const [taggedPosts, setTaggedPosts] = useState([])

    useEffect(()=> {
        const getTaggedPosts = async() => {
            setFetching(true)
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/posts/${params.tag}`, {
                credentials: 'include'
            })
            if (response.ok) {
                setFetching(false)
                const data = await response.json()
                setTaggedPosts(data)
                console.log(data)
            }
        }
        getTaggedPosts()
    }, [])

    return ( 
        <main>
            <H1 />
            <H2 title={`#${params.tag}`}/>
            {taggedPosts && <BlogViewSection>
                {fetching ? <Spinner /> :
                    taggedPosts?.map((post, key) => {
                        return <SinglePost key={key} post={post} />
                    })}
            </BlogViewSection>}
        </main>
     );
}
 
export default SortByTag;