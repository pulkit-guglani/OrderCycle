import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

const OrderStatus = ({ status = "Pending" }) => {
  const location = useLocation();
  let { resId, id } = useParams();
  // const urlData = location.pathname.split("/");
  const [orderData, setOrderData] = useState([]);
  // const id = urlData[urlData.length - 1];
  // const resId = urlData[urlData.length - 2];
  const [isLoading, setLoading] = useState(true);
  console.log(resId, id);
  const getOrderData = async () => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_URL}/getOrderWithId/${resId}/${id}`
      );
      const jsonData = await data.json();
      setOrderData(jsonData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);
  console.log(orderData);
  return isLoading ? (
    <h2>Loading...</h2>
  ) : !orderData?.id ? (
    <h2>Order Not Found</h2>
  ) : (
    <>
      <Typography textAlign="center" variant="h5" mb="20px">
        Order No: {orderData.id}
      </Typography>
      <Box
        bgcolor="primary.background.paper"
        sx={{
          display: "flex",
          border: "solid",
          marginLeft: "auto",
          marginRight: "auto",
          width: "fit-content",
          padding: "10px",
          gap: " 5vh",
        }}
      >
        <Typography>
          Items:{" "}
          {orderData?.orderItems?.map((item) => (
            <li>{item.name}</li>
          ))}
        </Typography>
        <Typography>
          <center>
            Status: <br /> <b>{orderData.orderStatus}</b>
          </center>
        </Typography>
      </Box>
    </>
  );
};

export default OrderStatus;
