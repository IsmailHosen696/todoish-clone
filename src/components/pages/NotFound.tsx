import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="w-full h-full flex items-center flex-col">
            <h1 className="pt-14 dark:text-gray-300">Not Found </h1>
            <p className="pt-5 dark:text-gray-400">404 ! Page Not Found</p>
            <Link to='/' className="text-blue-500 py-2 underline">Back To Home Page</Link>
        </div>
    )
}