import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function ProductModal() {
  /* Modal for editing product */
  const [showModal, setShowModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 1.0,
    quantity: 1,
    imgUrl: "",
  });
  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedProduct.name}
                onChange={handleProductChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={selectedProduct.price}
                onChange={handleProductChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductImgUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imgUrl"
                value={selectedProduct.imgUrl}
                onChange={handleProductChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={selectedProduct.quantity}
                onChange={handleProductChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleProductUpdate}>
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
