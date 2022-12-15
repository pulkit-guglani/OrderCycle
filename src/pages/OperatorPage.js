import { Box, Button, Grid, Modal, styled, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/operatorPage.css";
import { useEffect, useState } from "react";
import ItemsModal from "./ItemsModal";
import QR from "../static/QR.png";
import { useParams } from "react-router-dom";
import {
  getData,
  mapToJSON,
  setData as setServerData,
} from "../components/functions";

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

const CustomModal = styled(Box)`
  padding: 20px;
  border: 1px solid;
  background: white;
  width: 100%;
  max-width: 20vw;
  height: 100%;
  max-height: 20vh;
  text-align: center;
`;

const OperatorPage = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const handleClickOpen = () => setOpen(true);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  let map = new Map();
  const [qty, setQty] = useState(map);
  const { id } = useParams();

  const SubmitData = async () => {
    const data = await getData(`orders?restaurantId=${id}`);

    const json = mapToJSON(qty);
    let order = {};
    order.orderId = "43";
    order.orderStatus = "pending";
    order.orderItems = json;
    data[0].orders.push(order);
    console.log(data[0]);
    const result = await setServerData(`orders?restaurantId=${id}`, data[0]);
    console.log(result);
  };

  const outdatedGetData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/menu?restaurantId=${id}`
      );
      const data = await res.json();
      setData(data[0].menuitems);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    outdatedGetData();
  }, []);
  return (
    <Box>
      <Grid container>
        <Grid item xs={9} md={9} style={OrderSummaryWrapper}>
          <h1>Generate New Order</h1>
          <Button variant="contained" onClick={handleClickOpen}>
            Select Items
          </Button>
          <ItemsModal
            qty={qty}
            setQty={setQty}
            open={open}
            setOpen={setOpen}
            data={data}
          />
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
            <Button variant="contained" fullWidth onClick={SubmitData}>
              Submit Order
            </Button>
          </OrderSummary>
        </Grid>
        {/* order modal  */}
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomModal>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Your Order Number Is: 123
            </Typography>
            <Typography>Scan QR code to track status online</Typography>
            <img src={QR} alt="qr" width={"65vw"} />
          </CustomModal>
        </Modal>
        {/* Order Status Sidebar */}
        <Grid
          item
          xs={3}
          md={3}
          height={"90vh"}
          style={{ borderLeft: "1px solid black" }}
        >
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
                        }}
                      >
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
