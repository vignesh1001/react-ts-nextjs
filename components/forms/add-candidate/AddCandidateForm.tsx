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
  employeementType: "Normal",
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
  education: [],
  certifications: [],
  hasReferences: false,
  candidate_resume: [],
  referanceFullName: "",
  referancePosition: "",
  referancePhone: "",
  referanceRelation: "",
  notify: "",
  recrutingManager: "",
  submitToRequirement: "",
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
    .required("Immigration Status is required"),
});
function AddCandidateForm(props) {
  const [state, setState] = React.useState({ isPreview: false });
  const togglePreviewMode = () =>
    setState({ ...state, isPreview: !state.isPreview });
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(e) => {
        togglePreviewMode();
        props.dispatch(addCandidateSave(e));
      }}
    >
      {(formikProps) => {
        return (
          <form>
            <Grid
              container
              spacing={1}
              style={{
                backgroundColor: "#FFF",
                padding: "30px 90px 30px 40px",
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
                <Button
                  variant="contained"
                  style={{
                    width: 174,
                    height: 36,
                    borderRadius: 4,
                    fontSize: 14,
                    color: "#FFF",
                    backgroundColor: "#234071",
                  }}
                >
                  Save Candidate
                </Button>
                <Button
                  variant="contained"
                  disabled={!formikProps.isValid}
                  onClick={formikProps.handleSubmit}
                  style={{
                    width: 185,
                    height: 36,
                    borderRadius: 4,
                    fontSize: 14,
                    marginLeft: 10,
                    color: "#FFF",
                    backgroundColor: !formikProps.isValid
                      ? "#f4a0cb"
                      : "#e32686",
                  }}
                >
                  Submit Candidate
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
  dispatch: PropTypes.func.isRequired,
};

export default AddCandidateForm;
