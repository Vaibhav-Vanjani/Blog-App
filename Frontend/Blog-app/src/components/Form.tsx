import { useBlog } from "../context/BlogContext";
import {useAppwrite} from '../context/AppwriteContext'

export default function Form(){
      const {Signup,Login} = useAppwrite();
    
    const {showLoginForm,showSignupForm,
        setShowLoginForm,setShowSignupForm,
        submitUserFormHandler,formChangeHandler,setFormData,formData} = useBlog();
    
// console.log("inside Form component",formData);

    if(showSignupForm || showLoginForm){
        return <>
            <span className="cursor-pointer"
            onClick={()=>{typeof setShowSignupForm==='function' && setShowSignupForm(false);
                    typeof setShowLoginForm==='function' && setShowLoginForm(false);}}>X</span>
            <form 
                className="cursor-pointer" 
                onSubmit={(e)=> {
                    typeof setShowSignupForm==='function' && setShowSignupForm(false);
                    typeof setShowLoginForm==='function' && setShowLoginForm(false);
                    typeof submitUserFormHandler==='function' && submitUserFormHandler(e,Signup!,Login!)}}>
                    {!showLoginForm 
                        &&
                    <>
                        <div>
                            <input value={formData?.fname ?? ""} required placeholder="First Name" type="text" name="fname" id="fname" onChange={(e)=>{typeof formChangeHandler ==='function' && formChangeHandler(e)}}></input>
                            <input value={formData?.lname ?? ""} required placeholder="Last Name"type="text" name="lname" id="lname" onChange={(e)=>{typeof formChangeHandler ==='function' && formChangeHandler(e)}}></input>
                        </div>
                    </>
                    }               
                    <div>
                        <input value={formData?.email ?? ""} required placeholder="Email" type="email" name="email" id="email" onChange={(e)=>{typeof formChangeHandler ==='function' && formChangeHandler(e)}}/>
                    </div>
                    <div>
                        <input value={formData?.password ?? ""} required placeholder="Password" type="password" name="password" id="password" onChange={(e)=>{typeof formChangeHandler ==='function' && formChangeHandler(e)}} />
                    </div>
                <button type="submit">Submit</button>
            </form>
        </>
    }
}