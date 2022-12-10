import { Box, Button, Grid, styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/operatorPage.css";
import { useState } from "react";
import ItemsModal from "./ItemsModal";

// Temporary data
function createData(order, qr, status) {
  return { order, qr, status };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0),
  {
    order: 1245,
    qr: "NA",
    status: "Ready",
  },
];

const billsummary = [
  {
    item: "Pastry",
    qty: 2,
    bill: 100,
  },
  { item: "Soft Drink", qty: 2, bill: 400 },
  {
    item: "Pastry",
    qty: 2,
    bill: 100,
  },
  {
    item: "Pastry",
    qty: 2,
    bill: 100,
  },
];
// Temporary data ends

// Styled Components
const OrderSummary = styled(Box)`
  border: 1px solid;
  border-radius: 10px;
  width: 40%;
  padding: 20px;
  height: 45vh;
`;

const OrderSummaryWrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
};

const OperatorPage = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Box>
      <Grid container>
        <Grid item xs={9} md={9} style={OrderSummaryWrapper}>
          <h1>Generate New Order</h1>
          <Button variant="contained" onClick={handleClickOpen}>
            Select Items
          </Button>
          <ItemsModal open={open} setOpen={setOpen} />
          <OrderSummary>
            <h2>Order Summary:</h2>
            <TableContainer className="t1">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Items</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Bill</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billsummary.map((data) => (
                    <TableRow>
                      <TableCell align="left">{data.item}</TableCell>
                      <TableCell>{data.qty}</TableCell>
                      <TableCell>{data.bill}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell>1000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" fullWidth>
              Submit Order
            </Button>
          </OrderSummary>
        </Grid>
        {/* Order Status Sidebar */}
        <Grid
          item
          xs={3}
          md={3}
          height={"90vh"}
          style={{ borderLeft: "1px solid black" }}>
          <Box>
            <h2>Order Status</h2>
            <Box>
              <TableContainer component={Paper}>
                <Table aria-label="order table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      {/* For QR Code */}
                      {/* <TableCell align="right">QR</TableCell>  */}
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.order}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}>
                        <TableCell component="th" scope="row">
                          {row.order}
                        </TableCell>
                        {/* For QR Code */}
                        {/* <TableCell align="right">{row.qr}</TableCell> */}
                        <TableCell align="right">{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OperatorPage;
