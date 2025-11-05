import { useBlog } from "../context/BlogContext";
import {useAppwrite} from '../context/AppwriteContext'

export default function Form(){
      const {Signup,Login} = useAppwrite();
    
    const {showLoginForm,showSignupForm,
        setShowLoginForm,setShowSignupForm,
        submitUserFormHandler,formChangeHandler,setFormData,formData} = useBlog();
    
// console.log("inside Form component",formData);

    {return (showSignupForm || showLoginForm) && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6">
      {/* Close Button */}
      <button
        className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        onClick={() => {
          typeof setShowSignupForm === 'function' && setShowSignupForm(false);
          typeof setShowLoginForm === 'function' && setShowLoginForm(false);
        }}
      >
        ✕
      </button>

      {/* Form */}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          typeof setShowSignupForm === 'function' && setShowSignupForm(false);
          typeof setShowLoginForm === 'function' && setShowLoginForm(false);
          typeof submitUserFormHandler === 'function' &&
            submitUserFormHandler(e, Signup!, Login!);
        }}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">
          {showLoginForm ? 'Login' : 'Sign Up'}
        </h2>

        {!showLoginForm && (
          <div className="flex gap-3">
            <input
              value={formData?.fname ?? ''}
              required
              placeholder="First Name"
              type="text"
              name="fname"
              id="fname"
              onChange={(e) =>
                typeof formChangeHandler === 'function' &&
                formChangeHandler(e)
              }
              className="w-1/2 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
            />
            <input
              value={formData?.lname ?? ''}
              required
              placeholder="Last Name"
              type="text"
              name="lname"
              id="lname"
              onChange={(e) =>
                typeof formChangeHandler === 'function' &&
                formChangeHandler(e)
              }
              className="w-1/2 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
        )}

        <div>
          <input
            value={formData?.email ?? ''}
            required
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            onChange={(e) =>
              typeof formChangeHandler === 'function' && formChangeHandler(e)
            }
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <input
            value={formData?.password ?? ''}
            required
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              typeof formChangeHandler === 'function' && formChangeHandler(e)
            }
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}

}