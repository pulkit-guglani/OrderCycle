import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import NestedList from "./NestedMenuItemsList";
import { getData } from "../components/functions";
import { useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ItemsModal({
  open,
  setOpen,
  data,
  qty,
  setQty,
  updateCurrentOrderObject,
}) {
  const { id } = useParams();
  const handleSubmit = async () => {
    const data = await getData(`orders?restaurantId=${id}`);
    updateCurrentOrderObject();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Select Items
            </Typography>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              autoFocus
              color="inherit"
              variant="outlined"
              onClick={handleSubmit}>
              Confirm
            </Button>
          </Toolbar>
        </AppBar>
        {/* list here  */}
        <NestedList data={data} qty={qty} setQty={setQty} />
      </Dialog>
    </div>
  );
}
