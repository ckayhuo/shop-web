import { useContext, createContext, ReactNode } from "react";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

type ProductContext = {
  createProduct: (productData: string) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (id: number, productData: string) => void;
  fetchProducts: () => Promise<ProductItem[]>;
};

const ProductContext = createContext({} as ProductContext);

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  async function createProduct(productData: string) {
    const product = JSON.parse(productData);
    const requiredKeys = ["name", "price", "imgUrl", "quantity"];
    const hasAllKeys = requiredKeys.every((key) => key in product);

    if (!hasAllKeys) {
      throw new Error(
        "Missing required fields in product data. Current data: " + productData
      );
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: productData,
        credentials: "include",
      });
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error(`Failed to create product: ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async function updateProduct(id: number, productData: string) {
    const product = JSON.parse(productData);
    const requiredKeys = ["name", "price", "imgUrl", "quantity"];
    const hasAllKeys = requiredKeys.every((key) => key in product);

    if (!hasAllKeys) {
      throw new Error(
        "Missing required fields in product data. Current data: " + productData
      );
    }
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: productData,
      });
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async function deleteProduct(id: number) {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async function fetchProducts(): Promise<ProductItem[]> {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const productsData = Array.isArray(data) ? data : [data];
        return productsData;
      } else {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        deleteProduct,
        updateProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
