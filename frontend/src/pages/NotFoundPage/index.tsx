import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const NotFoundPage = () => {
  const user = useSelector((state: RootState) => state?.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.refresh_token && !localStorage.getItem("refresh_token")) {
      console.log("navigate home");
      navigate("/sign-in");
    }
  });
  return <div>NotFoundPage</div>;
};

export default NotFoundPage;
