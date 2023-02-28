import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ManageToolbar from "../components/ManageToolbar";
import Spinner from "../components/Spinner";
import { DateTime } from "luxon";
import Tag from "../components/Tag";
import { UserContext } from "../contexts/UserContext";
import ErrorP from "../shared/ErrorP";
import FileInput from "../shared/FileInput";

const DetailPage = ({ setFetching, fetching, update, setUpdate, setUser}) => {
    const user = useContext(UserContext)

    const params = useParams()

    const [post, setPost] = useState(null)
    const [edit, setEdit] = useState(false)
    const [newImage, setNewImage] = useState(false)
    const [image, setImage] = useState(null)
    const [verifiedUser, setVerifiedUser] = useState(false)

    const titleRef = useRef()
    const slugRef = useRef()
    const contentRef = useRef()
    const fileRef = useRef()

    useEffect(() => { 
        setFetching(true)
        const userData = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user`, {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setUser(data)
            }
            else {
                try {
                    setFetching(false)
                } catch (error) {
                    return console.log(error.message)
                }
            }
        }
        userData()
    }, [update])

    const updatePicture = () => {
        console.log('update picture called')
        setImage(URL.createObjectURL(fileRef.current.files[0]))
        setNewImage(true)
    }
useEffect(()=>{
    console.log(fileRef)
    const getPost = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blog/${params.post}`)
            if (response.ok) {
                setFetching(false)
                const data = await response.json()
                setPost(data[0])
                if (user?._id === data[0]?.author?._id) {
                    setVerifiedUser(true)
                }
                else setVerifiedUser(false)
            }
            else {
                setFetching(false)
            }
        }
    getPost()
},[newImage])
    
    const editPost = async () => {
        if (edit) {
            try {
                const updatedPost = {
                    title: titleRef.current.innerText,
                    slug: slugRef.current.innerText,
                    content: contentRef.current.innerText,
                    url: post?.image?.url,
                    public_id: post?.image?.public_id
                }
                if (newImage === true) {
                    const file = fileRef.current.files[0]
                    const form = new FormData()
                    form.append('file', file)
                    form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
                    const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                        method: 'POST',
                        body: form
                    })
                    const data = await response.json()

                    if(post?.image?.public_id) updatedPost.old_id = post.image.public_id
                    updatedPost.url = data.secure_url
                    updatedPost.public_id = data.public_id
                }
                console.log('updated',updatedPost)
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blog/${params.post}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updatedPost)
                })
                if (response.ok) {
                    setUpdate(prev => !prev)
                    setNewImage(false)
                }
            }
            catch (error) {
                setNewImage(false)
                console.error(error.message)
            }
            setEdit(false)
        }
        else {
            setEdit(true)
            setNewImage(false)
        }
    }

    const createdDate = DateTime.fromISO(post?.createdAt).toLocaleString(DateTime.DATETIME_MED)
    const updatedDate = DateTime.fromISO(post?.updatedAt).toLocaleString(DateTime.DATETIME_MED)

    return (
        <main className="mx-10 my-5">
            {fetching ? <Spinner /> :
                    <>
                    {verifiedUser && 
                    <ManageToolbar post={post} fetching={fetching} editPost={editPost} edit={edit} setEdit={setEdit} />}
                <section>
                    <h2 ref={titleRef} contentEditable={edit} className={edit ? "border border-blue-900 p-1 my-2 rounded text-4xl text-blue-800" : "text-4xl text-blue-800"}>{post?.title}</h2>
                    {edit && <p ref={slugRef} contentEditable={edit} className={edit ? "text-blue-800 border border-blue-900 p-1 my-2 rounded" : ""}>{post?.slug}</p>}
                    {edit && 
                        <div className="flex justify-center items-center">
                            <input type="file" 
                            ref={fileRef} 
                            onChange={updatePicture}
                            className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-800
                    hover:file:bg-blue-100 py-2 px-4 mb-5"/>
                            <img src={newImage ? image : post?.image?.url} alt={post?.title} className="ml-8 object-cover w-48 h-48 rounded-xl" />
                        </div>
                    }
                    <section className="flex justify-between items-center mb-2">
                        <div>
                            {edit && <ErrorP content="Tag edit function in production"/>}
                        {post?.tags.map((tag, key)=> {
                            return <Tag tag={tag} key={key} edit={edit}/>
                        })}
                        </div>
                        <div>
                            {edit && <ErrorP content="These fields cannot be changed"/>}
                            <p className="text-blue-800 text-right">by {post?.author.first}</p>
                            <p className="text-blue-800 text-right">written: {createdDate}</p>
                            {createdDate !== updatedDate && <p className="text-blue-800">updated: {updatedDate}</p>}
                        </div>
                    </section>
                    {!edit && <img src={newImage ? image : post?.image?.url} alt={post?.title} className="ml-8 mb-6 float-right object-cover w-96 h-96 rounded-xl" />}
                    <p ref={contentRef} contentEditable={edit} className={edit ? "text-blue-800 border border-blue-900 rounded" : "text-blue-800"}>{post?.content}</p>
                </section>
                </>
                }
        </main>
    );
}

export default DetailPage;