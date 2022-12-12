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
import { borderRadius } from "@mui/system";

// Temporary Data

// Temporary Data Ends here

export default function NestedList({ id }) {
  const [open, setOpen] = useState("");
  const [orderData, setOrderData] = useState({});
  const [randomVariable, setRandomVariable] = useState("pending");
  const data = [
    {
      category: "Drinks",
      items: [
        { name: "lemonade", price: 200, isAvailable: true },
        { name: "mojeto", price: 240, isAvailable: true },
      ],
    },
    {
      category: "Snacks",
      items: [
        { name: "burger", cost: 100, availabilty: true },
        { name: "french fries", cost: 80, availabilty: true },
      ],
    },
    {
      category: "Apetizer",
      items: [
        { name: "potato skins", cost: 200, availabilty: true },
        { name: "cheese and crackers", cost: 180, availabilty: true },
      ],
    },
  ];

  const updateData = async (event, orderId) => {
    fetch("http://localhost:3001/orders/" + orderId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((result) => {});
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/orders`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const someData = data.filter((orders) => {
          return orders.restaurantId == id;
        });
        setOrderData(someData[0]);
      });
  }, []);

  const handleClick = (e) => {
    if (e === open) {
      setOpen("");
    } else {
      setOpen(e);
    }
  };

  return !orderData.orders ? null : (
    <List
      sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {console.log(orderData.orders)}
      {orderData.orders.map((order) => (
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
                    value={randomVariable}
                    onChange={(e) => {
                      setRandomVariable(e.target.value);
                      console.log(randomVariable);
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
      {console.log(randomVariable)}
    </List>
  );
}
