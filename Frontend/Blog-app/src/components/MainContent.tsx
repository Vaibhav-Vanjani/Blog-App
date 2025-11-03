import { useEffect } from "react";
import { useAppwrite } from "../context/AppwriteContext";
import { useNavigate } from "react-router-dom";

export default function MainContent(){

     const navigate = useNavigate();
     const {getTableRows,blogList} = useAppwrite();
        useEffect(()=>{
            console.log("i am runing");
                typeof getTableRows === 'function' && getTableRows('blog');
        },[])

    return <>

        {
            blogList?.map((blog,index)=>{
                return <div
                        onClick={()=>navigate(`/blog/${blog.blogID}`)} 
                        key={index + (blog.userID ?? "")}>
                        <img src={blog.img_url} alt={blog.title} width={"200px"}/>
                        <div>{blog.title}</div>
                        <div>{blog.description}</div>
                        <div>
                            <span>created BY: {blog.userID}</span>
                            <div>
                                <span>Like</span>
                                <span>Comment</span>
                            </div>
                        </div>
                    </div>
            })
        }
        
    </>
}