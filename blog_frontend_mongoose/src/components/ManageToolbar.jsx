import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import Spinner from "./Spinner";

const ManageToolbar = ({ setEdit, edit, editPost, fetching }) => {

    return (
       <>
       {fetching ?
            <Spinner /> :
            <section className="my-2 flex justify-evenly">
                <EditPost setEdit={setEdit} edit={edit} editPost={editPost} />
                <DeletePost />
            </section>}
       </> 
    );
}

export default ManageToolbar;