import React from "react";
import { Grid, FormHelperText } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import ContactBasics from "./ContactBasics";
import EmploymentDetails from "./EmploymentDetails";

const initialValues = {
  fullName: "",
  emailAddress: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  immigrationStatus: "",
  SSN: "",
  dob: "",
  employeementType: "",
  empWorkType: "Hourly",
  rate: "",
  availability: "",
  securityClearance: "",
  travelPreferences: "",
  openToRelocate: ""
};

const validationSchema = yup.object({
  fullName: yup.string("Enter a full name").required("Name is required"),
  emailAddress: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string("")
    .min(12, "Phone must contain at least 12 characters")
    .required("Enter your Phone"),
  city: yup.string("Enter your city").required("City is required"),
  state: yup.string("Enter your state").required("State is required"),
  zip: yup.string("Enter your zip").required("Zip is required"),
  country: yup.string("Enter your country").required("Country is required"),
  immigrationStatus: yup
    .string("Enter your Immigration Status")
    .required("Immigration Status is required")
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
            <Grid container spacing={1}>
              <ContactBasics {...props} />
              <EmploymentDetails {...props} />
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
