import React, { useEffect, useState } from "react";
import axiosInstance from "../utills/axios.js";
import { Button, Form, Container, Spinner, Row, Col, InputGroup } from "react-bootstrap";
import { useToast } from "../context/ToastContext";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { useAuthStore } from "../store/useAuthStore";
import SEO from "./SEO";
import { User, Mail, Phone, Camera, Save, Trash2, Upload, Shield, Key, Users } from 'lucide-react';


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { authUser, updateProfile, isLoading, handleImageUpload } = useAuthStore();
  const userId = localStorage.getItem("userId");
  const [imageFile, setImageFile] = useState(null);
  const [imageuploading, setImageuploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    phone: authUser?.phone || "",
    gender: authUser?.gender || "male",
  });

  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name || "",
        phone: authUser.phone || "",
        gender: authUser.gender || "male",
      });
    }
  }, [authUser]);


  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      addToast("Please select an image.", "error");
      return;
    }
    setImageuploading(true);

    let formData = new FormData();
    formData.append("profile", imageFile);

    try {
      const response = await handleImageUpload(formData)

      setUser((prevUser) => ({
        ...prevUser,
        profileImage: response.data.imageUrl,
      }));
      addToast("Profile image updated!", "success");

    } catch (error) {
      setImageuploading(false);
      addToast("Failed to upload image.", "error");

    } finally {
      setImageuploading(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      setImageuploading(true);
      await axiosInstance.delete(`/remove-profile-image/${userId}`);
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: "",
      }));
      setImageuploading(false);
      addToast("Profile image removed.", "success");
    } catch (error) {
      setImageuploading(false);
      addToast("Failed to remove profile image.", "error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setSaving(true)
    try {
      const response = await updateProfile(formData);
      setUser(response.data);
      addToast("Profile updated successfully!", "success");

    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      addToast("Failed to update profile.", "error");
    } finally {
      setSaving(false)
    }
  };

  if (!authUser) {
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <div className="glass-panel p-5 w-100" style={{ maxWidth: '800px' }}>
          <Skeleton height={40} width="30%" className="mb-4 mx-auto d-block" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
          <div className="text-center mb-5">
            <Skeleton circle height={120} width={120} baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
            <div className="mt-3">
              <Skeleton height={36} width={140} className="mx-2" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
            </div>
          </div>
          <Skeleton height={50} className="mb-3" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
          <Skeleton height={50} className="mb-3" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
          <Skeleton height={50} className="mb-3" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
          <Skeleton height={50} className="mb-5" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
          <Skeleton height={45} width="40%" className="mx-auto d-block" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
        </div>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title="My Profile"
        description="Manage your AizenX profile settings."
        url="/Userprofile"
      />
      <div className="min-vh-100 py-5" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <Container>

          <div className="text-center mb-5 animate-fade-in">
            <h1 className="fw-bold display-5" style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)' }}>
              USER <span className="text-accent">DASHBOARD</span>
            </h1>
            <p className="text-secondary font-monospace small">>> IDENTITY VERIFICATION & DATA MANAGEMENT</p>
          </div>

          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="glass-panel p-4 p-md-5 mx-auto animate-fade-in border-accent">

                <div className="d-flex align-items-center gap-2 mb-4 pb-3 border-bottom border-secondary">
                  <Shield className="text-accent" size={24} />
                  <h4 className="mb-0 fw-bold" style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)' }}>ACCOUNT IDENTITY</h4>
                </div>

                <Form>
                  {/* Profile Image Section */}
                  <div className="d-flex flex-column flex-md-row align-items-center gap-4 mb-5 p-4 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px dashed var(--border-color)' }}>
                    <div
                      className="position-relative"
                      style={{
                        width: "120px",
                        height: "120px",
                        flexShrink: 0
                      }}
                    >
                      <div style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        overflow: 'hidden',
                        border: '2px solid var(--accent-primary)',
                        boxShadow: '0 0 15px rgba(255, 193, 7, 0.2)'
                      }}>
                        <img
                          src={authUser.profileImage || "https://cdn-icons-png.flaticon.com/128/1057/1057240.png"}
                          alt="Profile"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="position-absolute bottom-0 end-0 bg-dark rounded-circle p-1 border border-secondary">
                        <Shield size={14} className="text-success" />
                      </div>
                    </div>

                    <div className="flex-grow-1 text-center text-md-start">
                      <h5 className="text-white fw-bold mb-1 font-monospace">{authUser.name || "Unknown User"}</h5>
                      <p className="text-secondary small font-monospace mb-3">{authUser.email}</p>

                      <div className="d-flex gap-2 justify-content-center justify-content-md-start flex-wrap">
                        {authUser.profileImage ? (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleRemoveImage}
                            disabled={imageuploading}
                            className="d-flex align-items-center gap-2 rounded-0 font-monospace"
                          >
                            {imageuploading ? <Spinner animation="border" size="sm" /> : <Trash2 size={16} />}
                            PURGE PHOTO
                          </Button>
                        ) : (
                          <>
                            <div className="d-flex align-items-center">
                              <Form.Control
                                type="file"
                                accept="image/*"
                                id="file-upload"
                                onChange={handleFileChange}
                                className="d-none"
                              />
                              <label htmlFor="file-upload" className="btn btn-outline-secondary btn-sm rounded-0 font-monospace d-flex align-items-center gap-2 cursor-pointer me-2">
                                <Camera size={16} /> SELECT FILE
                              </label>

                              <Button
                                className="btn-primary-glow btn-sm py-1 px-3 d-flex align-items-center gap-2"
                                onClick={handleUpload}
                                disabled={imageuploading || !imageFile}
                              >
                                {imageuploading ? <Spinner animation="border" size="sm" /> : <><Upload size={16} /> UPLOAD</>}
                              </Button>
                            </div>
                            {imageFile && <span className="text-accent small ms-2">{imageFile.name}</span>}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="small font-monospace text-muted">FULL DESIGNATION</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="glass-input border-end-0 text-secondary"><User size={18} /></InputGroup.Text>
                          <Form.Control
                            className="glass-input border-start-0 ps-0"
                            type="text"
                            name="name"
                            value={formData?.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="small font-monospace text-muted">COMMUNICATION LINK</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="glass-input border-end-0 text-secondary"><Mail size={18} /></InputGroup.Text>
                          <Form.Control
                            className="glass-input border-start-0 ps-0"
                            style={{ opacity: 0.7 }}
                            type="email"
                            name="email"
                            value={authUser?.email}
                            disabled
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="small font-monospace text-muted">CONTACT FREQUENCY</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="glass-input border-end-0 text-secondary"><Phone size={18} /></InputGroup.Text>
                          <Form.Control
                            className="glass-input border-start-0 ps-0"
                            type="text"
                            name="phone"
                            value={formData?.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91..."
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="small font-monospace text-muted">BIOLOGICAL CLASS</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="glass-input border-end-0 text-secondary"><Users size={18} /></InputGroup.Text>
                          <Form.Select
                            className="glass-input border-start-0 ps-0"
                            name="gender"
                            value={formData?.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          >
                            <option value="male" className="text-dark">MALE</option>
                            <option value="female" className="text-dark">FEMALE</option>
                            <option value="other" className="text-dark">OTHER</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-end mt-4 pt-3 border-top border-secondary">
                    <button
                      className="btn-primary-glow px-5 py-2"
                      disabled={isLoading || saving}
                      onClick={handleUpdate}
                    >
                      {isLoading || saving ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          PROCESSING...
                        </>
                      ) : (
                        <><Save size={18} className="me-2" /> SAVE DATA</>
                      )}
                    </button>
                  </div>

                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserProfile;