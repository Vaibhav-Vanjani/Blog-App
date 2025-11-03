import BackButton from "../components/BackButton";
import { useAppwrite } from "../context/AppwriteContext";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

export default function BlogView(){

    const params = useParams();
    const {blogList} = useAppwrite();
    const blog  = blogList?.filter((item)=>item.blogID === params.blogID);

    if(!blog){
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
        <div>heart Img</div>
         <img src={blog[0].img_url} alt={blog[0].title} width={"100%"} height={"200px"} />
        <div>{blog[0].title}</div>
        <div>{blog[0].description}</div>
        <div>
            <textarea placeholder="Enter comments ..."></textarea>
        </div>
        <button>Submit</button>
    </>
}