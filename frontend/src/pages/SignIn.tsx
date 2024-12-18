import React, { useContext, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const { login, logout, isAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (!(await login({ email, password, role }))) {
        setError("Login failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again...");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <p>
          You've logged in. Go to <a href="/">Home Page</a> or{" "}
          <button
            onClick={logout}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Log out
          </button>
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <Row className="w-100">
            <Col md={6} sm={12}>
              <h2 className="text-center mb-4">Log In</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formRole" className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Log In
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p>
                  Don't have an account? <a href="/signup">Sign Up</a>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
