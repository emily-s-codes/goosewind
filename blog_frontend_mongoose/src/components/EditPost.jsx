import Button from "../shared/Button"

const EditPost = ({ editPost, edit }) => {
    return (
        <Button onclick={editPost} title={edit ? 'Save' : 'Edit Post'} />
    );
}

export default EditPost;