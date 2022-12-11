import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DropDownBox from "../components/DropdownBox";

const Restaurant = () => {
  const getData = async () => {
    const res = await fetch(`${process.env.REACT_APP_URL}`);
    const data = await res.json();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
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
      <DropDownBox
        data={data}
        width={400}
        label="Select Restaurant"
        value={value}
        setValue={setValue}
      />
      <Button variant="contained" style={{ marginTop: "10px" }}>
        Submit
      </Button>
    </div>
  );
};

export default Restaurant;
