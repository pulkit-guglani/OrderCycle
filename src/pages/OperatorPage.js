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
// import QR from "../static/QR.png";
import { useParams } from "react-router-dom";
import {
  addData,
  getData,
  mapToJSON,
  setData as setServerData,
} from "../components/functions";
import {
  sendOrderAddedTrigger,
  subscribeToNewOrders,
} from "../sockets/socketsHandler";

// Styled Components
const OrderSummary = styled(Box)`
  border: 1px solid;
  border-radius: 10px;
  width: 40%;
  padding: 20px;
  height: 53vh;
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
  const [openMenuItemsList, setOpenMenuItemsList] = useState(false);
  const [openOrderConfirmationModal, setOpenOrderConfirmationModal] =
    useState(false);
  const [menuData, setMenuData] = useState([]);
  const [restaurantOrderData, setRestaurantOrderData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentOrder, setCurrentOrder] = useState();
  const [currentOrderNumber, setCurrentOrderNumber] = useState(0);
  const openMenuList = () => setOpenMenuItemsList(true);
  const closeOrderConfirmationModal = () =>
    setOpenOrderConfirmationModal(false);

  const [orderData, setOrderData] = useState(new Map());
  const { resId } = useParams();

  const submitOrderData = async () => {
    await addData(`orders/${resId}`, currentOrder);
    await getLatestOrderNumber();

    updateLocalOrders();
    setOpenOrderConfirmationModal(true);
  };

  const updateCurrentOrderObject = async () => {
    const orderJson = mapToJSON(orderData);
    setTotalAmount(0);
    orderJson.map((orderItem) => {
      menuData.forEach((category) => {
        const menuItem = category.items.find(
          (item) => item.name == orderItem.name
        );
        if (menuItem) {
          setTotalAmount(
            (totalAmount) => totalAmount + menuItem.price * orderItem.qty
          );
          orderItem.price = menuItem.price * orderItem.qty;
        }
      });
    });

    let order = {};
    order.orderId = currentOrderNumber;
    order.orderStatus = "pending";
    order.orderItems = orderJson;
    // update each order item and add price for each item
    setCurrentOrder(order);
  };

  const getMenuData = async () => {
    try {
      const data = await getData(`getMenu/${resId}`);
      setMenuData(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getLatestOrderNumber = async () => {
    const orderNumber = await getData(`latestOrderNumber/${resId}`);
    setCurrentOrderNumber(orderNumber);
  };

  const getOrderData = async () => {
    const res = await getData(`orders/${resId}`);
    console.log(res);
    setRestaurantOrderData(res);
  };
  const updateLocalOrders = () => {
    sendOrderAddedTrigger();
    setTimeout(() => getOrderData(), 2000);
    setCurrentOrder("");
    setTotalAmount(0);
  };
  useEffect(() => {
    getMenuData();
    getOrderData();
    subscribeToNewOrders(getOrderData);
  }, []);
  return (
    <Box>
      <Grid container>
        <Grid item xs={9} md={9} style={OrderSummaryWrapper}>
          <h1>Generate New Order</h1>
          <Button variant="contained" onClick={openMenuList}>
            Select Items
          </Button>
          <ItemsModal
            qty={orderData}
            setQty={setOrderData}
            open={openMenuItemsList}
            setOpen={setOpenMenuItemsList}
            data={menuData}
            updateCurrentOrderObject={updateCurrentOrderObject}
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
                  {currentOrder?.orderItems?.map((data) => (
                    <TableRow>
                      <TableCell align="left">{data.name}</TableCell>
                      <TableCell>{data.qty}</TableCell>
                      <TableCell>{data.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer fullWidth>
              <TableBody>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{totalAmount ? totalAmount : "00"}</TableCell>
                </TableRow>
              </TableBody>
            </TableContainer>
            <Button variant="contained" fullWidth onClick={submitOrderData}>
              Submit Order
            </Button>
          </OrderSummary>
        </Grid>
        {/* order modal  */}
        <Modal
          open={openOrderConfirmationModal}
          onClose={closeOrderConfirmationModal}
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
              Your Order Number Is: {currentOrderNumber}
            </Typography>
            <Typography>Scan QR code to track status online</Typography>
            {console.log(`${process.env.REACT_APP_QR_API_URL}$
            {process.env.REACT_APP_URL}/order/${resId}/${currentOrderNumber}`)}
            <img
              src={`${process.env.REACT_APP_QR_API_URL}${process.env.REACT_APP_URL}/getOrderWithId/${resId}/${currentOrderNumber}`}
              alt="qr"
              width={"65vw"}
            />
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
                      <TableCell align="center">QR</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {restaurantOrderData.orders?.map((row) => (
                      <TableRow
                        // key={row.orderID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ fontWeight: "bold" }}
                        >
                          {row.id}
                        </TableCell>
                        {/* For QR Code */}
                        <TableCell align="center">
                          <img
                            src={`${process.env.REACT_APP_QR_API_URL}${process.env.REACT_APP_URL}/getOrderWithId/${resId}/${row.id}`}
                            alt="qr"
                            width={"65vw"}
                          />
                        </TableCell>
                        <TableCell align="right">{row.orderStatus}</TableCell>
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
