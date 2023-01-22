import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getData, setData } from "../components/functions";
import {
  sendOrderAddedTrigger,
  subscribeToNewOrders,
} from "../sockets/socketsHandler";

export default function NestedList({ resId }) {
  const [open, setOpen] = useState("");
  const [orderData, setOrderData] = useState([]);

  const getOrderData = async () => {
    try {
      const data = await getData(`orders/${resId}`);

      setOrderData(data.orders);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrderData();
    subscribeToNewOrders(getOrderData);
  }, []);

  const handleClick = (e) => {
    if (e === open) {
      setOpen("");
    } else {
      setOpen(e);
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    sendOrderAddedTrigger();
    await setData(`updateOrderStatus/${resId}/${orderId}`, {
      status: orderStatus,
    });
    console.log("data sent");
    getOrderData();
  };

  return (
    <List
      className="t1"
      sx={{
        borderRadius: "20px",
        width: "100%",
        maxWidth: 450,
        bgcolor: "background.paper",
        overflowY: "scroll",
        maxHeight: 300,
        height: "100%",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* {console.log(orderData.orders)} */}
      {orderData?.map((order) => (
        <Box
          bgcolor={"secondary.main"}
          sx={{ borderRadius: "20px", padding: "2px", minWidth: "350px" }}
        >
          <ListItemButton
            color={"primary.light"}
            sx={{
              border: "1.75px solid #9f94be",
              borderRadius: "2vh",
              background: "",
              mb: "4px",
            }}
            onClick={() => handleClick(order.id)}
          >
            <ListItemText primary={"Order No." + order.id} />
            {open === order.id ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {order.orderItems.map((itm) => (
            <Collapse in={order.id === open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={itm.name} />

                  <Typography>Qty: </Typography>
                  <Typography sx={{ ml: "1vh" }}>{itm.qty}</Typography>
                </ListItem>
              </List>
            </Collapse>
          ))}
          <Collapse in={order.id === open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{
                  p: 2,
                  border: "solid",
                  borderColor: "gray",
                  borderRadius: "2vh",
                }}
              >
                <Typography marginTop="25px" marginRight="10px">
                  Status:
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="status-label"
                    name="radio-buttons-group"
                    value={order.orderStatus}
                    onChange={(e) => {
                      //e.target.value
                      updateOrderStatus(order.id, e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="pending"
                      control={<Radio color="error" />}
                      label="pending"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="cooking"
                      control={<Radio color="warning" />}
                      label="cooking"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="ready"
                      control={<Radio color="success" />}
                      label="ready"
                      labelPlacement="top"
                    />
                  </RadioGroup>
                </FormControl>
              </ListItem>
            </List>
          </Collapse>
        </Box>
      ))}
      {/* {console.log(randomVariable)} */}
    </List>
  );
}
