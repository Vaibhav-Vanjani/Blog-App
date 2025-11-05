import { useNavigate } from "react-router-dom";

export default function BackButton(){
    const navigate = useNavigate();
    return <>
        <button
        onClick={() => navigate(-1)}
        className="my-2 ml-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                    rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition-colors duration-200 font-medium"
        >
        Back
        </button>

        </>
}