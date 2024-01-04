import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  useEffect(() => {
    const storageRefreshToken = JSON.parse(localStorage.getItem("refresh_token"))
    if (!user?.refresh_token && !storageRefreshToken) {
      console.log("navigate home");
      navigate("/sign-in");
    }
  });
  return <div>NotFoundPage</div>;
};

export default NotFoundPage;
