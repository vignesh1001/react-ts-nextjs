import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import BasicDetails from "./BasicDetails";
import EmploymentCompenDetails from "./EmploymentCompenDetails";
import PositionDetails from "./PositionDetails";
import InternalDetails from "./InternalDetails";
import PreviewJobListing from "./PreviewJobListing";
import { addCandidateSave } from "../../../actions";

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
  employmentType: "Corp-to-Corp",
  annualBaseSalary: "",
  annualBonusPct: "",
  empBenefits: "",
  empWorkType: "Hourly",
  rate: "",
  availability: "",
  securityClearance: "",
  travelPreferences: "",
  openToRelocate: "",
  positionTitle: "",
  professionalExperience: "",
  primarySkills: "",
  otherSkills: "",
  additionalNotes: "",
  yearOfCompletion: "",
  educations: [],
  certifications: [],
  references: [],
  candidate_resume: [],
  salesLead: "",
  recruittingLead: "",
  submitToRequirement: ""
};

const validationSchema = yup.object({
  fullName: yup.string("Enter a full name").required("Name is required"),
  emailAddress: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string("")
    .min(10, "Phone must contain at least 10 characters")
    .required("Enter your Phone"),
  city: yup.string("Enter your City").required("City is required"),
  state: yup.string("Enter your State").required("State is required"),
  zip: yup.string("Enter your zip").required("Zip is required"),
  country: yup.string("Enter your country").required("Country is required"),
  immigrationStatus: yup
    .string("Enter your Immigration Status")
    .required("Immigration Status is required"),
  rate: yup.string("Enter rate").required("Rate is required"),
  availability: yup
    .string("Enter Availability")
    .required("Availability is required"),
  positionTitle: yup
    .string("Enter your Position Title")
    .required("Position Title is required"),
  professionalExperience: yup
    .string("Enter Professional Experience")
    .required("Professional Experience is required"),
  primarySkills: yup
    .string("Enter Primary Skills")
    .required("Primary Skills is required")
});
function AddJobListingForm(props) {
  const [state, setState] = React.useState({ isPreview: false });
  const togglePreviewMode = () =>
    setState({ ...state, isPreview: !state.isPreview });
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={e => {
        if (!state.isPreview) {
          togglePreviewMode();
          props.dispatch(addCandidateSave(e));
        } else {
          alert("Handle Submit!");
        }
      }}
    >
      {formikProps => {
        return (
          <form>
            <Grid
              container
              spacing={1}
              style={{
                backgroundColor: "#FFF",
                padding: "30px 90px 30px 40px"
              }}
            >
              {state.isPreview ? (
                <PreviewJobListing
                  {...props}
                  formikProps={formikProps}
                  onEdit={togglePreviewMode}
                />
              ) : (
                <React.Fragment>
                  <BasicDetails {...props} formikProps={formikProps} />
                  <EmploymentCompenDetails
                    {...props}
                    formikProps={formikProps}
                  />
                  <PositionDetails {...props} formikProps={formikProps} />
                  <InternalDetails {...props} formikProps={formikProps} />
                </React.Fragment>
              )}
              <Grid item xs={12} sm={12} style={{ paddingTop: 6 }}>
                {state.isPreview && (
                  <Button
                    variant="contained"
                    style={{
                      width: 174,
                      height: 36,
                      borderRadius: 4,
                      fontSize: 14,
                      color: "#FFF",
                      backgroundColor: "#234071"
                    }}
                  >
                    Save Draft
                  </Button>
                )}
                <Button
                  variant="contained"
                  disabled={!formikProps.isValid}
                  onClick={formikProps.handleSubmit}
                  style={{
                    width: 190,
                    height: 36,
                    borderRadius: 4,
                    fontSize: 14,
                    color: "#FFF",
                    backgroundColor: !formikProps.isValid
                      ? "#f4a0cb"
                      : "#e32686"
                  }}
                >
                  {state.isPreview ? "Publish" : "Next"}
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

AddJobListingForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default AddJobListingForm;
