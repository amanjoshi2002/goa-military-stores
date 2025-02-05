import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Static credentials
    const staticUsername = "admin";
    const staticPassword = "password";

    if (username === staticUsername && password === staticPassword) {
      setCookie("isLoggedIn", "true", { maxAge: 60 * 60 * 24 }); // 1 day
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;