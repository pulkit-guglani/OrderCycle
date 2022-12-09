import { Box, Typography } from "@mui/material";

const OrderStatus = ({
  num = 10,
  items = ["a", "b", "c"],
  status = "Pending",
}) => {
  return (
    <Box>
      <Typography>Order No: {num}</Typography>
      <Typography>
        Items:{" "}
        {items.map((item) => (
          <li>{item}</li>
        ))}
      </Typography>
      <Typography>Status: {status}</Typography>
    </Box>
  );
};

export default OrderStatus;
