import { useEffect, useState } from "react";

type StoreItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function FetchItems() {
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((response) => response.json())
      .then((data) => setStoreItems(data));
  }, []);

  return storeItems;
}
