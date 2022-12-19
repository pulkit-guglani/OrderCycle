import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

export default function NestedList({ data, qty, setQty }) {
  const [open, setOpen] = useState("");

  const handleClick = (e) => {
    if (e === open) {
      setOpen("");
    } else {
      setOpen(e);
    }
  };
  const incrementHandler = (name) => {
    if (qty.has(name)) {
      var val = qty.get(name);
      const newQuantity = new Map([...qty]);
      newQuantity.set(name, val + 1);
      setQty(newQuantity);
    } else {
      const newQuantity = new Map([...qty]);
      newQuantity.set(name, 1);
      setQty(newQuantity);
    }
  };
  const decrementHandler = (name) => {
    if (qty.has(name)) {
      var val = qty.get(name);
      if (val > 0) {
        const newQuantity = new Map([...qty]);
        newQuantity.set(name, val - 1);
        setQty(newQuantity);
      } else if (val === 0) {
        const newQuantity = new Map([...qty]);
        newQuantity.delete(name);
        setQty(newQuantity);
      }
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Select Category
        </ListSubheader>
      }
    >
      {data.map((item) => (
        <>
          <ListItemButton onClick={() => handleClick(item.category)}>
            <ListItemText primary={item.category} />
            {open === item.category ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {item.items.map((itm) => {
            return (
              <Collapse
                in={item.category === open}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemText
                      primary={itm.name}
                      secondary={`₹ ${itm.price}`}
                    />
                    <Button
                      sx={{ fontSize: "1.5em" }}
                      onClick={() => {
                        decrementHandler(itm.name);
                      }}
                    >
                      -
                    </Button>
                    <Typography>
                      {qty.has(itm.name) ? qty.get(itm.name) : "0"}
                    </Typography>
                    <Button
                      sx={{ fontSize: "1.5em" }}
                      onClick={() => {
                        incrementHandler(itm.name);
                      }}
                    >
                      +
                    </Button>
                  </ListItem>
                </List>
              </Collapse>
            );
          })}
        </>
      ))}
    </List>
  );
}
