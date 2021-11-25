export default function Loading() {
    return (
        <div className='w-full h-full bg-transparent rounded flex items-center justify-center px-3'>
            <div className='w-3 h-3 bg-gray-300 animate-pulse rounded-full mx-2'></div>
            <div className='w-3 h-3 bg-gray-300 animate-pulse delay-75 rounded-full mx-2'></div>
            <div className='w-3 h-3 bg-gray-300 animate-pulse delay-100 rounded-full mx-2'></div>
        </div>
    )
}
