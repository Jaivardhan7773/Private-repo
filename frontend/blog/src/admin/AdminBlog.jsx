import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAdminStore } from "../store/admin/useAdminStore";
const AdminBlog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const navigate = useNavigate();
    const {adminBlogs , blogs ,handleDeleteblog} = useAdminStore()

    useEffect(() => {
        if(blogs.length ===0 ){
            adminBlogs();
        }
    }, [adminBlogs  , blogs.length]);




    const filteredBlogs = blogs.filter(blog =>
        (`${blog.title} ${blog.description} ${blog.tags.join(" ")} ${blog.author}`
            .toLowerCase().includes(searchTerm.toLowerCase())) &&
        (categoryFilter === "" || blog.category === categoryFilter)
    );

    return (
        <>
            <Container className="mt-4">
                <h2 className="text-center mb-4 text-light">All Blogs</h2>
                <div className="d-flex justify-content-between mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="me-3"
                    />
                    <Form.Select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-auto"
                    >
                        <option value="">All Categories</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                    </Form.Select>
                </div>
                <Row>
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => (
                            <Col md={4} key={blog._id} className="mb-4">
                                <Card>
                                    <Card.Img variant="top" src={blog.image} alt={blog.title} style={{ height: "200px", objectFit: "cover" }} />
                                    <Card.Body>
                                        <Card.Text>{blog.tags.join(" · ")}</Card.Text>
                                        <Card.Title>{blog.title}</Card.Title>
                                        <Card.Text>{blog.introduction?.substring(0, 100) || ""}...</Card.Text>
                                        <Card.Text className="d-flex justify-content-between">
                                            <span className="fw-bold">{blog.author}</span>
                                            <span>{blog.category}</span>
                                        </Card.Text>
                                        <Card.Text>{new Date(blog.createdAt).toISOString().split("T")[0]}</Card.Text>
                                        <Button variant="primary" onClick={() => navigate(`/blog/${blog.slug}`)} className="w-100">
                                            Read Now
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteblog(blog._id)} className="w-100 my-1">Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Row className="mt-3">
                                  {[1, 2, 3 , 4 , 5 ,6].map((_, idx) => (
                                    <Col md={4} sm={6} xs={12} key={idx} className="mb-4">
                                      <Card className="h-100 shadow-sm">
                                        <Skeleton height={200} />
                                        <Card.Body>
                                          <Skeleton height={15} width={`60%`} highlightColor="#444" className="mb-2" />
                                          <Skeleton height={20} width={`80%`} highlightColor="#444" className="mb-2" />
                                          <Skeleton count={3} />
                                          <Skeleton height={30} width={`100%`} highlightColor="#444" className="my-2" />
                                          <Skeleton height={30} width={`100%`} highlightColor="#444"/>
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                  ))}
                                </Row>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default AdminBlog;
