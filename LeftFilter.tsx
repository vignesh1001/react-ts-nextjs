import React from "react";
import Button from "@material-ui/core/Button";

import { DialogActions, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const validationSchema = yup.object({
  name: yup.string("Enter a name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string("Enter your password")
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Password does not match"),
});
const LeftFilter = yup.object({
  name: yup.string("Enter a name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string("Enter your password")
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Password does not match"),
});

CreateCandidateForm.defaultProps = {
  handleClose: () => {},
};

export default function CreateCandidateForm(props) {
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}>
      {(formikProps) => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
            }}
          >
            Bala start Work
          </form>
        );
      }}
    </Formik>
  );
}

LeftFilter.propTypes = {
  handleClose: PropTypes.func.isRequired,
};