import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../utilities/Style.css";

export function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);
  return (
    <div className="home-container">
      <div className="main-content">
        <div>
          <h1>Welcome to Kay's Store</h1>
          {isAuthenticated && user?.role === "seller" ? (
            <p>
              <a href="/product" className="redirect-link">
                Manage Products
              </a>
            </p>
          ) : (
            <p>
              <a href="/store" className="redirect-link">
                Start Shopping
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
