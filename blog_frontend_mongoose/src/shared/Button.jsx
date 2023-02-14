const Button = (props) => {
    return (
        <button className="
        self-center
        bg-transparent
        hover:bg-blue-800
        text-blue-800 
        text-xs
        font-semibold 
        hover:text-white 
        py-2 
        px-4 
        border
        border-blue-800 
        hover:border-transparent 
        rounded"
            onClick={props.onclick}
        >{props.title}</button>
    );
}

export default Button;