import { useEffect, useState } from "react";

// initialValue is either type of T or a function returns T type
export function useLocalStrage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    // try to get value from local storage
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      // explictly treats this function returnning T type
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  // Run useEffect every time the key or value changes

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
