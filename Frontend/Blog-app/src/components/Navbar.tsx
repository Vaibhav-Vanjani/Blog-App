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
                     typeof setLoggedInUser==='function' && setLoggedInUser({userId:user.email,name:user.name,email:user.email});
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
        <nav>
            <ul>
                <li>img</li>
                <li>_Medium</li>
            </ul>
            {!loggedinUser ? 
            <ul>
                <li onClick={()=>{
                        typeof setShowLoginForm==='function' && setShowLoginForm(false);
                        typeof setShowSignupForm==='function' && setShowSignupForm(true);
                }}>Signup</li>
                <li onClick={()=>{
                    typeof setShowSignupForm==='function' && setShowSignupForm(false);
                    typeof setShowLoginForm==='function' && setShowLoginForm(true);
                    // typeof Login==='function' && Login({email:"",password:""})
                }}>Login</li>
            </ul>
            :
             <ul>
                <li onClick={()=>{
                        
                }}>Profile</li>
                <li onClick={()=>{
                    typeof Logout==='function' && Logout();
                }}>Logout</li>
            </ul>
            }
        </nav>
        {loading && <span>Loading...</span>}
        <Form></Form>
    </>
}