import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";

const DeletePost = ({ postId, publicId, setUpdate }) => {
    const nav = useNavigate()
    const removePost = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/post`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id: postId, public_id: publicId })
        })
        if (response.ok) {
            setUpdate(prev => !prev)
            nav('/dashboard')
        }
        else console.log(error.message)
    }
    return (
        <Button onclick={removePost} title="Delete Post" />
    );
}

export default DeletePost;