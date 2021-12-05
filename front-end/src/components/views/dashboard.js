import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {user?.account !== "true" ? (
        <h1 style={{ marginTop: 200, color: "#00AAEE" }}>
          Sorry!! your Account Not Activated Yet
        </h1>
      ) : user?.status === "admin" ? (
        <h1 style={{ marginTop: 200, color: "#00AAEE" }}>
          Welcome to Admin Dashboard
        </h1>
      ) : (
        <div>
          <h1 style={{ marginTop: 100, color: "#00AAEE" }}>
            {" "}
            Welcome {user?.name}{" "}
          </h1>
          <img src="/images/profile.png" alt="pic" />
        </div>
      )}
    </div>
  );
}
