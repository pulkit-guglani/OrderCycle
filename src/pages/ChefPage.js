import { Box, Typography } from "@mui/material";
import NestedChefOrdersList from "./NestedChefOrdersList";

export default function ChefPage() {
  return (
    <Box
      style={{
        width: "fit-content",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <Typography>Current Orders</Typography>
      <NestedChefOrdersList />
    </Box>
  );
}
