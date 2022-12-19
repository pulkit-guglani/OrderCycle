import { Box, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router";

const OrderStatus = ({ status = "Pending" }) => {
  const { id } = useParams();
  const [restID, orderID] = id.split("-");
  const location = useLocation();
  const data = location.state.finalData;
  console.log(data[0].orderItems);
  return (
    <>
      <Typography textAlign="center" variant="h5" mb="20px">
        Order No: {orderID}
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
          {data[0].orderItems.map((item) => (
            <li>{item.name}</li>
          ))}
        </Typography>
        <Typography>
          <center>
            Status: <br /> <b>{status}</b>
          </center>
        </Typography>
      </Box>
    </>
  );
};

export default OrderStatus;
