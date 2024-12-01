import React, { createContext, useState, useEffect, ReactNode } from "react";
import { removeCookie, setCookie } from "typescript-cookie";

type AuthContextType = {
  user: { email: string; role: string } | null;
  login: (user: { email: string; password: string; role: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check session on load
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/check-session", {
      method: "GET",
      credentials: "include", // Automatically include cookies (including the token)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`data.user = ${data.user}; data.role = ${data.role}`);
        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      });
  }, []);

  const login = (user: { email: string; password: string; role: string }) => {
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "Login successful") {
          setCookie("token", data.token, { expires: 1 }); // Set token in cookies
          setUser({ email: user.email, role: data.role });
          setIsAuthenticated(true);
        }
      });
  };

  const logout = () => {
    removeCookie("token"); // Remove token from cookies
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
