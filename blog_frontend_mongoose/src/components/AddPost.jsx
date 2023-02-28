import { useRef, useState } from "react"
import Button from "../shared/Button"
import FileInput from "../shared/FileInput"
import HashtagComponent from "./Hashtag"
import Spinner from "./Spinner"

const AddPost = ({ setUpdate, setOpenEditor, setFetching, fetching }) => {
    const titleRef = useRef()
    const slugRef = useRef()
    const contentRef = useRef()
    const fileRef = useRef()
    const tagsInputRef = useRef()

    const [addingTags, setAddingTags] = useState()
    const [hashtagArray, setHashtagArray] = useState([])
    const [image, setImage] = useState(null)

    const updatePicture = () => {
        setImage(URL.createObjectURL(fileRef.current.files[0]))
    }

    const publishPost = async () => {
        setFetching(true)
        const file = fileRef.current.files[0]
        const form = new FormData()
        form.append('file', file)
        form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
        const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
            method: 'POST',
            body: form
        })
        const data = await response.json()

        const newPost = {
            title: titleRef.current.value,
            slug: slugRef.current.value,
            content: contentRef.current.value,
            image: {
                url: data.secure_url,
                public_id: data.public_id
            }, 
            tags: hashtagArray
        }
        const backendResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/post`, {
            headers: {
                'content-type': 'application/json'
            },
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(newPost)
        })
        if (backendResponse.ok) {
            setFetching(false)
            setUpdate(prev => !prev)
            setOpenEditor(false)
        }
        else {
            setFetching(false)
        }
    }

    let input = tagsInputRef
    const tagAddHandler = (event) => {
        setAddingTags(true)
        if (event.keyCode == 13 && input.current.value.length > 0) {
            setHashtagArray(prev => [...prev, input.current.value])
            tagsInputRef.current.value = ""
        }
    }

    return (
        <>
            {fetching &&
            <Spinner /> }
            <section className="drop-shadow-xl rounded p-5 flex flex-col my-9 mx-40">
                <input ref={titleRef} type="text" name='title' placeholder="title" className="border text-blue-800 border-blue-800 rounded py-2 px-2 mb-5 " />
                <input ref={slugRef} type="text" name='slug' placeholder="slug" className="border text-blue-800 border-blue-800 rounded py-2 px-2 mb-5" />
                <textarea ref={contentRef} name="content" placeholder="write your post here ... " cols="30" rows="10" className="border text-blue-800 border-blue-800 rounded py-2 px-2 mb-5" />
                <input className="border text-blue-800 border-blue-800 rounded py-2 px-2 mb-5" type="text" ref={tagsInputRef} autoComplete="off" placeholder="write your tag + enter" onKeyUp={tagAddHandler} />
                {addingTags &&
                    <div className="flex gap-2 flex-wrap">
                        {hashtagArray.map((each, key) => {
                            return (
                                <HashtagComponent 
                                key={key} 
                                each={each}
                                hashtagArray={hashtagArray}
                                setHashtagArray={setHashtagArray}/>
                            )
                        })}</div>
                }
                <div className="flex gap-10 items-center my-8">
                <input type="file" 
                            ref={fileRef} 
                            onChange={updatePicture}
                            className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-800
                    hover:file:bg-blue-100 py-2 px-4 mb-5"/>
                {image && 
                    <img src={image} alt="new" className="object-cover w-48 h-48 rounded-xl"/>}
                </div>
                {fetching ?
                    <Spinner />:
                    <Button onclick={publishPost} title="Publish" />
                }
            </section>
        </>
    );
}

export default AddPost;