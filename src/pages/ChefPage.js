import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import NestedChefOrdersList from "./NestedChefOrdersList";

export default function ChefPage() {
  const { id } = useParams();

  return (
    <Box
      style={{
        width: "fit-content",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Current Orders
      </Typography>
      <NestedChefOrdersList id={id} />
    </Box>
  );
}
