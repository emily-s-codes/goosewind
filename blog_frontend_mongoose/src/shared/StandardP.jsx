const StandardP = (props) => {
    return ( 
        <p 
        className="
        text-blue-800 
        text-center 
        ">
            {props.children}
        </p>
     );
}
 
export default StandardP;