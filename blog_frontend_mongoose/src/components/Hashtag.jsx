import { useRef } from "react"

const HashtagComponent = ({each, hashtagArray, setHashtagArray}) => {
    const removeRef = useRef()
    const removeTagHandler = () => {
        const newArray = hashtagArray.filter(tag => tag !== each)
        setHashtagArray(newArray)
    }

    return ( 
        <div className="flex gap-2 border border-blue-800 rounded" onClick={removeTagHandler}>
            <span className="m-1 p-1 self-center text-blue-800 cursor-pointer">x</span>
            <p ref={removeRef} className="m-1 p-1 self-center text-blue-800 tag">{each}</p>
        </div>
);
}

export default HashtagComponent;