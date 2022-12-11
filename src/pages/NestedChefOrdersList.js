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
import { useState } from "react";

// Temporary Data
const data = [
  {
    orderNumber: "56545",
    items: [{ name: "burger" }, { name: "mojito" }],
  },
  {
    orderNumber: "53445",
    items: [{ name: "lemonade" }, { name: "french fries" }],
  },
  {
    orderNumber: "544445",
    items: [{ name: "potato skins" }, { name: "small beer" }],
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
      sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data.map((item) => (
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
