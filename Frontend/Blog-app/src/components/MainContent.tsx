import { useEffect } from "react";
import { useAppwrite } from "../context/AppwriteContext";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

export default function MainContent(){

     const navigate = useNavigate();
     const {getTableRows,blogList} = useAppwrite();
     const {showSideBar} = useBlog();
        useEffect(()=>{
            console.log("i am runing");
                typeof getTableRows === 'function' && getTableRows('blog');
        },[])

return (
  <>
    <div className={`grid gap-6 sm:grid-cols-2 grid-rows-2 lg:grid-cols-3 p-4 ${showSideBar ? "" : ""} `}>
      {blogList?.map((blog, index) => (
        <div
          key={index + (blog.userID ?? "")}
          onClick={() => navigate(`/blog/${blog.blogID}`)}
          className="
            group 
            cursor-pointer 
            bg-white dark:bg-gray-900 
            border border-gray-200 dark:border-gray-700 
            rounded-xl 
            shadow-sm hover:shadow-md 
            transition-all 
            duration-300 
            overflow-hidden 
            hover:-translate-y-1
          "
        >
          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={blog.img_url}
              alt={blog.title}
              className="
                w-full h-48 object-cover 
                group-hover:scale-105 
                transition-transform 
                duration-300
              "
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {blog.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
              <span className="italic">By {blog.userID}</span>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  ❤️ <span>Like</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  💬 <span>Comment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
);

}