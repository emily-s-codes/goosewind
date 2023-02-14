import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const ManageToolbar = ({ setEdit, edit, editPost }) => {
    return (
        <section className="my-2 flex justify-evenly">
            <EditPost setEdit={setEdit} edit={edit} editPost={editPost} />
            <DeletePost />
        </section>
    );
}

export default ManageToolbar;