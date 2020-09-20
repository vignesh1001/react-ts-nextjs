import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import ContactBasics from "./ContactBasics";
import EmploymentDetails from "./EmploymentDetails";
import TechnicalProfile from "./TechnicalProfile";
import PreviewCandidate from "./PreviewCandidate";
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
function AddCandidateForm(props) {
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
                <PreviewCandidate
                  {...props}
                  formikProps={formikProps}
                  onEdit={togglePreviewMode}
                />
              ) : (
                <React.Fragment>
                  <ContactBasics {...props} formikProps={formikProps} />
                  <EmploymentDetails {...props} formikProps={formikProps} />
                  <TechnicalProfile {...props} formikProps={formikProps} />
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
                    Save Candidate
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
                  {state.isPreview ? "Submit Candidate" : "Preview Candidate"}
                </Button>
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
