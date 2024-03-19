import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


function Dashboard() {
  const [user, setUser] = useState({ email: "", username: "" });

  const router = useRouter();
  const getProfile = async () => {
    
      const response = await axios.get("/api/auth/profile");
      setUser(response.data);
 
  };

  const logout = async () => {
    const response = await axios.post("/api/auth/logout");
    router.push("/login")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => getProfile()}>Get Profile</button>
      <button onClick={() =>logout()}>logout</button>
    </div>
  );
}

export default Dashboard;
