import spinner from '../assets/spinner.gif'

const Spinner = () => {
    return (
        <div className='flex flex-col items-center justify-center col-span-full'>
            <img src={spinner} alt="loading" />
        </div>
    );
}

export default Spinner;