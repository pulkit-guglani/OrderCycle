import {
  Button,
  FormControl,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import AdminLogin from "../components/AdminLogin";

const RestaurantLandingPage = ({ restaurantName }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = yup.object({
    orderId: yup.string("Enter your email").required("Order ID Required"),
  });

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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
          <AdminLogin />
        </Box>
      </Modal>
      <Typography>Enter Order ID</Typography>
      <br></br>
      <form
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
          onClick={handleOpen}
        >
          Admin Login
        </Button>
      </form>
    </Box>
  );
};

export default RestaurantLandingPage;
