import BackButton from "../components/BackButton";
import { useAppwrite } from "../context/AppwriteContext";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useEffect, useState } from "react";

type CommentData = {
    userID?:string
    blogID?:string,
    description?:string,
}

export default function BlogView(){

    const params = useParams();
    const {blogList,commentList,InsertCommentInDB,loggedinUser,getTableRows,InsertLikeInDB,likeList} = useAppwrite();
    const blog  = blogList?.filter((item)=>item.blogID === params.blogID);
    const alreadyLiked = likeList?.filter((item)=>item.blogID === params.blogID && item.userID === loggedinUser?.userId);
    const blogComments = commentList?.filter((item)=>item.blogID === params.blogID);
    const [commentFormData,setCommentFormData] = useState<CommentData>({userID:loggedinUser?.userId,blogID:params?.blogID,description:""});
    const [refresh,setRefresh] = useState(true);
  
    useEffect(()=>{
        try {
            if(typeof getTableRows === 'function'){
                getTableRows('comment');
                getTableRows('blog');
                getTableRows('like');
            }
        } catch (error) {
             console.log("catch fn in useEffect ");
        }
    },[])

    function commentFormHandler(e:any){
        const {name,value} = e.target;
        setCommentFormData(prev=>({...prev,[name]:value}));
    }

    function commentFormSubmitHandler(e:any){
        e.preventDefault();
        try {
            if(typeof InsertCommentInDB === 'function' && loggedinUser){
                 InsertCommentInDB(commentFormData); 
                 setCommentFormData(prev=>({...prev,userID:loggedinUser?.userId,blogID:params?.blogID,description:""}));
                 typeof getTableRows === 'function' && getTableRows('comment');
                 setRefresh(refresh=>!refresh);
             }
             else{
                alert("Please login");
             }
        } catch (error) {
            console.log("catch fn commentFormSubmitHandler");
        }
    }


    function likeBlogHandler(){
        try {
            if(!loggedinUser){
                alert("Please Login/Signup");
            }
            else{
                if(!alreadyLiked?.length)
                {
                    typeof InsertLikeInDB === 'function' && InsertLikeInDB({userID:loggedinUser.userId,blogID:params?.blogID});
                    typeof getTableRows === 'function' && getTableRows('like');
                    setRefresh(refresh=>!refresh);
                }
            }
        } catch (error) {
            console.log("catch fn likeBlogHandler",error);
        }
    }
    

    if(!blog?.length){
        return <>
            <NotFound/>
        </>
    }

    return <>
         <BackButton/>
        <div>
            <span>Created By:{blog[0].userID}</span>
            <span>Created At:</span>
        </div>
        <div onClick={likeBlogHandler}>{alreadyLiked?.length ? "Red heart" : "white heart"}</div>
         <img src={blog[0].img_url} alt={blog[0].title} width={"100%"} height={"200px"} />
        <div>{blog[0].title}</div>
        <div>{blog[0].description}</div>
        <div>
            <form>
                <textarea name="description" value={commentFormData.description} placeholder="Enter comments ..." onChange={commentFormHandler}></textarea>
                <button onClick={commentFormSubmitHandler}>Submit</button>
            </form>
        </div>
        
        {
            blogComments?.map((comment)=>{
                return <>
                    <div>BY: {comment.userID?.replace('_','@')}</div>
                    <div>{comment.description}</div>
                </>
            })
        }
    </>
}