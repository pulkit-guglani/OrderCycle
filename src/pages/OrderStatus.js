import { Box, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router";

const OrderStatus = ({ status = "Pending" }) => {
  const { id } = useParams();
  const [restID, orderID] = id.split("-");
  const location = useLocation();
  const data = location.state.finalData;
  console.log(data[0].orderItems);
  return (
    <Box>
      <Typography>Order No: {orderID}</Typography>
      <Typography>
        Items:{" "}
        {data[0].orderItems.map((item) => (
          <li>{item.name}</li>
        ))}
      </Typography>
      <Typography>Status: {status}</Typography>
    </Box>
  );
};

export default OrderStatus;
