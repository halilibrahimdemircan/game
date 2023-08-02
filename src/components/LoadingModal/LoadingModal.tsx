import style from './loading.module.css';

const LoadingModal = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className={`${style.music} relative inline-flex text-center justify-between items-center bg-transparent`}>
                <div className={`${style.bar} w-3 rounded-10 bg-#38cae4`}></div>
                <div className={`${style.bar} w-3 rounded-10 bg-#0066FF`}></div>
                <div className={`${style.bar} w-3 rounded-10 bg-#38cae4`}></div>
                <div className={`${style.bar} w-3 rounded-10 bg-#0066FF`}></div>
                <div className={`${style.bar} w-3 rounded-10 bg-#38cae4`}></div>
                <div className={`${style.bar} w-3 rounded-10 bg-#0066FF`}></div>
                <div className={`${style.bar} w-3 rounded-10 bg-#38cae4`}></div>
                <div className={`${style.bar} w-3 rounded-10 bg-#0066FF`}></div>
                <div className={`${style.bar} w-3 rounded-10 bg-#38cae4`}></div>
                <div className={`${style.bar} w-3 rounded-10 bg-#0066FF`}></div>
            </div>
        </div>
    )
}

export default LoadingModal