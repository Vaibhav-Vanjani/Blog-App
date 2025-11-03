import { useAppwrite } from "../context/AppwriteContext";
import BackButton from "../components/BackButton";

export default function Profile(){
    const {loggedinUser} = useAppwrite();
   
    return <>
       <BackButton/>
        <div>
            <input type="file"></input>
            <span>Edit</span>
        </div>

        <div>
            <input type="text" value={loggedinUser?.name ?? ""}></input>
        </div>

        <div>
            <textarea placeholder="Enter Bio"/>
        </div>

        <button>Submit</button>
    </>
}