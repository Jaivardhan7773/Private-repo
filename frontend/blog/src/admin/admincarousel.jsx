import React, { useEffect, useState } from "react";
import { Button, Carousel, Spinner, Form, Modal, Row } from "react-bootstrap";
import { useAdminStore } from "../store/admin/useAdminStore";

const AdminCarousel = () => {
  const {
    carouselItems,
    loading,
    isProcessing,
    fetchCarousel,
    addCarousel,
    deleteCarousel,
    updateCarousel,
  } = useAdminStore();

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: "", image: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if(carouselItems.length === 0){
      fetchCarousel();
    }
  }, [fetchCarousel , carouselItems.length]);

  const handleAdd = async () => {
    try {
      await addCarousel(formData);
      setShowModal(false);
      setFormData({ title: "", image: "", description: "" });
    } catch {}
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ title: item.title, image: item.image, description: item.description });
    setShowModal(true);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    try {
      await updateCarousel(editingItem._id, formData);
      setShowModal(false);
    } catch {}
  };

  return (
    <Row>
      <div className="container mt-4">
        <h2 className="text-center text-light">Image Carousel</h2>
        <div className="text-center mb-3">
          <Button
            variant="success"
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setFormData({ title: "", image: "", description: "" });
            }}
          >
            Add New Carousel Item
          </Button>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Carousel slide={false}>
            {carouselItems.length > 0 ? (
              carouselItems.map((item , index) => (
                <Carousel.Item key={item._id}>
                  <img
                    className="d-block w-100"
                    src={item.image}
                    alt={item.title}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        window.confirm("Are you sure you want to delete this item?") &&
                        deleteCarousel(item._id)
                      }
                    >
                      Delete
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              ))
            ) : (
              <p className="text-center">No carousel items available.</p>
            )}
          </Carousel>
        )}

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Carousel Item" : "Add New Carousel Item"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={isEditing ? handleUpdate : handleAdd}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : isEditing ? "Save Changes" : "Add Item"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Row>
  );
};

export default AdminCarousel;
