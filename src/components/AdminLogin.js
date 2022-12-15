import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DropDownBox from "./DropdownBox";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router";

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
  const [value, setValue] = useState("");
  const passRef = useRef();
  const navigate = useNavigate();
  const getData = async () => {
    const res = await fetch(`${process.env.REACT_APP_URL}/auth`);
    const data = await res.json();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState([]);
  const authHandler = () => {
    const password = passRef.current.value;
    const currentPasswords = data.filter((item) => item.id == id);
    const chef = currentPasswords[0].chef;
    const operator = currentPasswords[0].operator;

    if (value == "chef") {
      goToChef(chef, password);
    } else {
      goToOperator(operator, password);
    }
  };

  const goToChef = (chef, password) => {
    if (chef === password) {
      navigate(`/chefPage/${id}`);
    }
  };
  const goToOperator = (operator, password) => {
    if (operator === password) {
      navigate(`/OperatorPage/${id}`);
    }
  };
  return (
    <Box style={style}>
      <Typography id="modal-modal-title" variant="h6" component="h5">
        Admin Login
      </Typography>
      <DropDownBox
        data={["Chef", "Operator"]}
        label="Chef/Operator"
        value={value}
        setValue={setValue}
      />
      <TextField
        label="Password"
        type={"password"}
        sx={{ width: "300px" }}
        inputRef={passRef}></TextField>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={authHandler}>
        Submit
      </Button>
    </Box>
  );
}
