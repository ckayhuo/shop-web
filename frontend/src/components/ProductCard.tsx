import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useProduct } from "../context/ProductContext";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgUrl: string;
};

export function ProductCard({
  id,
  name,
  price,
  quantity,
  imgUrl,
}: ProductCardProps) {
  const { deleteProduct, updateProduct } = useProduct();
  const [formData, setFormData] = useState({ name, price, quantity, imgUrl });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({ name, price, quantity, imgUrl }); // Revert to original values
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(id, JSON.stringify(formData));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <Card className="mb-3" style={{ minHeight: "200px" }}>
      <Row className="g-0">
        <Col md={4}>
          <Card.Img
            src={imgUrl}
            alt={name}
            style={{ height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <h5>
                {isEditing ? (
                  <>
                    <strong>Name: </strong>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  formData.name
                )}
              </h5>
              <div>
                <AiFillEdit
                  onClick={handleEdit}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                />
                {!isEditing && (
                  <AiFillDelete
                    onClick={handleDelete}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                )}
              </div>
            </div>

            <Card.Text>
              <strong>Price: </strong>
              {isEditing ? (
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              ) : (
                `$${formData.price}`
              )}
            </Card.Text>

            <Card.Text>
              <strong>Quantity: </strong>
              {isEditing ? (
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              ) : (
                formData.quantity
              )}
            </Card.Text>
            <Card.Text>
              <strong>Image Url: </strong>
              {isEditing ? (
                <Form.Control
                  type="text"
                  name="imgUrl"
                  value={formData.imgUrl}
                  onChange={handleChange}
                />
              ) : (
                formData.imgUrl
              )}
            </Card.Text>

            {isEditing && (
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="success"
                  className="me-2"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
