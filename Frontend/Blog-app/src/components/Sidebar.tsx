import { useNavigate } from "react-router-dom"

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
    return (<> 
                {
                    button_list.map((button)=>{
                       return <span onClick={()=>navigate(button.routeTo)}  
                              key={button.id}>
                            
                            {button.title}

                        </span>
                    })
                }
        </>)
}