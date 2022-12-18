import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getData, setData } from "../components/functions";

export default function NestedList({ id }) {
  const [open, setOpen] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [randomVariable, setRandomVariable] = useState("pending");

  const updateData = async (event, orderId) => {
    try {
      const object = { id: 2 };

      await fetch("http://localhost:3001/orders/" + orderId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: "123" }),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const submitOrderData = async () => {
    await setData(`orders/${id}`, "");
  };

  const getOrderData = async () => {
    try {
      const data = await getData(`orders/${id}`);

      setOrderData(data.orders);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  const handleClick = (e) => {
    if (e === open) {
      setOpen("");
    } else {
      setOpen(e);
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    const tempOrderData = orderData.map((order) => {
      if (order.orderId === orderId) {
        order.orderStatus = orderStatus;
      }
      return order;
    });
    // tempOrderData = orderData;
    console.log("tempOrderData");

    const restaurantOrderData = { id: Number(id), orders: tempOrderData };
    console.log(restaurantOrderData);
    await setData(`orders/${id}`, restaurantOrderData);
    console.log("data sent");
    getOrderData();
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* {console.log(orderData.orders)} */}
      {orderData?.map((order) => (
        <div style={{ padding: "5px" }}>
          <ListItemButton
            style={{ border: "solid", minWidth: "400px", borderRadius: "2vh" }}
            onClick={() => handleClick(order.orderId)}
          >
            <ListItemText primary={order.orderId} />
            {open === order.orderId ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {order.orderItems.map((itm) => (
            <Collapse in={order.orderId === open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={itm.name} />

                  <Typography>Qty: </Typography>
                  <Typography sx={{ ml: "1vh" }}>{itm.qty}</Typography>
                </ListItem>
              </List>
            </Collapse>
          ))}
          <Collapse in={order.orderId === open} timeout="auto" unmountOnExit>
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
                      updateOrderStatus(order.orderId, e.target.value);
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
        </div>
      ))}
      {/* {console.log(randomVariable)} */}
    </List>
  );
}
