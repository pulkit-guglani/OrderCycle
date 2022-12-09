import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ComboBox from "./DropdownBox";
import { Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "30px",
  borderRadius: "20px",
  gap: "30px",
  alignItems: "center",
};

export default function AdminLogin() {
  return (
    <Box style={style}>
      <Typography id="modal-modal-title" variant="h6" component="h5">
        Admin Login
      </Typography>
      <ComboBox data={["Chef", "Operator"]} label="Chef/Operator" />
      <TextField label="Password" type={"password"}></TextField>
      <Button color="primary" variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
}
