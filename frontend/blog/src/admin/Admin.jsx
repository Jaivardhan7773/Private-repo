import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getUsers`, {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        setUsers(response.data);
        setLoading(false)
      } catch (error) {
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);




  const makeEditor = async (userId) => {
    const token = localStorage.getItem("Token")
    try {
      setAction((prev) => ({ ...prev, [userId]: true }));
      await axios.patch(`${import.meta.env.VITE_API_URL}/makeEditor/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("user is now Editor");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isEditor: true } : user
        )
      );
      setAction((prev) => ({ ...prev, [userId]: false }));
    }
    catch (error) {
      setAction((prev) => ({ ...prev, [userId]: false }));
      toast.error("cannot make user Editor")
    }
  };

  const removeEditor = async (userId) => {
    try {
      setAction((prev) => ({ ...prev, [userId]: true }));
      const token = localStorage.getItem("Token");
      await axios.patch(`${import.meta.env.VITE_API_URL}/removeEditor/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Editor privileges removed");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isEditor: false } : user
        )
      );
      setAction((prev) => ({ ...prev, [userId]: false }));
    } catch (error) {
      setAction((prev) => ({ ...prev, [userId]: false }));
      toast.error("Failed to remove Editor");
    }
  };



  const makeAdmin = async (userId) => {
    const token = localStorage.getItem("Token")
    try {
      setAction((prev) => ({ ...prev, [userId]: true }));
      await axios.patch(`${import.meta.env.VITE_API_URL}/makeAdmin/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("user is now admin");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: true } : user
        )
      );
      setAction((prev) => ({ ...prev, [userId]: false }));

    }
    catch (error) {
      setAction((prev) => ({ ...prev, [userId]: false }));

      toast.error("cannot make user admin")
    }
  };

  const removeAdmin = async (userId) => {
    try {
      setAction((prev) => ({ ...prev, [userId]: true }));
      const token = localStorage.getItem("Token");
      await axios.patch(`${import.meta.env.VITE_API_URL}/removeAdmin/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Admin privileges removed");
      // fetchUsers();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: false } : user
        )
      );
      setAction((prev) => ({ ...prev, [userId]: false }));

    } catch (error) {
      setAction((prev) => ({ ...prev, [userId]: false }));

      toast.error("Failed to remove admin.");
    }
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("Token");
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("user deleted successfully");
      setUsers(users.filter((user) => user._id !== userId));
    }
    catch (error) {
      toast.error("Failed to delete user.");
    }
  }




  return (
    <>


      {/* <div
      style={{
        width: '100%',
        padding: '40px 20px',
   
        textAlign: 'center',
        fontSize: '2.5rem',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(22deg, rgba(116,255,79,1) 0%, rgba(32,153,131,0.876715652081145)',
        zIndex: 1, // lower than button
        position: 'sticky', // required for zIndex to apply
        top: 0,
      }}
      className="sticky-top"
    >
      User Management
    </div> */}

      <Container className="mt-4">
        <h2 className="text-center text-light mb-3">User Management</h2>
        <div className="table-responsive">
          <Table responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Admin</th>
                <th>Editor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (

                [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td><Skeleton width={20} /></td>
                    <td><Skeleton width={100} /></td>
                    <td><Skeleton width={150} /></td>
                    <td><Skeleton width={100} /></td>
                    <td><Skeleton width={60} /></td>
                    <td><Skeleton width={50} /></td>
                    <td><Skeleton width={50} /></td>
                    <td>
                      <Skeleton width={80} height={25} style={{ display: "inline-block", marginRight: "5px" }} />
                      <Skeleton width={80} height={25} style={{ display: "inline-block", marginRight: "5px" }} />
                      <Skeleton width={60} height={25} style={{ display: "inline-block" }} />
                    </td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>
                      <a className="text-dark" style={{ textDecoration: "none" }} href={`mailto:${user.email}`}><strong>{user.email}</strong></a>
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.gender}</td>
                    <td>{user.isAdmin ? "✅ Yes" : "❌ No"}</td>
                    <td>{user.isEditor ? "✅ Yes" : "❌ No"}</td>
                    <td>
                      {user.isEditor ? (
                        <Button variant="warning" size="sm" className="me-2  rounded-pill" onClick={() => removeEditor(user._id)}>
                          {action[user._id] ? (
                            <>
                              Removing Editor <Spinner animation="border" size="sm" />
                            </>
                          ) : (
                            "Remove Editor"
                          )}
                        </Button>
                      ) : (
                        <Button variant="success" size="sm" className="me-2 rounded-pill" onClick={() => makeEditor(user._id)}>
                         
                          {action[user._id] ? (
                            <>
                              Making Editor <Spinner animation="border" size="sm" />
                            </>
                          ) : (
                            " Make Editor"
                          )}
                        </Button>
                      )}
                      {user.isAdmin ? (
                        <Button variant="warning" size="sm" className="me-2 rounded-pill" onClick={() => removeAdmin(user._id)}>
                          
                          {action[user._id] ? (
                            <>
                              Removing Admin <Spinner animation="border" size="sm" />
                            </>
                          ) : (
                            "Remove Admin"
                          )}
                        </Button>
                      ) : (
                        <Button variant="success" size="sm" className="me-2 rounded-pill" onClick={() => makeAdmin(user._id)}>
                         
                          {action[user._id] ? (
                            <>
                               Making Admin <Spinner animation="border" size="sm" />
                            </>
                          ) : (
                            "make Admin"
                          )}                          
                        </Button>
                      )}
                      <Button variant="danger" size="sm" className="rounded-pill" onClick={() => handleDelete(user._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>



    </>
  )
}

export default Admin