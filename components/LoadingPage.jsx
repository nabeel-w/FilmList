export default function Loading() {
    return (
        <div className='sm:flex sm:flex-cols-2 grid grid-cols-1 gap-5 bg-white rounded-md p-8 w-full'>
            <div className='sm:w-[50%] w-[90%]'>
                <div className='w-full rounded bg-gray-300 mb-3 animate-pulse' style={{ height: '24rem' }}></div>
                <div className='flex flex-col gap-2'>
                    {/* Skeleton for streaming provider logos */}
                    <div className='outline_btn p-2'>
                        <div className='w-8 h-8 me-2 bg-gray-300 rounded-2xl animate-pulse'></div>
                        <span className='font-satoshi font-medium bg-gray-300 h-6 animate-pulse w-[80%] rounded'></span>
                    </div>
                    {/* End of streaming provider skeleton */}
                </div>
            </div>
            <div className="block sm:w-full w-[90%] p-6 border border-gray-200 rounded-lg shadow bg-gray-100 h-96">
                <div className='sm:flex items-center mb-5 flex flex-wrap gap-3 '>
                    {/* Skeleton for movie title and genres */}
                    <div className="sm:w-[30%] sm:h-8 h-6 bg-gray-300 rounded-md animate-pulse w-full"></div>
                    <div className="sm:w-[20%] sm:h-6 h-4 bg-gray-300 rounded-md animate-pulse w-[30%]"></div>
                    <div className="sm:w-[15%] sm:h-6 h-4 bg-gray-300 rounded-md animate-pulse w-[30%]"></div>
                    {/* End of title and genres skeleton */}
                </div>
                <div className="sm:flex flex flex-row items-center gap-2 sm:mb-8 mb-3">
                <p className='text-gray-500 sm:text-xl max-w-2xl text-sm mt-1 font-light bg-gray-300 h-4 animate-pulse sm:w-[15%] rounded w-[30%]'></p>
                <p className='text-sm ms-1 font-semibold text-gray-500 bg-gray-300 h-4 animate-pulse sm:w-[5%] rounded w-[10%]'></p>
                </div>
                <p className='text-gray-400 text-base font-semibold mx-1 mb-4 bg-gray-300 h-4 animate-pulse w-[25%] rounded'></p>
                <p className="text-lg text-gray-600 font-satoshi bg-gray-300 animate-pulse h-[40%] rounded"></p>
                
            </div>
        </div>

    )
}