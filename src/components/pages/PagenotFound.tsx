import { Link } from "react-router-dom";

export default function PagenotFound() {
    return (
        <div className="flex flex-col pt-14 w-full justify-center items-center">
            <h1 className="text-3xl py-2 dark:text-gray-200">404</h1>
            <p className="text-lg py-2 dark:text-gray-200">404 ! page not found</p>
            <Link to='/' className="underline font-semibold text-blue-400 py-2">Back To Home</Link>
        </div>
    )
}
