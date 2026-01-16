import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAdminStore } from "../store/admin/useAdminStore.js";

const Admin = () => {
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [action, setAction] = useState(false);
const {getusers , allUsers , isAllusersloading , action, removeEditor , makeEditor , makeAdmin , removeAdmin , handleDelete} =  useAdminStore()



useEffect(() => {
if(allUsers.length ===0 ){
  getusers();
}
} , [getusers , allUsers.length]);


  return (
    <>

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
              {isAllusersloading ? (

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
              ) : allUsers && allUsers.length > 0 ? (
                allUsers.map((user, index) => (
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