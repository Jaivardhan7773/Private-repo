import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Adminquery from "./adminquery";
import Admincarousel from "./admincarousel";
import AdminBlog from "./AdminBlog";
import EditorRequest from "./EditorRequest";
import Admin from "./Admin";
import "./MayurDiCss.css";
import Navbar from 'react-bootstrap/Navbar';
import Addlyrics from "../Lyrics/Addlyrics";

function Sidebar() {
  const [show, setShow] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<Admin />); // Default component
  const [isHovered, setIsHovered] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex">

<div >
  
<Button
        className="ps-4 bg-transparent border-0"
        onClick={handleShow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: "fixed" , zIndex:"3" ,  }}
      >
        <img
          src={isHovered ?
            'https://cdn-icons-png.flaticon.com/128/8166/8166558.png' :
            'https://img.icons8.com/?size=96&id=6uJdcB0tVRwZ&format=png'}
          alt='menu'
          style={{ maxHeight: '50px', maxWidth: '50px' , transition: "all 0.3s ease-in-out", }}
        />
      </Button>
</div>


<Offcanvas 
  show={show} 
  onHide={handleClose} 
  placement="start" 
  style={{ maxWidth: "280px", background: "#1e1e2f", color: "#fff" }}
>
  <Offcanvas.Header closeButton closeVariant="white">
    <Offcanvas.Title className="mx-auto">
      <Navbar.Brand
        href="#"
        style={{
          fontFamily: "'Tektur', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.2rem, 2vw, 2rem)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#fff"
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/8149/8149827.png"
          style={{ maxHeight: "35px" }}
          alt="aizenx by jaivardhan"
        />
        <span>izen</span>
        <img
          src="https://cdn-icons-png.flaticon.com/128/16083/16083469.png"
          style={{ maxHeight: "35px" }}
          alt="aizenx by jaivardhan"
        />
      </Navbar.Brand>
    </Offcanvas.Title>
  </Offcanvas.Header>

  <Offcanvas.Body className="px-3">
    <nav>
      <ul className="list-unstyled d-flex flex-column gap-2">
        <li>
          <button 
            className="w-100 text-start px-3 py-2 rounded bg-transparent border-0 text-light fw-semibold sidebar-btn"
            onClick={() => setActiveComponent(<Admin />)}
          >
            👤 Manage Users
          </button>
        </li>
        <li>
          <button 
            className="w-100 text-start px-3 py-2 rounded bg-transparent border-0 text-light fw-semibold sidebar-btn"
            onClick={() => setActiveComponent(<Adminquery />)}
          >
            ❓ Admin Query
          </button>
        </li>
        <li>
          <button 
            className="w-100 text-start px-3 py-2 rounded bg-transparent border-0 text-light fw-semibold sidebar-btn"
            onClick={() => setActiveComponent(<Admincarousel />)}
          >
            🎠 Admin Carousel
          </button>
        </li>
        <li>
          <button 
            className="w-100 text-start px-3 py-2 rounded bg-transparent border-0 text-light fw-semibold sidebar-btn"
            onClick={() => setActiveComponent(<AdminBlog />)}
          >
            📝 Admin Blog
          </button>
        </li>
        {/* <li>
          <button 
            className="w-100 text-start px-3 py-2 rounded bg-transparent border-0 text-light fw-semibold sidebar-btn"
            onClick={() => setActiveComponent(<EditorRequest />)}
          >
            ✍️ Editor Request
          </button>
        </li> */}
        <li>
          <button 
            className="w-100 text-start px-3 py-2 rounded bg-transparent border-0 text-light fw-semibold sidebar-btn"
            onClick={() => setActiveComponent(<Addlyrics />)}
          >
            🎵 Manage Songs
          </button>
        </li>
      </ul>
    </nav>
  </Offcanvas.Body>
</Offcanvas>


     
      <div className="content-area flex-grow-1 ">{activeComponent}</div>
    </div>
  );
}

export default Sidebar;
