import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DropDownBox from "./DropdownBox";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router";
import CustomizedSnackbars from "./SnackBar";

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

export default function AdminLogin({ id }) {
  const [adminType, setAdminType] = useState("");
  const [isAuthenticating, setIsAuthenticating] =useState(false)
  const passRef = useRef();
  const navigate = useNavigate();

  const authenticate = async () => {
    console.log(adminType);
    const res = await fetch(
      `${process.env.REACT_APP_URL}/authenticate/${id}/${adminType.name}/${passRef.current.value}`
    );
    const jsonData = await res.json();
    console.log(jsonData);
    return jsonData.result;
  };

  const authHandler = async () => {
    setIsAuthenticating(true)
    const isAuthenticated = await authenticate();
    console.log(isAuthenticated);
    if (adminType.name == "Chef" && isAuthenticated) {
      goToChef();
    } else if (adminType.name == "Operator" && isAuthenticated) {
      goToOperator();
    }
    if(!isAuthenticated){
      
    }
    setIsAuthenticating(false)
  };
  const goToChef = () => {
    console.log("In Chef");
    navigate(`/chefPage/${id}`);
    const date = new Date();
    const exp = date.setHours(24, 0, 0, 0);
    document.cookie = `ordercycle.in=Chef${id}; SameSite=None; Secure; expires = ${exp}`;
  };
  const goToOperator = () => {
    navigate(`/OperatorPage/${id}`);
    const date = new Date();
    const exp = date.setHours(24, 0, 0, 0);
    document.cookie = `ordercycle.in=Operator${id}; SameSite=None; Secure;expires = ${exp}`;
  };
  return (
    <>
    <Box style={style}>
      <Typography id="modal-modal-title" variant="h5" component="h5">
        Admin Login
      </Typography>
      <DropDownBox
        data={[{ name: "Chef" }, { name: "Operator" }]}
        label="Chef/Operator"
        value={adminType}
        setValue={setAdminType}
      />
      <TextField
        label="Password"
        type={"password"}
        sx={{ width: "300px" }}
        inputRef={passRef}
      ></TextField>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        disabled = {isAuthenticating}
        onClick={authHandler}
      >
        Submit
      </Button>
    </Box>
      <CustomizedSnackbars/>
      </>
  );
}
