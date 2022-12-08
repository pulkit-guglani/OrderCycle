import { Button, styled, Typography } from "@mui/material";
import React from "react";
import ComboBox from "./DropdownBox";

//Styled Components

const Text = styled(Typography)`
  margin-top: 10px;
  color: #e58200;
  cursor: pointer;
`;

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
      <Text>Admin Login</Text>
    </div>
  );
};

export default Restaurant;
