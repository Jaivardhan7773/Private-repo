import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Navbarog from "./components/Navbar";
import Home from "./components/Home";
import ComingSoon from "./components/ComingSoon";
import Myblogs from "./components/Myblogs";
import BlogDetails from "./components/BlogDetails";
import { ToastContainer } from "react-toastify";
import UserProfile from "./components/UserProfile";
import Totalblogs from "./components/Totalblogs";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";
import CommentaryViewer from "./sports/CommentaryViewer";
import AboutUs from "./components/AboutUs";
import PageNotFound from "./components/PageNotFound";
import Addlyrics from "./Lyrics/Addlyrics";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./store/authentication";
import { useContext , useState , useEffect } from "react";
import { isAuthenticated, isAdmin, isEditor } from "./utills/auth";
import Layout from "./admin/Layout";
import SongLyrics from "./Lyrics/SongLyrics";
function App() {
  let { Token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  // if (isLoading) {
  //   return <SplashScreen />;
  // }
  return (
    <>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <Navbarog />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/login"
          element={Token ? <Home/> : <Login />
          }
        />

        <Route
          path="/signup"
          element={Token ? <Home /> : <Signup />
          }
        />
        <Route
          path="/admin/manage-users"
          element={isAuthenticated() && isAdmin() ? <Layout /> : <PageNotFound />}
        />

<Route
          path="/user/myblogs"
          element={isAuthenticated() && isEditor() ? <Myblogs/> : <Navigate to="/login" />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetails/>}
        />
        <Route path="/Userprofile" element={Token?<UserProfile/>:<Login/>} />
        <Route path="/totalblogs" element={<Totalblogs />} />
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/vedio" element={<SongLyrics/>}/>
         <Route path="/soon" element={<ComingSoon/>}/>
         <Route path="/Addlyrics" element={<Addlyrics/>}/>
         <Route path="*" element={<PageNotFound />} />
         <Route path="/sports" element={<CommentaryViewer />} />

   
      </Routes>
    </>
  );
}

export default App;
