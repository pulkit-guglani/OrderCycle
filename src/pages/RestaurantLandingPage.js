import {
  Button,
  FormControl,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form, useFormik } from "formik";
import * as yup from "yup";

const RestaurantLandingPage = ({ restaurantName }) => {
  const validationSchema = yup.object({
    orderID: yup.string("Enter your email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      orderID: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box>
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
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default RestaurantLandingPage;
