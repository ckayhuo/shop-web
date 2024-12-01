import React, { useState, useEffect, useContext } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
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
          console.log(`fetchedProducts = ${fetchedProducts}`);
          setProducts(fetchedProducts);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchCurrentProducts();
  }, [isAuthenticated, user]);

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
      // Refetch products to update UI
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (!isAuthenticated || user?.role !== "seller") {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <h3>Product List</h3>
        <Button
          variant="success"
          className="ms-auto"
          onClick={handleAddProduct}
        >
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

      {/* DEBUG: Add New Products */}
      <h3>Add New Product</h3>
      <Form onSubmit={handleAddProduct}>
        <Form.Group className="mb-3" controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProductImgUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.imgUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imgUrl: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProductQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                quantity: parseInt(e.target.value),
              })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
}
