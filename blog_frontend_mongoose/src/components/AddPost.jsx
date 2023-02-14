import { useRef, useState } from "react"
import Button from "../shared/Button"
import Spinner from "./Spinner"

const AddPost = ({ setUpdate, setOpenEditor, setFetching, fetching }) => {
    const titleRef = useRef()
    const slugRef = useRef()
    const contentRef = useRef()
    const fileRef = useRef()
    const tagsInputRef = useRef()
    const tagsContainerRef = useRef()
    const removeRef = useRef()

    const [addingTags, setAddingTags] = useState()
    const [hashtagArray, setHashtagArray] = useState([])

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
            setFetching(false)
            console.log('backend ok!')
            setUpdate(prev => !prev)
            setOpenEditor(false)
        }
        else {
            setFetching(false)
            console.log('error uploading image')
        }
    }

    let input = tagsInputRef
    let container = tagsContainerRef

    const tagAddHandler = (event) => {
        setAddingTags(true)
        if (event.keyCode == 13 && input.current.value.length > 0) {
            setHashtagArray(prev => [...prev, input.current.value])
            tagsInputRef.current.value = ""
        }
    }

    // remove tags individually: move hashtag return into its own component and handle the deletion/modification of the array from there
    // const removeTagHandler = () => {
    //     console.log(removeRef.current.innerText)
    //     console.log(hashtagArray)
    //     const newArray = hashtagArray.filter(tag => {
    //         console.log(tag)
    //         tag === removeRef.current.innerText
    //     })
    //     setHashtagArray(newArray)
    // }

    return (
        <>
            {fetching ?
                <Spinner /> : ""}
            <section className="drop-shadow-xl rounded p-5 flex flex-col my-9 mx-40">
                <input ref={titleRef} type="text" name='title' placeholder="title" className="border text-blue-800 border-blue-800 rounded py-2 px-2 mb-5 " />
                <input ref={slugRef} type="text" name='slug' placeholder="slug" className="border text-blue-800 border-blue-800 rounded py-2 px-2 mb-5" />
                <textarea ref={contentRef} name="content" id="" placeholder="write your post here ... " cols="30" rows="10" className="border text-blue-800 border-blue-800 rounded py-2 px-2 mb-5" />
                <p className="text-red-500 text-xs">Tag feature is not yet fully functional!</p>
                <input className="border text-blue-800 border-blue-800 rounded py-2 px-2 mb-5" type="text" ref={tagsInputRef} autoComplete="off" placeholder="write your tag + enter" onKeyUp={tagAddHandler} />
                {addingTags &&
                    <div ref={tagsContainerRef} className="flex gap-2 flex-wrap">
                        {hashtagArray.map((each, key) => {
                            return (
                                <div key={key} className="flex gap-2 border border-blue-800 rounded">
                                    {/* onClick={removeTagHandler} */}
                                    <span className="m-1 p-1 self-center text-blue-800 cursor-pointer">x</span>
                                    <p ref={removeRef} className="m-1 p-1 self-center text-blue-800 tag">{each}</p>
                                </div>
                            )
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
        </>
    );
}

export default AddPost;