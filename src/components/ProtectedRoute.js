import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ Component, pageType }) => {
  const { resId } = useParams();
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

  const validationText = pageType + resId;
  console.log(cookieData, validationText);
  if (cookieData == validationText) {
    return <Component />;
  } else {
    navigate(`/restaurantLandingPage/${resId}`);
  }
};

export default ProtectedRoute;
