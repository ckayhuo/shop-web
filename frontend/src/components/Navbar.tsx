import {
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar as NavbarBs,
  NavItem,
} from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cart from "./cart.png";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { MdAccountCircle } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import "../utilities/Style.css";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const location = useLocation();
  const isStorePage = location.pathname === "/store";
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignIn = () => navigate("/signin");
  const handleLogout = () => logout();

  return (
    <NavbarBs sticky="top" className="shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          {user?.role !== "seller" ? (
            <Nav.Link to="/store" as={NavLink}>
              Store
            </Nav.Link>
          ) : (
            <Nav.Link to="/product" as={NavLink}>
              Product
            </Nav.Link>
          )}
        </Nav>

        {/* Account dropdown menu */}
        <div
          className="navbar-buttons"
          style={{ display: "flex", gap: "1rem" }}
        >
          <Dropdown align="end">
            <Dropdown.Toggle
              as={Button}
              split={true}
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle mb-3"
            >
              <MdAccountCircle size="1.5rem" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {isAuthenticated ? (
                <>
                  <Dropdown.ItemText>
                    <strong>{user?.email}\n</strong>
                    <strong>{user?.role}</strong>
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item onClick={handleSignIn}>Sign In</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>

          {/* Shopping cart button */}
          {isStorePage && (
            <Button
              onClick={openCart}
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle mb-3"
            >
              <img
                src={Cart}
                alt="Cart Icon"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
              {cartQuantity > 0 && (
                <div
                  className="rounded-circle bg-danger d-flex justify-content-center
            align-items-center"
                  style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(25%, 25%)",
                  }}
                >
                  {cartQuantity}
                </div>
              )}
            </Button>
          )}
        </div>
      </Container>
    </NavbarBs>
  );
}
