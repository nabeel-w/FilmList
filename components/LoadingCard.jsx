
function LoadingCard() {
    return (
        <div className=" rounded overflow-hidden shadow-lg sm:w-64 w-96">
            <div className="w-full h-96 bg-gray-300 animate-pulse"></div>
            <div className="py-4 pe-6 ps-3">
                <div className="font-bold text-xl mb-2 rounded bg-gray-300 h-6 animate-pulse"></div>
                <p className=' text-sm ms-1 font-semibold rounded text-gray-500 bg-gray-300 h-4 animate-pulse'></p> 
            </div>
        </div>

    )
}

export default LoadingCard