import LoginForm from "../components/LoginForm";
import Spinner from "../components/Spinner"
import ErrorP from "../shared/ErrorP";

const LandingPage = ({ fetching, setFetching, unsuccessful, setUnsuccessful, loginRequired }) => {
    return (
        <main className="mx-10">
            <h1 className="text-center text-6xl text-blue-800">GooseWind</h1>
            {loginRequired && 
            <ErrorP content="Please log in to view blog posts."/>}
            {unsuccessful &&
                <ErrorP content="Login unsuccessful. Please check your email and password and try again."/>        
            }
            {fetching ?
                <Spinner /> :
                <LoginForm setUnsuccessful={setUnsuccessful} setFetching={setFetching} />}

        </main>


    );
}

export default LandingPage;