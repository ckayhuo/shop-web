import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Row, Col, Modal, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

export function ProductModal() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 1.0,
    imgUrl: "",
    quantity: 1.0,
  });

  // Fetch products
  useEffect(() => {
    if (isAuthenticated && user?.role === "seller") {
      fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const productsData = Array.isArray(data) ? data : [data];
          setProducts(productsData);
          // console.log("Products after setting:", productsData);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [isAuthenticated, user]);

  // Handle product modification
  const handleEdit = (product: ProductItem) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleProductUpdate = async () => {
    if (selectedProduct) {
      const updatedProduct = {
        name: selectedProduct.name,
        price: selectedProduct.price,
        imgUrl: selectedProduct.imgUrl,
        quantity: selectedProduct.quantity,
      };

      try {
        await fetch(
          `http://localhost:5000/api/products/${selectedProduct.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
            credentials: "include",
          }
        );
        setShowModal(false);
        setSelectedProduct(null);
        // Refetch products to update UI
        fetchProducts();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct) {
      const { name, value } = e.target;
      setSelectedProduct({
        ...selectedProduct,
        [name]: value,
      });
    }
  };

  // Add new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
        credentials: "include",
      });
      setNewProduct({
        name: "",
        price: 1.0,
        imgUrl: "",
        quantity: 1,
      });
      // Refetch products to update UI
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      const productsData = Array.isArray(data) ? data : [data];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if (!isAuthenticated || user?.role !== "seller") {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div>
      <h3>Product List</h3>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.imgUrl} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Quantity: {product.quantity}</Card.Text>
                <Button variant="primary" onClick={() => handleEdit(product)}>
                  Edit Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
