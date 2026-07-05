import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Modal, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEditorStore } from "../store/useEditorStore.js";
import Footer from './footer';
import { useAuthStore } from "../store/useAuthStore.js";
import { useToast } from "../context/ToastContext";
import { Edit2, Trash2, Plus, Save, X, Image as ImageIcon, Type, Tag, AlignLeft } from "lucide-react";

const Myblogs = () => {
  AOS.init();
  const { fetchmyblogs, myblogs, addblog, isloading, updateBlog, deleteBlog } = useEditorStore();
  const { authUser } = useAuthStore();
  const { addToast } = useToast();

  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    description: "",
    tags: "",
    author: authUser?.name || "",
    introduction: "",
    category: "",
  });

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchmyblogs();
  }, []);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addblog(blogData);
      addToast("Blog published successfully!", "success");
      setBlogData({
        title: "",
        image: "",
        description: "",
        tags: "",
        author: authUser?.name || "",
        category: "",
        introduction: "",
      });
      setShowCreateForm(false);
    } catch (error) {
      addToast("Failed to publish blog.", "error");
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(blogId);
      addToast("Blog deleted successfully.", "success");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateBlog(selectedBlog);
      setShowModal(false);
      addToast("Blog updated successfully!", "success");
    } catch (error) {
      addToast("Failed to update blog.", "error");
    }
  };

  return (
    <>
      <div className="min-vh-100 py-5" style={{ background: 'var(--bg-primary)' }}>
        <Container>

          {/* Header Section */}
          <div className="d-flex flex-column align-items-center mb-5">
            <h1 className="fw-bold mb-3 text-uppercase" style={{ fontFamily: 'var(--font-main)', letterSpacing: '-1px', color: 'var(--text-primary)' }}>
              OPERATIONAL <span style={{ color: 'var(--accent-primary)' }}>ARCHIVES</span>
            </h1>
            <p className="text-secondary font-monospace small mb-4">
                >> MANAGE YOUR INTELLIGENCE DATA
            </p>

            <button
              className={`btn d-flex align-items-center gap-2 px-4 py-2 ${showCreateForm ? 'btn-outline-danger' : 'btn-primary-glow'}`}
              onClick={() => setShowCreateForm(!showCreateForm)}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {showCreateForm ? <><X size={18} /> CANCEL PROTOCOL</> : <><Plus size={18} /> INITIATE NEW ENTRY</>}
            </button>
          </div>


          {/* Create Blog Form */}
          {showCreateForm && (
            <div className="glass-panel p-4 p-lg-5 mb-5 animate-slide-down border-accent">
              <h4 className="mb-4 d-flex align-items-center gap-2" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                <Edit2 size={20} /> NEW ENTRY FORM
              </h4>
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small font-monospace text-muted">TITLE IDENTIFIER</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text glass-input border-end-0 text-secondary"><Type size={18} /></span>
                        <Form.Control className="glass-input border-start-0 ps-0" type="text" name="title" value={blogData.title} onChange={handleChange} required placeholder="Enter blog title..." />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small font-monospace text-muted">CATEGORY CLASSIFICATION</Form.Label>
                      <Form.Select className="glass-input" name="category" value={blogData.category} onChange={handleChange} required>
                        <option value="" className="text-dark">Select Category</option>
                        <option value="Technology" className="text-dark">Technology</option>
                        <option value="Health" className="text-dark">Health</option>
                        <option value="Education" className="text-dark">Education</option>
                        <option value="Entertainment" className="text-dark">Entertainment</option>
                        <option value="Sports" className="text-dark">Sports</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="small font-monospace text-muted">VISUAL ASSET LINK</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0 text-secondary"><ImageIcon size={18} /></span>
                    <Form.Control className="glass-input border-start-0 ps-0" type="text" name="image" value={blogData.image} onChange={handleChange} required placeholder="https://..." />
                  </div>
                  <small className="text-muted d-block mt-1 font-monospace" style={{ fontSize: '0.75rem' }}>External Host: <a href="https://postimages.org/" target="_blank" rel="noreferrer" className="text-accent text-decoration-none">postimages.org</a></small>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small font-monospace text-muted">BRIEFING (SUMMARY)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="introduction"
                    value={blogData.introduction}
                    className="glass-input"
                    onChange={handleChange}
                    required
                    placeholder="Short summary of the content..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small font-monospace text-muted">MAIN DATABASE CONTENT</Form.Label>
                  <div style={{ borderRadius: '0px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <Editor
                      onEditorChange={(content) =>
                        setBlogData((prevData) => ({ ...prevData, description: content }))
                      }
                      value={blogData.description}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: ['link', 'image', 'lists', 'code'],
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
                        content_style: 'body { font-family:Montserrat,sans-serif; font-size:14px; background-color: #f0f2f5; color: #333; }',
                      }}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small font-monospace text-muted">TAGS</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text glass-input border-end-0 text-secondary"><Tag size={18} /></span>
                    <Form.Control className="glass-input border-start-0 ps-0" type="text" name="tags" placeholder="#tech #news" value={blogData.tags} onChange={handleChange} required />
                  </div>
                </Form.Group>

                <button type="submit" className="btn-primary-glow w-100 py-3 d-flex align-items-center justify-content-center gap-2" disabled={isloading}>
                  {isloading ? <><Spinner animation="border" size="sm" /> PROCESSING...</> : <><Save size={18} /> UPLOAD TO MAINFRAME</>}
                </button>
              </Form>
            </div>
          )}

          {/* List Display */}
          {isloading ? (
            <Row>
              {[1, 2, 3].map((_, idx) => (
                <Col md={4} key={idx} className="mb-4">
                  <div className="glass-panel p-0 h-100 overflow-hidden">
                    <Skeleton height={200} baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
                    <div className="p-3">
                      <Skeleton count={3} baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : myblogs?.length > 0 ? (
            <Row>
              {myblogs.map((blog) => (
                <Col md={4} sm={6} xs={12} key={blog._id} className="mb-4">
                  <div
                    className="glass-panel h-100 d-flex flex-column overflow-hidden card-hover-effect"
                    data-aos="fade-up"
                    style={{ border: '1px solid var(--border-color)' }}
                  >
                    <div
                      style={{
                        height: "200px",
                        backgroundImage: `url(${blog.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                        borderBottom: '1px solid var(--border-color)'
                      }}
                      onClick={() => navigate(`/blog/${blog.slug}`)}
                    >
                      <div className="h-100 w-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                    </div>

                    <div className="p-4 flex-grow-1 d-flex flex-column">
                      <div className="d-flex justify-content-between mb-3 align-items-center">
                        <span className="badge rounded-pill" style={{ background: 'rgba(255, 193, 7, 0.1)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}>
                          {blog.category}
                        </span>
                        <small className="text-secondary font-monospace" style={{ fontSize: '0.75rem' }}>{new Date(blog.createdAt).toLocaleDateString()}</small>
                      </div>
                      <h5
                        className="mb-3 fw-bold"
                        style={{ cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'var(--font-main)', letterSpacing: '0.5px' }}
                        onClick={() => navigate(`/blog/${blog.slug}`)}
                      >
                        {blog.title}
                      </h5>
                      <p className="text-secondary small mb-4 flex-grow-1" style={{ lineHeight: '1.6' }}>
                        {blog.introduction ? blog.introduction.substring(0, 100) : "No description"}...
                      </p>

                      <div className="d-flex gap-2 mt-auto pt-3 border-top border-secondary">
                        <button
                          className="btn btn-sm d-flex align-items-center justify-content-center gap-1 flex-grow-1"
                          style={{ border: '1px solid var(--text-secondary)', color: 'var(--text-secondary)', background: 'transparent' }}
                          onClick={() => { setSelectedBlog(blog); setShowModal(true); }}
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button
                          className="btn btn-sm d-flex align-items-center justify-content-center gap-1 flex-grow-1"
                          style={{ border: '1px solid #ef4444', color: '#ef4444', background: 'transparent' }}
                          onClick={() => handleDelete(blog._id)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5 glass-panel">
              <div className="mb-3 text-secondary opacity-50"><AlignLeft size={48} /></div>
              <h4 style={{ color: 'var(--text-primary)' }}>NO DATA ENTRIES FOUND.</h4>
              <p className="text-secondary">Initiate new entry to populate the archives.</p>
            </div>
          )}

          {/* Update Modal */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            contentClassName="glass-panel text-light border-0"
            centered
            size="lg"
          >
            <Modal.Header closeButton closeVariant="white" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <Modal.Title style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
                <Edit2 size={20} className="me-2" /> UPDATE ENTRY
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: 'var(--bg-secondary)' }}>
              {selectedBlog && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="small font-monospace text-muted">TITLE</Form.Label>
                    <Form.Control
                      className="glass-input"
                      type="text"
                      value={selectedBlog.title}
                      onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small font-monospace text-muted">IMAGE SOURCE</Form.Label>
                    <Form.Control
                      className="glass-input"
                      type="text"
                      value={selectedBlog.image}
                      onChange={(e) => setSelectedBlog({ ...selectedBlog, image: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small font-monospace text-muted">BRIEFING</Form.Label>
                    <Form.Control
                      as="textarea"
                      className="glass-input"
                      rows={3}
                      value={selectedBlog.introduction}
                      onChange={(e) => setSelectedBlog({ ...selectedBlog, introduction: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small font-monospace text-muted">CONTENT DATA</Form.Label>
                    <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <Editor
                        onEditorChange={(content) =>
                          setSelectedBlog((prevData) => ({ ...prevData, description: content }))
                        }
                        value={selectedBlog.description}
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: ['link', 'image', 'lists'],
                          toolbar: 'undo redo | bold italic | bullist numlist',
                          content_style: 'body { font-family:Montserrat,sans-serif; font-size:14px }',
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small font-monospace text-muted">CATEGORY</Form.Label>
                    <Form.Select
                      className="glass-input"
                      value={selectedBlog.category}
                      onChange={(e) => setSelectedBlog({ ...selectedBlog, category: e.target.value })}
                    >
                      <option value="Technology" className="text-dark">Technology</option>
                      <option value="Health" className="text-dark">Health</option>
                      <option value="Education" className="text-dark">Education</option>
                      <option value="Entertainment" className="text-dark">Entertainment</option>
                      <option value="Sports" className="text-dark">Sports</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)} style={{ borderRadius: 0 }}>CANCEL</Button>
              <Button className="btn-primary-glow" onClick={handleUpdate}>SAVE CHANGES</Button>
            </Modal.Footer>
          </Modal>

        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Myblogs;
