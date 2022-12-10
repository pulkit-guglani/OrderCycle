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

// Temporary Data
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

// Temporary Data Ends here

export default function NestedList() {
  const [open, setOpen] = useState("");

  const handleClick = (e) => {
    if (e === open) {
      setOpen("");
    } else {
      setOpen(e);
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
      }>
      {data.map((item) => (
        <>
          <ListItemButton onClick={() => handleClick(item.category)}>
            <ListItemText primary={item.category} />
            {open === item.category ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {item.items.map((itm) => (
            <Collapse in={item.category === open} timeout="auto" unmountOnExit>
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
        </>
      ))}
    </List>
  );
}
