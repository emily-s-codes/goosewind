import { Link } from "react-router-dom";
import Button from "../shared/Button";

const SinglePost = ({ post, }) => {

    return (
        <section className="flex flex-col justify-between items-center drop-shadow-2xl mx-10 my-2 p-4 bg-white rounded-xl h-2/3 overflow-hidden">
            <h3 className="text-center" >{post?.title}</h3>
            <p className="text-sm">{post?.slug}</p>
            <p className="text-sm">Written by: {post?.author.first}</p>
            <img className="object-scale-down w-full h-1/2" src={post?.image?.url} alt={post?.title} />
            <Link to={`/blog/${post._id}`}><Button title="Read More" className="self-end" /></Link>
        </section >
    );
}

export default SinglePost;