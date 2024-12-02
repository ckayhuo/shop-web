import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { removeCookie, setCookie } from "typescript-cookie";

type AuthContextType = {
  user: { email: string; role: string } | null;
  login: (user: {
    email: string;
    password: string;
    role: string;
  }) => Promise<boolean>;
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
  const navigate = useNavigate();

  // Check session on load
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/check-session", {
      method: "GET",
      credentials: "include", // Automatically include cookies (including the token)
    })
      .then((response) => response.json())
      .then((data) => {
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

  const login = async (user: {
    email: string;
    password: string;
    role: string;
  }): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        setCookie("token", data.token, { expires: 1 });
        setUser({ email: user.email, role: data.role });
        setIsAuthenticated(true);
        navigate("/"); // Navigate only on success
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
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
