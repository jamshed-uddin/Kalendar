import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoadingOrError = ({ useFor = "loading" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const loadAgain = () => {
    navigate(location.pathname, { replace: true });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {useFor === "loading" ? (
        <h2>Loading...</h2>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>Something went wrong!</h2>
          <button onClick={loadAgain}>Try again.</button>
        </div>
      )}
    </div>
  );
};

export default LoadingOrError;
