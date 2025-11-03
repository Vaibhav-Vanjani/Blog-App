import {createContext, useContext, useState } from "react";
import { Client, Account,TablesDB,ID,Storage, Permission, Role } from 'appwrite';

console.log(import.meta.env.VITE_ENDPOINT,"REACT_APP_ENDPOINT");

export const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_ENDPOINT ?? "")
    .setProject(import.meta.env.VITE_PROJECT_ID ?? ""); 

export const account = new Account(client);
export { ID } from 'appwrite';

const tablesDB = new TablesDB(client);
const storage = new Storage(client);


type AppwriteFns = {
    loading?:boolean,
    loggedinUser?: (UserData | null),
    setLoading?: (params:boolean)=>void,
    setLoggedInUser?:(params:UserData | null)=>void,
    Signup?:(params:SignupData)=>void,
    Login?:(params:LoginData)=>void,
    Logout?:()=>void,
    uploadFileToStorage?:(param1:string,param2:string)=>(Promise<string | undefined>)
    InsertBlogInDB?:(params:BlogData)=>void
    getTableRows?:(p:string)=>void
    blogList?:BlogListData[],
    setBlogList?:(p:BlogListData[])=>void,
}

type SignupData = {
    userId:string,
    name:string,
    email:string,
    password:string,
}

type LoginData = Pick<SignupData,'email' | 'password'>;

type UserData = {
    userId:string,
    name:string,
    email:string,
    Bio?:string,
}

type BlogData = {
    img_url:string,
    title:string,
    description:string,
    blogID:string,
    userID:string,
}

type BlogListData = {
    blogID?:string
    description?:string
    img_url?:string
    title?:string
    userID?:string
}

export const AppwriteContext = createContext<AppwriteFns>({});

export const useAppwrite = ()=>useContext(AppwriteContext);

export default function AppwriteContextProvider({children}:any){
    const [loading,setLoading] = useState<boolean>(false);
    const [loggedinUser,setLoggedInUser] = useState<UserData | null>(null);
    const [blogList,setBlogList] = useState<BlogListData[]>([]);

    async function getTableRows(tableID:string) {
        const result = await tablesDB.listRows({
            databaseId: import.meta.env.VITE_DATABASE_ID ?? "",
            tableId: tableID,
        });

        if(result?.rows){
            console.log(result?.rows,"getTableRows");
            let arr:BlogListData[]=[];
            for(let blog of result.rows){
                arr.push({blogID:blog.blogID,
                        description:blog.description,
                        img_url:blog.img_url,
                        title:blog.title,
                        userID:blog.userID,
                })
            }
            setBlogList([...arr]);
        }
        else
        setBlogList([]);
    }

    async function uploadFileToStorage(fileID:string,file:any) {
        try {
             const result = await storage.createFile({
                bucketId: import.meta.env.VITE_BUCKET_ID ?? "",
                fileId: fileID,
                file: file,
                permissions: [Permission.read(Role.any())]
            });

            console.log(result,"uploadFileToStorage");

             const getFile = storage.getFilePreview({
                bucketId: import.meta.env.VITE_BUCKET_ID ?? "",
                fileId: fileID,
            });
            
            console.log(getFile,"getFile");
            const img_url = getFile+"&mode=admin";

            return img_url;
        } catch (error) {
            console.log(error,"uploadFileToStorage");
            return undefined;
        }
       
    }

    async function InsertBlogInDB(params:BlogData) {
        try {
             const createUserInDB =  await tablesDB.createRow({
                databaseId: import.meta.env.VITE_DATABASE_ID ?? "",
                tableId: 'blog',
                rowId: ID.unique(),
                data: { 
                        img_url:params.img_url,
                        title:params.title,
                        description:params.description,
                        blogID:params.blogID,
                        userID:params.userID,
                    }
            });  
            console.log(createUserInDB,"createUserInDb");
        } catch (error) {
            console.log(error,"inside InsertBlogInDB fn catch");
        }
        
    }

    async function Signup({userId,name,email,password}:SignupData){
        console.log("signup",userId,name,email,password);
     try{
      const createUser = await account.create({
        userId,
        name,
        email,
        password
      })

      console.log(createUser,"createUser");

      const createUserInDB =  await tablesDB.createRow({
        databaseId: import.meta.env.VITE_DATABASE_ID ?? "",
        tableId: 'user',
        rowId: ID.unique(),
        data: {name:name,email:email,userID:userId}
    });

    console.log(createUserInDB,"createUserInDB");

      await Login({email,password});
     }
     catch(err){
        console.log(err,"Signup Fn Catch");
     }

    }

    async function Login({email,password}:LoginData) {
        try {
            const loginUser = await account.createEmailPasswordSession({
                email,
                password
            })

            console.log(loginUser,"loginUser");

            const {name:userName,email:userEmail} = await account.get();

            setLoggedInUser({name:userName,email:userEmail,userId:userEmail});
        } catch (error) {
            console.log(error,"Login Fn Catch");
        }
    }

    async function Logout() {
        try {
            await account.deleteSession({sessionId:'current'});
            setLoggedInUser(null);
        } catch (error) {
            console.log(error,"Logout Fn catch");
        }
    }

    const value = {
        loading,setLoading,
        loggedinUser,setLoggedInUser,
        Signup,Login,Logout,
        uploadFileToStorage,
        InsertBlogInDB,
        getTableRows,
        blogList,setBlogList
    }

    return (<AppwriteContext.Provider value={value}>
        {children}
    </AppwriteContext.Provider>)
}