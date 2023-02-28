import { Link } from "react-router-dom";

const Tag = ({tag, edit}) => {
    return ( 
        <>
        {edit &&        
                <p className="text-blue-800">#{tag}</p>
        }
        {!edit && 
            <Link to={`/${tag}`}>
                <p className="text-blue-800">#{tag}</p>
            </Link>
        }
        </>
     );
}
 
export default Tag;