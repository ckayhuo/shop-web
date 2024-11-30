import { useState, useEffect } from "react";

export function useAuth() {
  // user = { role: "buyer" } or { role: "seller" } or null
  const [user, setUser] = useState<{ role: string } | null>(null);

  useEffect(() => {
    // credentials: 'include' allows cross-domain for cookie/session
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return { user };
}
