import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import BlogView from "./pages/BlogView";

function App() {
  console.log("inside app");
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Outlet/>}>
          <Route index element={<Home/>}></Route>
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/create-blog" element={<CreateBlog/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
        <Route path="/blog/:blogID" element={<BlogView/>}></Route>
      </Routes>
    </>
  )
}

export default App
