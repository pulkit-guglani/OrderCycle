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
  const openMenuList = () => setOpenMenuItemsList(true);
  const closeOrderConfirmationModal = () =>
    setOpenOrderConfirmationModal(false);

  const [orderData, setOrderData] = useState(new Map());
  const { id } = useParams();

  const submitOrderData = async () => {
    const restaurantOrdersData = await getData(`orders/${id}`);
    restaurantOrdersData.orders.push(currentOrder);
    setServerData(`orders/${id}`, restaurantOrdersData);
    updateLatestOrderNumber();
    updateLocalOrders();
    setOpenOrderConfirmationModal(true);
  };

  const updateCurrentOrderObject = async () => {
    const orderJson = mapToJSON(orderData);
    const orderNumber = await getLatestOrderNumber();
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

    order.orderId = orderNumber;
    order.orderStatus = "pending";
    order.orderItems = orderJson;
    // update each order item and add price for each item
    setCurrentOrder(order);
  };

  const getMenuData = async () => {
    try {
      const data = await getData(`menu/${id}`);
      setMenuData(data.menuitems);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getLatestOrderNumber = async () => {
    const response = await getData(`miscellaneousData/${id}`);
    // console.log(response);
    return response.latestOrderNumber;
  };
  const updateLatestOrderNumber = async () => {
    const orderNumber = await getLatestOrderNumber();

    const latestOrderNumberObject = {
      id: { id },
      latestOrderNumber: orderNumber + 1,
    };
    console.log(latestOrderNumberObject);
    setServerData(`miscellaneousData/${id}`, latestOrderNumberObject);
  };
  const getOrderData = async () => {
    const res = await getData(`orders/${id}`);
    // console.log(res);
    setRestaurantOrderData(res);
  };
  const updateLocalOrders = () => {
    setTimeout(() => getOrderData(), 5000);
    setCurrentOrder("");
    setTotalAmount(0);
  };
  useEffect(() => {
    getMenuData();
    getOrderData();
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
          }}>
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
                    {restaurantOrderData.orders?.map((row) => (
                      <TableRow
                        // key={row.orderID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ fontWeight: "bold" }}>
                          {row.orderId}
                        </TableCell>
                        {/* For QR Code */}
                        {/* <TableCell align="right">{row.qr}</TableCell> */}
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
