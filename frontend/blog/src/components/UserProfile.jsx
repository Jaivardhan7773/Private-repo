import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal, Container, Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const [imageFile, setImageFile] = useState(null);
  const [imageuploading, setImageuploading] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("Token")
      if (!userId) {
        toast.error("User not logged in.");
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        toast.error("Error fetching user details.");
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <>
      <Container className="mt-4 d-flex justify-content-center">
        <Card className="w-100 h-100 shadow-sm p-4" style={{ maxWidth: '1000px' }}>

          <Skeleton height={30} width="30%" className="mb-4" /> {/* Title */}

          <div className="text-center mb-4">
            <Skeleton
              circle
              height={100}
              width={100}
              containerClassName="d-inline-block"
            />
            <div className="mt-3">
              <Skeleton height={30} width={120} className="mx-2" />
              <Skeleton height={30} width={120} className="mx-2 mt-2" />
            </div>
          </div>

          <div className="mb-3">
            <Skeleton height={20} width="15%" className="mb-1" />
            <Skeleton height={35} width="100%" />
          </div>

          <div className="mb-3">
            <Skeleton height={20} width="15%" className="mb-1" />
            <Skeleton height={35} width="100%" />
          </div>

          <div className="mb-3">
            <Skeleton height={20} width="15%" className="mb-1" />
            <Skeleton height={35} width="100%" />
          </div>

          <div className="mb-4">
            <Skeleton height={20} width="15%" className="mb-1" />
            <Skeleton height={35} width="100%" />
          </div>

          <div className="text-center">
            <Skeleton height={40} width="40%" />
          </div>
        </Card>
      </Container>
    </>;
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("Token")
    if (!imageFile) {
      toast.error("Please select an image.");
      return;
    }
    setImageuploading(true);

    let formData = new FormData();
    formData.append("profile", imageFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload/profile/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser((prevUser) => ({
        ...prevUser,
        profileImage: response.data.imageUrl,
      }));
      setImageuploading(false);
      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      setImageuploading(false);
      toast.error("Error uploading profile image.");
    }
  };

  const handleRemoveImage = async () => {
    const token = localStorage.getItem("Token")
    try {
      setImageuploading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/remove-profile-image/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: "",
      }));
      setImageuploading(false);
      toast.success("Profile image removed.");
    } catch (error) {
      setImageuploading(false);
      toast.error("Failed to remove profile image.");
    }
  };

  const handleUpdate = async (e) => {
    const token = localStorage.getItem("Token");
    e.preventDefault();

    try {
      setSaving(true)
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/updateUser/${userId}`, {
        name: user.name,
        phone: user.phone,
        gender: user.gender,
      },
        {
          headers: { Authorization: `Bearer ${token}` },
        });

      setUser(response.data);
      toast.success("Profile updated successfully!");
      setSaving(false)
    } catch (error) {
      setSaving(false)
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error("Failed to update profile.");
    }
  };

  if (!user) {
    return <>
      <Container className="mt-4 d-flex justify-content-center">
        <Card className="w-100 h-100 shadow-sm p-4" style={{ maxWidth: '1000px' }}>

          <Skeleton height={30} width="30%" className="mb-4" /> {/* Title */}

          <div className="text-center mb-4">
            <Skeleton
              circle
              height={100}
              width={100}
              containerClassName="d-inline-block"
            />
            <div className="mt-3">
              <Skeleton height={30} width={120} className="mx-2" />
              <Skeleton height={30} width={120} className="mx-2 mt-2" />
            </div>
          </div>

          <div className="mb-3">
            <Skeleton height={20} width="15%" className="mb-1" />
            <Skeleton height={35} width="100%" />
          </div>

          <div className="mb-3">
            <Skeleton height={20} width="15%" className="mb-1" />
            <Skeleton height={35} width="100%" />
          </div>

          <div className="mb-3">
            <Skeleton height={20} width="15%" className="mb-1" />
            <Skeleton height={35} width="100%" />
          </div>

          <div className="mb-4">
            <Skeleton height={20} width="15%" className="mb-1" />
            <Skeleton height={35} width="100%" />
          </div>

          <div className="text-center">
            <Skeleton height={40} width="40%" />
          </div>
        </Card>
      </Container>
    </>;
  }

  return (
    <>
      <div className="container  mt-4">


        <Container className="mt-4">
          <Card className="p-4 shadow-sm">
            <h4 className="mb-3">Profile Settings</h4>
            <Form >

              <Form.Group className="mb-3 text-center">
                <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                  <img
                    src={user.profileImage || "https://cdn-icons-png.flaticon.com/128/1057/1057240.png"}
                    alt="Profile Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",

                    }}

                  />
                </label>
                <div className="mt-2">
                  {user.profileImage ? (
                    <Button variant="outline-danger" size="sm" onClick={handleRemoveImage} disabled={imageuploading}>
                      {imageuploading ? <> removing image <Spinner animation="border" size="sm" /></> : "remove image"}

                    </Button>
                  ) : (
                    <>
                      <Form.Control type="file" accept="image/*" id="file-upload" onChange={handleFileChange} />
                      <Button variant="outline-primary" size="sm" className="mt-2" onClick={handleUpload} disabled={imageuploading}>
                        {imageuploading ? <> uploading image <Spinner animation="border" size="sm" /></> : "upload profile"}
                      </Button>
                    </>
                  )}
                </div>
              </Form.Group>



              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  disabled
                />
                <span className="text-danger">email cant be changed</span>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" onClick={handleUpdate}>

                  {saving ? (
                    <>
                      Saving Changes <Spinner animation="border" size="sm" />
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>

            </Form>
          </Card>
        </Container>

      </div>
    </>
  )
}

export default UserProfile