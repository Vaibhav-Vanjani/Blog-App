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

  return (
  <>
    <BackButton />

    <div className="w-full sm:flex flex-col flex-wrap items-center justify-center">
    <div className="w-full sm:w-2/3">
    <div className="px-4 text-gray-600 dark:text-gray-300 flex flex-col space-y-1">
      <span className="text-sm">Created By: <span className="font-semibold text-gray-800 dark:text-gray-100">{blog[0].userID}</span></span>
      <span className="text-sm">Created At: <span className="font-semibold text-gray-800 dark:text-gray-100">{""}</span></span>
    </div>

    <div
      onClick={likeBlogHandler}
      className="relative"
    >
      {alreadyLiked?.length ? (
        <span className="text-red-600 border rounded  bg-gray-500/50 text-2xl cursor-pointer w-max p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors absolute right-2">❤️</span>
      ) : (
        <span className="text-gray-400 border rounded bg-gray-500/50 text-2xl cursor-pointer w-max p-2 rounded-full hover:bg-gray-500/60 dark:hover:bg-gray-500/60 transition-colors absolute right-2">🤍</span>
      )}
    </div>

    <img
      src={blog[0].img_url}
      alt={blog[0].title}
      className="w-full h-52 md:h-64 object-cover rounded-lg shadow-md mb-2 p-4"
    />

    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 px-4">
      {blog[0].title}
    </div>

    <div className="text-gray-700 dark:text-gray-300 mb-4 px-4">
      {blog[0].description}
    </div>

    <div className="mb-1 p-4">
      <form className="flex flex-col space-y-2">
        <textarea
          name="description"
          value={commentFormData.description}
          placeholder="Enter comments ..."
          onChange={commentFormHandler}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 resize-none"
        ></textarea>
        <div className="flex w-full justify-end mt-2">
            <button
            onClick={commentFormSubmitHandler}
            className="flex m-0 w-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
            Submit
            </button>
        </div>
      </form>
    </div>

    <div className="space-y-4 p-4">
      {blogComments?.map((comment, index) => (
        <div key={index} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">BY: {comment.userID?.replace("_", "@")}</div>
          <div className="text-gray-700 dark:text-gray-300 mt-1">{comment.description}</div>
        </div>
      ))}
    </div>
    </div>
    </div>
  </>
);

}