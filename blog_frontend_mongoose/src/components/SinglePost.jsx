import { Link } from "react-router-dom";
import Button from "../shared/Button";

const SinglePost = ({ post }) => {

    return (
        <section className="text-blue-800 flex flex-col justify-between items-center drop-shadow-2xl mx-10 my-2 p-4 bg-white rounded-xl overflow-hidden">
            <div className="flex flex-col items-center">
                <h3 className="text-blue-800 text-center h-12 md:text-sm font-bold leading-tight" >{post?.title}</h3>
                <p className="text-blue-800 text-sm mt-2 text-center h-10 md:h-12 hidden sm:block leading-tight">{post?.slug}</p>
            </div>
            <img className="object-cover w-36 h-36 rounded-xl" src={post?.image?.url} alt={post?.title} />
            <div className="flex flex-col items-center">
                <p className="text-xs my-2">Written by: {post?.author?.first}</p>
                <Link to={`/blog/${post._id}`}><Button title="Read More" className="self-end" /></Link>
            </div>
        </section >
    );
}

export default SinglePost;