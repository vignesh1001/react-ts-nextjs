import React from "react";
import { Grid, FormHelperText } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import Textfield from "../formfields/Textfield";
import PropTypes from "prop-types";

const initialValues = {
  fullName: "",
  emailAddress: "",
  phone: ""
};

const validationSchema = yup.object({
  fullName: yup.string("Enter a name").required("Name is required"),
  emailAddress: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string("")
    .min(12, "Phone must contain at least 12 characters")
    .required("Enter your Phone")
});

const styles = {
  textField: {
    color: "#4a4a4a",
    width: "100%",
    height: 24,
    lineHeight: 1.5,
    borderRadius: 6,
    fontSize: 16,
    border: "2px solid #195091"
  },
  helperText: {
    color: "#195091",
    fontSize: 12,
    paddingLeft: 10,
    marginTop: -3
  },
  headerStyle: {
    color: "#374c97",
    marginBottom: 0
  }
};
function AddCandidateForm(props) {
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}>
      {formikProps => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <Grid container spacing={3}>
              <Grid container>
                <Grid
                  item
                  lg={12}
                  style={{ paddingBottom: 0, paddingLeft: 20 }}
                >
                  <h3 style={styles.headerStyle}>Candidate Basics</h3>
                </Grid>
              </Grid>
              <Grid item lg={4}>
                <Textfield
                  name="fullName"
                  id="fullName"
                  variant="outlined"
                  displayLabel="First Name"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item lg={4}>
                <Textfield
                  name="emailAddress"
                  id="emailAddress"
                  variant="outlined"
                  displayLabel="Emaill Address"
                />
              </Grid>
              <Grid item lg={4}>
                <Textfield
                  name="phone"
                  id="phone"
                  variant="outlined"
                  displayLabel="Phone Number"
                />
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

AddCandidateForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default AddCandidateForm;
