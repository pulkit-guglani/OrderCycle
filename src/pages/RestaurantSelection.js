import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DropDownBox from "../components/DropdownBox";
import { useNavigate } from "react-router-dom";

const Restaurant = () => {
  const navigate = useNavigate();
  const getData = async () => {
    const res = await fetch(`${process.env.REACT_APP_URL}/restaurants`);
    const data = await res.json();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const submitHandler = () => {
    if (value.id === "") {
      alert("Restaurant select karle pehle!!!");
    } else {
      navigate(`/restaurantLandingPage/${value.id}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20vh",
      }}
    >
      <Typography variant="h5" sx={{ mb: 5, fontWeight: "bold" }}>
        Select Restaurant
      </Typography>
      <DropDownBox
        data={data}
        width={400}
        label="Select Restaurant"
        value={value}
        setValue={setValue}
      />
      <Button
        variant="contained"
        style={{ marginTop: "10px" }}
        onClick={() => submitHandler()}
      >
        Submit
      </Button>
    </div>
  );
};

export default Restaurant;
