import { useAppwrite } from "../context/AppwriteContext";
import BackButton from "../components/BackButton";

export default function Profile(){
    const {loggedinUser} = useAppwrite();
   
    return <>
       <BackButton/>
        <div className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">

        {/* File Input */}
        <div className="flex items-center justify-center relative">
           <div className="w-40 h-40 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-800 shadow-md flex items-center justify-center">
            <input
                type="file"
                className="opacity-0 flex block w-full h-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0 file:text-sm file:font-semibold
                            file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200
                            dark:file:bg-blue-900 dark:file:text-blue-300 dark:hover:file:bg-blue-800"
                />
            </div>
            <span className="absolute right-30 bottom-0 cursor-pointer text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors font-medium">
            Edit
            </span>
        </div>

        {/* Name Input */}
        <div>
            <input
            type="text"
            value={loggedinUser?.name ?? ""}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Your Name"
            />
        </div>

        {/* Bio Textarea */}
        <div>
            <textarea
            placeholder="Enter Bio"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 resize-none"
            rows={4}
            />
        </div>

        {/* Submit Button */}
        <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md
                    hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                    transition-colors font-medium"
        >
            Submit
        </button>
        </div>

    </>
}