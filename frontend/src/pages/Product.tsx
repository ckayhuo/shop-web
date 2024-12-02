import React, { useState, useEffect, useContext } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { ProductCard } from "../components/ProductCard";
import { useProduct } from "../context/ProductContext";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

export function Product() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const { fetchProducts, createProduct } = useProduct();
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 1.0,
    quantity: 1,
    imgUrl: "",
  });

  // Fetch products
  useEffect(() => {
    async function fetchCurrentProducts() {
      if (isAuthenticated && user?.role === "seller") {
        try {
          const fetchedProducts = await fetchProducts();
          setProducts(fetchedProducts);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchCurrentProducts();
  }, [isAuthenticated, user]);

  const handleCancel = () => {
    setShowModal(false);
  };

  // Add new product
  const handleAdd = () => {
    setShowModal(true);
  };

  // Add new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createProduct(JSON.stringify(newProduct));
      setNewProduct({
        name: "",
        price: 1.0,
        quantity: 1,
        imgUrl: "",
      });

      setShowModal(false);
      // Refetch products to update UI
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  if (!isAuthenticated || user?.role !== "seller") {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <h3>Your Product List</h3>
        <Button variant="success" className="ms-auto" onClick={handleAdd}>
          Add Product
        </Button>
      </div>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <ProductCard {...item} />
          </Col>
        ))}
      </Row>

      {/* Modal for adding a new product */}
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
                value={newProduct.name}
                onChange={handleProductChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleProductChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductImgUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imgUrl"
                value={newProduct.imgUrl}
                onChange={handleProductChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleProductChange}
              />
            </Form.Group>
            {/* Button need to be in Form since it uses FormEvent */}
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddProduct}>
                Add
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
