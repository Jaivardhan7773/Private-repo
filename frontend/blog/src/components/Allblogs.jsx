import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



AOS.init();

const Allblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/allBlogs`);
      setBlogs(response.data);
      setIsLoading(false)
    } catch (error) {
      toast.error("Failed to fetch blogs.");
      console.error("Failed to fetch blogs!", error);
    }
  };



  return (
    <div className="bg-light">
      <Container className="mt-4 pt-5">
        <Row>
          {blogs.length === 0 ? (
            [...Array(4)].map((_, index) => (
              <Col lg={6} key={index} className="mb-4">
                <Card className="cardbg">
                  <Skeleton height={400} highlightColor="#444" />
                  <Card.Body>
                    <Skeleton height={20} width="60%" highlightColor="#444" />
                    <Skeleton height={15} count={3} highlightColor="#444" />
                    <Skeleton height={20} width="50%" highlightColor="#444" />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0 , 8).map((blog) => (

              <Col lg={6} key={blog._id} className="mb-4">
                <Card className="cardbg"  data-aos="zoom-in-up" onClick={() => {
                  navigate(`/blog/${blog._id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                  style={{
                    cursor: "pointer",
                  }}>
                  <Card.Img
                    variant="top"
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    style={{
                      maxHeight: "400px",
                      minHeight: "400px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Text>{blog.tags.join(" · ")}</Card.Text>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{blog.introduction?.substring(0, 300) || "No intro"}...</Card.Text>
                    <Card.Text className="d-flex justify-content-between wordbreak">
                      <span className="text-secondary fw-bold">{blog.author}</span>
                      <span className="wordbreak">{blog.category}</span>
                    </Card.Text>
                    <Card.Text>
                      {new Date(blog.createdAt).toISOString().split("T")[0]}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Allblogs;
