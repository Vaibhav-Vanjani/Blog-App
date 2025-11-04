import { useEffect } from "react";
import { useAppwrite } from "../context/AppwriteContext";
import { useBlog } from "../context/BlogContext";
import Form from "./Form";
import { account } from "../context/AppwriteContext";

export default function Navbar() {
      const {loading,setLoading,loggedinUser,setLoggedInUser,Logout} = useAppwrite();
      const {setShowLoginForm,setShowSignupForm} = useBlog();

      useEffect(()=>{
        async function checkIfUserAlreadyLoggedIn(){
           typeof setLoading==='function' && setLoading(true);
            try {
                const user = await account.get();
                if(user){
                     typeof setLoggedInUser==='function' && setLoggedInUser({userId:user.email?.replace('@',"_"),name:user.name,email:user.email});
                }
                console.log("user present",user);
                typeof setLoading==='function' && setLoading(false);
            } catch (error) {
                typeof setLoggedInUser==='function' && setLoggedInUser(null);
                 console.log("user NOT present");
                typeof setLoading==='function' && setLoading(false);
            }  
        }
        checkIfUserAlreadyLoggedIn();
       
      },[])
      
    return <>
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
  {/* Left Section */}
  <ul className="flex items-center space-x-4 text-gray-800 font-semibold text-lg">
    <li className="flex items-center space-x-2">
      <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
      <span className="text-xl font-bold text-gray-900">_Medium</span>
    </li>
  </ul>

  {/* Right Section */}
  {!loggedinUser ? (
    <ul className="flex items-center space-x-6">
      <li
        onClick={() => {
          typeof setShowLoginForm === 'function' && setShowLoginForm(false);
          typeof setShowSignupForm === 'function' && setShowSignupForm(true);
        }}
        className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
      >
        Signup
      </li>

      <li
        onClick={() => {
          typeof setShowSignupForm === 'function' && setShowSignupForm(false);
          typeof setShowLoginForm === 'function' && setShowLoginForm(true);
        }}
        className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Login
      </li>
    </ul>
  ) : (
    <ul className="flex items-center space-x-6">
      <li
        onClick={() => {}}
        className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
      >
        Profile
      </li>
      <li
        onClick={() => {
          typeof Logout === 'function' && Logout();
        }}
        className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Logout
      </li>
    </ul>
  )}

  {/* Loading Indicator */}
  {loading && <span className="text-sm text-gray-500 ml-4 animate-pulse">Loading...</span>}
</nav>

        <Form></Form>
    </>
}