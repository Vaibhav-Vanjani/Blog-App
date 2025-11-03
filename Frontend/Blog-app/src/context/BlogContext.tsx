import { createContext, useContext, useState } from "react";

type formData = {
    fname?:string,
    lname?:string,
    email?:string,
    password?:string,
}

type SignupData = {
    userId:string,
    name:string,
    email:string,
    password:string,
}

type LoginData = Pick<SignupData,'email' | 'password'>;

type blogContextData  = {
    showSignupForm?:boolean,
    showLoginForm?:boolean,
    setShowSignupForm?:(params:boolean)=>void,
    setShowLoginForm?:(params:boolean)=>void,
    formData?:formData,
    setFormData?:(params:formData)=>void,
    formChangeHandler?:(params:any)=>void,
    submitUserFormHandler?:(param1:any,param2:(params:SignupData)=>void,param3:(params:LoginData)=>void)=>void,

}

export const BlogContext = createContext<blogContextData>({});

export const useBlog = ()=>useContext(BlogContext);

export default function BlogContextProvider({children}:any){
    const [showSignupForm,setShowSignupForm] = useState(false);
    const [showLoginForm,setShowLoginForm] = useState(false);
    const [formData,setFormData] = useState<formData>({});

    function formChangeHandler(event:any){
        const {name,value} = event.target;
        setFormData(prev=>({...prev,[name]:value}));
    }

    function submitUserFormHandler(e:any,Signup:(params:SignupData)=>void,Login:(params:LoginData)=>void){
        e.preventDefault();
        console.log(formData);

        if(showSignupForm)
        typeof Signup==='function' && Signup({userId:formData.email!,name:formData.fname! + " " + formData.lname!,email:formData.email!,password:formData.password!});
        
        if(showLoginForm)
        typeof Login==='function' && Login({email:formData.email!,password:formData.password!});
       
        setFormData(prev=>{
            const newPrev = {};
            return newPrev;
        });
    }
    
    const value = {
        showSignupForm,setShowSignupForm,
        showLoginForm,setShowLoginForm,
        formData,setFormData,
        formChangeHandler,
        submitUserFormHandler,
    }

    return <BlogContext.Provider value={value}>
        {children}
    </BlogContext.Provider>
}