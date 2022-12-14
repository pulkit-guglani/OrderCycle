import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = ["Option 1", "Option 2"];

export default function Test() {
  const updateData = async (orderId) => {
    let item = { orderStatus: "Ready" };
    fetch("http://localhost:3001/orders/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json(item))
      .then((result) => {});
  };

  return (
    <button
      onClick={() => {
        updateData(2);
      }}
    >
      Update data
    </button>
  );
}
