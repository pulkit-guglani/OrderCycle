import { Button } from "@mui/material";
import React from "react";
import ComboBox from "../components/DropdownBox";

const Restaurant = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20vh",
      }}>
      <ComboBox
        data={["1", "2", "3", "32"]}
        width={400}
        label="Select Restaurant"
      />
      <Button variant="contained" style={{ marginTop: "10px" }}>
        Submit
      </Button>
    </div>
  );
};

export default Restaurant;
