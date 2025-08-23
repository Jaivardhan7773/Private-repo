import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allblogs from './Allblogs';
import Carousel from './carousel';
import Footer from './footer';
import AdSenseAd from './AdSenseAd';
import AutoAds from './AutoAds';
import { NavLink  ,useNavigate} from "react-router-dom";
const Home = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

const handleChange = (e) => {
setFormData({
    ...formData ,
    [e.target.name] : e.target.value,
});
};
const handleSubmit = async (e) => {
e.preventDefault();


const token = localStorage.getItem("Token");
if (!token) {
console.log("No token found!");
toast.error("Login first to send query");
return;
}

setLoading(true);
try{
    await axios.post(`${import.meta.env.VITE_API_URL}/addQuery` , formData);
    setFormData({ name: "", email: "", description: "" });
    toast.success("youe message has been sent successfully ")
}
catch(error){
    alert("Failed to send message. Please try again.");
}
setLoading(false);
}

  return (
    <>
  
    <Carousel/>
    <AdSenseAd />
    <Allblogs/>
    <AutoAds/>

<div className="bg-light">
  <div className="formbackground">
  <form className="formofhome" onSubmit={handleSubmit}>



  <div className="text-center text-light">
  <h1>Get in Touch with Us</h1>
  <p className="text-center">Share Your Thoughts About Hip Hop Scene and Get in Touch For Upcoming Hip Hop Parties.</p>
 </div>


            <div className="mb-3 w-100">
              <label className="form-label text-light">Your First Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your first name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Your Email Address*</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Your Message*</label>
              <textarea
                className="form-control"
                placeholder="Type your message here"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-50 rounded-pill">
            {loading ? "Sending..." : "Submit Your Message"}
            </button>
          </form>


</div>
    <div className="container py-5">
        <div className="row g-4">
            <div className="col-md-6">
                <div className="card homecards">
                    <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=861,h=716,fit=crop/mk3qxGrDvKI1EJnM/desi-hip-hop-t-shirt-collection-by-grill-g-YNqP2BVrQ3HXyNbW.png"  className="homeimages" alt="Merchandise"/>
                    <div className="card-img-overlay">
                        <h4 className="fw-bold">Merchandise</h4>
                        <p>Shop the latest hip hop clothing and accessories.</p>
                        <button className="btn btn-outline-light w-50 rounded-pill" onClick={() => navigate("/soon")}>Shop</button>
                        
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card homecards">
                    <img src="https://images.unsplash.com/photo-1546528377-65924be33e1e?auto=format&fit=crop&w=861&h=716" className="homeimages" alt="Lyrics"/>
                    <div className="card-img-overlay">
                        <h4 className="fw-bold">Lyrics</h4>
                        <p>Explore and submit your favorite hip hop lyrics.</p>
                        <NavLink to="/vedio">
  <button className="btn btn-outline-light w-50 rounded-pill">View</button>
</NavLink>

                    </div>
                </div>
            </div>
        </div>
    </div>

{/* 
    <div className="container mt-5 ">
  <div className="row align-items-center py-5">
 
    <div className="col-md-5">
      <h2 className="fw-bold">Gallery</h2>
      <p className="text-muted">
        Explore the vibrant world of desi hip-hop culture here.
      </p>
    </div>

   
    <div className="col-md-7">
      <div className="d-flex flex-wrap gap-3">
        <img src="https://images.unsplash.com/photo-1701403320634-89390f3f417f?auto=format&fit=crop&w=656&h=932" className="rounded-4" width="250" height="250" />
        <img src="https://images.unsplash.com/photo-1702533508365-4e6e6dfda162?auto=format&fit=crop&w=656&h=459" className="rounded-4" width="250" height="250" />
        <img src="https://images.unsplash.com/photo-1702355605400-2576c5942e9e?auto=format&fit=crop&w=656&h=459" className="rounded-4" width="250" height="250" />
        <img src="https://images.unsplash.com/photo-1702355605400-2576c5942e9e?auto=format&fit=crop&w=656&h=459" className="rounded-4" width="250" height="250" />
      </div>
    </div>
  </div>
</div> */}

    </div>
    <Footer/>


    </>
  );
};

export default Home;
