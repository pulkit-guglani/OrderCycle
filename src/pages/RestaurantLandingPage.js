import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router";
import * as yup from "yup";
import AdminLogin from "../components/AdminLogin";
import { useNavigate } from "react-router";
import { getData } from "../components/functions";

const RestaurantLandingPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { resId } = useParams();
  const Navigate = useNavigate();

  const validationSchema = yup.object({
    orderId: yup
      .string("Enter your Order ID")
      .required("Order ID Required")
      .max(5, "Order ID cannot exceed 5 digits"),
  });

  const checkOrderStatus = async (orderId, restaurantId) => {
    if (orderId) Navigate(`/order/${restaurantId}/${orderId}`);
    else {
      alert("Enter correct id");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const formik = useFormik({
    initialValues: {
      orderId: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ orderId }) => {
      if (orderId !== "") {
        checkOrderStatus(orderId, resId);
      }
    },
  });

  return (
    <Box
      style={{
        width: "fit-content",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <AdminLogin id={resId} />
        </Box>
      </Modal>
      <Typography variant="h5">Enter Order ID</Typography>
      <br></br>
      <form
        autoComplete="off"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="orderId"
          name="orderId"
          label="Order ID"
          value={formik.values.orderId}
          onChange={formik.handleChange}
          error={formik.touched.orderId && Boolean(formik.errors.orderId)}
          helperText={formik.touched.orderId && formik.errors.orderId}
        />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>

        <Button
          style={{ float: "right", marginTop: "100px" }}
          variant="text"
          onClick={() => handleOpen()}
        >
          Admin Login
        </Button>
      </form>
    </Box>
  );
};

export default RestaurantLandingPage;
