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

// Temporary Data

// Temporary Data Ends here

export default function NestedList({ id }) {
  const [open, setOpen] = useState("");
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}orders`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const someData = data.filter((orders) => {
          return orders.restaurantId == id;
        });
        setOrderData(someData);
      });
  }, []);

  console.log(orderData);

  const handleClick = (e) => {
    if (e === open) {
      setOpen("");
    } else {
      setOpen(e);
    }
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {orderData.map((item) => (
        <div style={{ padding: "5px" }}>
          <ListItemButton
            style={{ border: "solid", minWidth: "400px" }}
            onClick={() => handleClick(item.orderNumber)}
          >
            <ListItemText primary={item.orderNumber} />
            {open === item.orderNumber ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {item.items.map((itm) => (
            <Collapse
              in={item.orderNumber === open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={itm.name} />
                  <Button>-</Button>
                  <Typography>0</Typography>
                  <Button>+</Button>
                </ListItem>
              </List>
            </Collapse>
          ))}
          <Collapse in={item.orderNumber === open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ p: 2, border: "solid", borderColor: "gray" }}>
                <Typography marginTop="25px" marginRight="10px">
                  Status:
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="status-label"
                    defaultValue="pending"
                    name="radio-buttons-group"
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
    </List>
  );
}
