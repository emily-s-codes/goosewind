import { Link } from "react-router-dom";
import Button from "../shared/Button";

const SinglePost = ({ post, }) => {

    return (
        <section className="text-blue-800 flex flex-col justify-between items-center drop-shadow-2xl mx-10 my-2 p-4 bg-white rounded-xl overflow-hidden">
            <div className="flex flex-col items-center">
                <h3 className="text-blue-800 text-center" >{post?.title}</h3>
                <p className="text-blue-800 text-sm mt-2 text-center">{post?.slug}</p>
            </div>
            <img className="object-scale-down w-full h-1/3" src={post?.image?.url} alt={post?.title} />
            <div className="flex flex-col items-center">
                <p className="text-xs mb-2">Written by: {post?.author?.first}</p>
                <Link to={`/blog/${post._id}`}><Button title="Read More" className="self-end" /></Link>
            </div>
        </section >
    );
}

export default SinglePost;