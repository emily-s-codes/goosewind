import LoginForm from "../components/LoginForm";
import Spinner from "../components/Spinner"

const LandingPage = ({ fetching, setFetching, unsuccessful, setUnsuccessful }) => {
    return (
        <main className="mx-10">
            {unsuccessful &&
                <p className="text-blue-800">Login unsuccessful. Please check your email and password and try again.</p>}
            <h1 className="text-center text-6xl text-blue-800">GooseWind</h1>
            {fetching ?
                <Spinner /> :
                <LoginForm setUnsuccessful={setUnsuccessful} setFetching={setFetching} />}

        </main>


    );
}

export default LandingPage;