import { useNavigate } from "react-router-dom"
import { useBlog } from "../context/BlogContext";
import { useEffect } from "react";
import { useIsMobile } from "../CustomHook/UseMobile";

const button_list = [
{
    id:1,
    title:"Home",
    routeTo:"/",
},
{
    id:2,
    title:"Profile",
    routeTo:"/profile",
},
{
    id:3,
    title:"Create Blog",
    routeTo:"/create-blog",
}
]

export default function Sidebar(){
    const navigate = useNavigate();
    const {showSideBar,setShowSideBar} = useBlog();
    const isMobile = useIsMobile();

   return (
        <>
          <div
  className={`
    h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 shadow-sm
    transform transition-all duration-500 ease-in-out
    ${showSideBar 
        ? "flex flex-col space-y-2 opacity-100 scale-100 translate-x-0" 
        : "opacity-0 scale-95 -translate-x-full pointer-events-none hidden"
    }
    ${isMobile ? " hidden": ""}
  `}
> {button_list.map((button) => {
                return (
                <span
                    onClick={() => navigate(button.routeTo)}
                    key={button.id}
                    className="
                    cursor-pointer
                    px-4 py-2
                    text-sm font-medium
                    text-gray-700 dark:text-gray-200
                    hover:text-blue-600 dark:hover:text-blue-400
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    rounded-md
                    transition-all
                    duration-200
                    select-none
                    block
                    "
                >
                    {button.title}
                </span>
                );
            })}
            </div>
        </>
        );

}