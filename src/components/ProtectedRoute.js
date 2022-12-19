import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ Component, pageType }) => {
  const { id } = useParams();
  const [cookieData, setCookieData] = useState("");
  const navigate = useNavigate();

  const getCookie = () => {
    const data = document.cookie
      .split("; ")
      .find((row) => row.startsWith("ordercycle.in="))
      ?.split("=")[1];
    setCookieData(data);
  };
  useEffect(() => getCookie());

  const validationText = pageType + id;
  console.log(cookieData, validationText);
  if (cookieData == validationText) {
    return <Component />;
  } else {
    navigate(`/restaurantLandingPage/${id}`);
  }
};

export default ProtectedRoute;
