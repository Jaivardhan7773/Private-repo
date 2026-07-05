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
import UserProfile from "./components/UserProfile";
import Totalblogs from "./components/Totalblogs";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";
import CommentaryViewer from "./sports/CommentaryViewer";
import AboutUs from "./components/AboutUs";
import PageNotFound from "./components/PageNotFound";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import ContactUs from "./components/ContactUs";
import Addlyrics from "./Lyrics/Addlyrics";
import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Layout from "./admin/Layout";
import SongLyrics from "./Lyrics/SongLyrics";
import { useAuthStore } from "./store/useAuthStore";
import Embeded from "./animations/Embeded.jsx/Embeded";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import "./theme/theme.css";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  const { checkAuth, authUser, isChechingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);




  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbarog />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />


          <Route path="/login"
            element={authUser ? <Home /> : <Login />
            }
          />

          <Route
            path="/signup"
            element={authUser ? <Home /> : <Signup />
            }
          />
          <Route
            path="/admin/manage-users"
            element={<ProtectedRoute requireAdmin><Layout /></ProtectedRoute>}
          />

          <Route
            path="/user/myblogs"
            element={<ProtectedRoute requireEditor><Myblogs /></ProtectedRoute>}
          />

          <Route
            path="/blog/:slug"
            element={<BlogDetails />
            }
          />
          <Route path="/Userprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/totalblogs" element={<Totalblogs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/video" element={<SongLyrics />} />
          <Route path="/soon" element={<ComingSoon />} />
          <Route path="/Addlyrics" element={<Addlyrics />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/sports" element={<CommentaryViewer />} />
          <Route path="/embedd" element={<Embeded />} />


        </Routes>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

