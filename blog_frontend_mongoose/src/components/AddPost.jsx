import "./AddPost.css"
import { useRef, useState } from "react"
import Button from "../shared/Button"

const AddPost = ({ setUpdate, setOpenEditor }) => {
    const titleRef = useRef()
    const slugRef = useRef()
    const contentRef = useRef()
    const fileRef = useRef()
    const tagsInputRef = useRef()
    const tagsContainerRef = useRef()

    const [addingTags, setAddingTags] = useState()
    const [hashtagArray, setHashtagArray] = useState([])

    const publishPost = async () => {
        const file = fileRef.current.files[0]
        const form = new FormData()
        form.append('file', file)
        form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
        const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
            method: 'POST',
            body: form
        })
        const data = await response.json()
        console.log(data.public_id)

        const newPost = {
            title: titleRef.current.value,
            slug: slugRef.current.value,
            content: contentRef.current.value,
            image: {
                url: data.secure_url,
                public_id: data.public_id
            }
        }
        console.log('fetching')
        const backendResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/post`, {
            headers: {
                'content-type': 'application/json'
            },
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(newPost)
        })
        console.log('backend response', backendResponse.message)
        if (backendResponse.ok) {
            console.log('backend ok!')
            setUpdate(true)
            setOpenEditor(false)
        }
        else console.log('error uploading image')
    }

    let input = tagsInputRef
    let container = tagsContainerRef

    const tagAddHandler = (event) => {
        setAddingTags(true)
        if (event.keyCode == 13 && input.current.value.length > 0) {
            setHashtagArray(prev => [...prev, input.current.value])
            tagsInputRef.current.value = ""
            // let deleteTags = document.querySelectorAll('.tag');

            // for (let i = 0; i < deleteTags.length; i++) {
            //     deleteTags[i].addEventListener('click', () => {
            //         container.removeChild(deleteTags[i]);
            //     });
            // }
        }
    }


    return (
        <section className="border border-blue-800 rounded p-5 flex flex-col m-9">
            <input ref={titleRef} type="text" name='title' placeholder="title" className="border border-blue-800 rounded py-2 px-2 mb-5 " />
            <input ref={slugRef} type="text" name='slug' placeholder="slug" className="border border-blue-800 rounded py-2 px-2 mb-5" />
            <textarea ref={contentRef} name="content" id="" placeholder="write your post here ... " cols="30" rows="10" className="border border-blue-800 rounded py-2 px-2 mb-5" />
            <input className="border border-blue-800 rounded py-2 px-2 mb-5" type="text" ref={tagsInputRef} autoComplete="off" placeholder="write your tag + enter" onKeyUp={tagAddHandler} />
            {addingTags &&
                <div ref={tagsContainerRef} className="tag-container">
                    {hashtagArray.map((each, key) => {
                        return <p key={key} className="tag">{each}</p>
                    })}</div>
            }
            <input ref={fileRef} type="file" className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-800
                    hover:file:bg-blue-100 py-2 px-4 mb-5"/>
            <Button onclick={publishPost} title="Publish" />

        </section>
    );
}

export default AddPost;