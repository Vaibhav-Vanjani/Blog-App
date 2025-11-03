import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useAppwrite } from "../context/AppwriteContext";
import { useEffect, useState } from "react";


type BblogFormData = {
    file?:string,
    fileID?:string,
    title?:string,
    description?:string,
    img_url?:string,
    userID?:string,
    blogID?:string,
}

export default function CreateBlog(){

    const {loggedinUser,uploadFileToStorage,InsertBlogInDB} = useAppwrite();
    const navigate = useNavigate();
    const [blogFormData,setBlogFormData] = useState<BblogFormData>({});

    console.log("loggedinUser",loggedinUser);

    useEffect(()=>{
         if(!loggedinUser){
            console.log("User not logged IN; currently in Create Blog:::");
            navigate('/');
          }
    },[loggedinUser])

    if(!loggedinUser){
        return <>Loading...</>
    }

    function createBlogFormHandler(e:any){
        let {name,type,value} = e.target;
        if(type === 'file'){
            const file = e.target.files[0];
            const fileID = Date.now().toString()+"_FILE";
            setBlogFormData(prev=>({...prev,"file":file,"fileID":fileID}));
            return ;
        }
        setBlogFormData(prev=>({...prev,[name]:value}));
    }

   async function createBlogSubmitHandler(e:any){
        e.preventDefault();
        console.log("createBlogSubmitHandler");
         let img_url:string | undefined ="";
        if(typeof uploadFileToStorage==='function') 
        {
            img_url = await uploadFileToStorage(blogFormData.fileID!,blogFormData.file!);
        }

        blogFormData.img_url = img_url ?? "";
        blogFormData.blogID = Date.now().toString() + "_BLOG";
        blogFormData.userID = loggedinUser?.userId;
        console.log(blogFormData);
        if(typeof InsertBlogInDB==='function') 
       { 
            InsertBlogInDB({
                    img_url: blogFormData.img_url,
                    blogID: blogFormData.blogID,
                    userID: blogFormData.userID!,
                    title: blogFormData.title!,
                    description: blogFormData.description!
                });
        }
    }


    return <>
                <BackButton/>
                <form>
                    <div>
                        <input required name="file" type="file" onChange={createBlogFormHandler}></input>
                    </div>
                    <div>
                        <input required name="title" type="Title" placeholder="Title" onChange={createBlogFormHandler}></input>
                    </div>
                    <div>
                        <textarea required name="description" placeholder="Description" onChange={createBlogFormHandler}/>
                    </div>
                    <button onClick={createBlogSubmitHandler}>Submit</button>     
                </form>     
          </>
}