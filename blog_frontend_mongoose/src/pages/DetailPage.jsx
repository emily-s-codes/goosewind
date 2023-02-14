import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ManageToolbar from "../components/ManageToolbar";
import Spinner from "../components/Spinner";

const DetailPage = ({ setFetching, fetching, user }) => {
    const params = useParams()

    const [post, setPost] = useState(null)
    const [edit, setEdit] = useState(false)
    const [newImage, setNewImage] = useState(false)
    const [image, setImage] = useState(null)

    const titleRef = useRef()
    const slugRef = useRef()
    const contentRef = useRef()
    const fileRef = useRef()

    const updatePicture = () => {
        setImage(URL.createObjectURL(fileRef.current.files[0]))
        setNewImage(true)
    }

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blog/${params.post}`)
            if (response.ok) {
                setFetching(false)
                const data = await response.json()
                setPost(data[0])
            }
            else {
                setFetching(false)
            }
        }
        getPost()
    }, [])

    const editPost = async () => {

        if (edit) {
            try {
                const updatedPost = {
                    title: titleRef.current.innerText,
                    slug: slugRef.current.innerText,
                    content: contentRef.current.innerText
                }
                if (newImage) {
                    const file = fileRef.current.files[0]
                    const form = new FormData()
                    form.append('file', file)
                    form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
                    const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                        method: 'POST',
                        body: form
                    })
                    const data = await response.json()
                    console.log(data);
                    console.log(post)

                    updatedPost.old_id = post.image.public_id
                    updatedPost.url = data.secure_url
                    updatedPost.public_id = data.public_id
                }

                console.log(updatedPost)
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blog/${params.post}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updatedPost)
                })
                if (response.ok) {
                    console.log(updatedPost)
                    console.log('success editing')
                }
            }
            catch (error) {
                console.error(error.message)
            }
            setEdit(false)
        }

        else {
            setEdit(true)
        }
    }

    const createdDate = new Date(post?.createdAt).toLocaleDateString('de-DE')
    const updatedDate = new Date(post?.updatedAt).toLocaleDateString('de-DE')

    return (
        <main className="mx-10 my-5">
            {user && (user.first === post?.author.first) && <ManageToolbar editPost={editPost} edit={edit} setEdit={setEdit} />}
            {fetching ? <Spinner /> :
                <section>
                    <h2 ref={titleRef} contentEditable={edit} className={edit ? "border border-blue-900 p-1 my-2 rounded" : ""}>{post?.title}</h2>
                    {edit && <p ref={slugRef} contentEditable={edit} className={edit ? "border border-blue-900 p-1 my-2 rounded" : ""}>{post?.slug}</p>}
                    {edit && <input ref={fileRef} type="file" onChange={updatePicture} />}
                    <img src={newImage ? image : post?.image.url} alt="" />
                    <p>TAGS, CLICKABLE to go to category page</p>
                    <p>by {post?.author.first}</p>
                    <p>written: {createdDate}</p>
                    {createdDate !== updatedDate && <p>updated: {updatedDate}</p>}
                    <p ref={contentRef} contentEditable={edit} className={edit ? "border border-blue-900 p-1 my-2 rounded" : ""}>{post?.content}</p>
                </section>}
        </main>
    );
}

export default DetailPage;