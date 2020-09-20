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
import { saveJobListing, clearAll } from "../../../actions";
import Loader from "../../Loader";
import { internalContacts } from "../../../constants/internalContacts";

const recruitersList = internalContacts.map((i) => ({
  title: i.Name,
  value: i.Name,
  email: i.Email,
}));
const validationSchema = yup.object({
  noOfPosition: yup
    .string("Enter a No.Of.Position")
    .required("No.Of.Position is required"),
  priority: yup.string("").required("Priority is required"),
  clientName: yup.string("").required("Client Name is required"),
  clientContact: yup.string("").required("Client Contact is required"),
  city: yup.string("Enter your City").required("City is required"),
  state: yup.string("Enter your State").required("State is required"),
  zip: yup.string("Enter your zip").required("Zip is required"),
  country: yup.string("Enter your country").required("Country is required"),
  duration: yup.string("").required("Duration is required"),
  clientBillRate: yup.string("").required("Client Bill Rate is required"),
  payRate: yup.string("").required("Pay Rate is required"),
  securityClearanceLevel: yup
    .string("")
    .required("Security Clearance Level is required"),
  internalContact: yup.string("").required("Internal Contact is required"),
  workAuthorizationStatus: yup
    .string("")
    .required("Work Authorization Status is required"),
  coordinator: yup.string("").required("co-ordinator is required"),
  recruitingLead: yup.string("").required("Recruiting Lead is required"),
  requirementDescription: yup
    .string("")
    .required("Requirement Description is required"),
  positionTitle: yup
    .string("Enter your Position Title")
    .required("Position Title is required"),
  skills: yup.string("Enter Skills").required("Skills is required"),
});
let tempFormikProps;
function AddJobListingForm(props) {
  const [state, setState] = React.useState({
    isPreview: false,
    isShowLoader: false,
    initialValues: {
      requisitionNumber: null,
      noOfPosition: "",
      priority: "",
      clientName: "",
      clientContact: "",
      location: "onsite",
      country: "",
      state: "",
      city: "",
      zip: "",
      employeementType: "fulltime",
      duration: "",
      rateBy: "hourly",
      clientBillRate: "",
      payRate: "",
      positionTitle: "",
      skills: "",
      requirementDescription: "",
      workAuthorizationStatus: "",
      securityClearanceLevel: "",
      internalContact: "",
      coordinator: "",
      recruitingLead: "",
      salesLead: "",
      recruiter: "",
      recruiters: [],
      jobListingBoard: [],
      recruitingLeadsEmail: "",
      salesLeadsEmail: "",
      action: "ADD",
    },
  });
  const togglePreviewMode = () =>
    setState({
      ...state,
      isPreview: !state.isPreview,
      isShowJobListingError: false,
      isShowLoader: false,
    });
  const toggleLoader = () =>
    setState((prevState) => ({
      ...prevState,
      isShowLoader: !prevState.isShowLoader,
    }));
  const handleSave = () => {
    const errorList = Object.values(tempFormikProps.errors);
    if (errorList && errorList.length) {
      alert(
        errorList.join("\n") +
          "\n        Please Click Edit to fill the above mandatory fields"
      );
    } else {
      tempFormikProps.handleSubmit();
    }
  };
  React.useEffect(() => {
    const selectedJobListing = localStorage.getItem("setSelectedJobListing");
    localStorage.removeItem("setSelectedJobListing");
    if (selectedJobListing) {
      togglePreviewMode();
      toggleLoader();
      setTimeout(() => {
        const item = JSON.parse(selectedJobListing);
        tempFormikProps.setFieldValue(
          "positionTitle",
          item.positionDetails.positionTitle
        );
        tempFormikProps.setFieldValue(
          "requisitionNumber",
          item.requisitionNumber
        );
        tempFormikProps.setFieldValue("noOfPosition", item.numberOfPositions);
        tempFormikProps.setFieldValue("priority", item.priority);
        tempFormikProps.setFieldValue("clientName", item.clientInfo.clientName);
        tempFormikProps.setFieldValue(
          "clientContact",
          item.clientInfo.clientContact
        );
        tempFormikProps.setFieldValue("country", item.location.country);
        tempFormikProps.setFieldValue("state", item.location.state);
        tempFormikProps.setFieldValue("city", item.location.city);
        tempFormikProps.setFieldValue("zip", item.location.zip);

        tempFormikProps.setFieldValue(
          "employeementType",
          item.employmentType || "Fulltime"
        );
        tempFormikProps.setFieldValue("duration", item.duration);
        tempFormikProps.setFieldValue("rateBy", item.compensationDetails.wages);
        tempFormikProps.setFieldValue(
          "clientBillRate",
          item.compensationDetails.clientBillRate
        );
        tempFormikProps.setFieldValue(
          "payRate",
          item.compensationDetails.payRate
        );
        tempFormikProps.setFieldValue(
          "positionTitle",
          item.positionDetails.positionTitle
        );
        tempFormikProps.setFieldValue("skills", item.positionDetails.skills);
        tempFormikProps.setFieldValue(
          "requirementDescription",
          item.positionDetails.requirementDescription
        );
        tempFormikProps.setFieldValue(
          "workAuthorizationStatus",
          item.positionDetails.workAuthorizationStatus
        );
        tempFormikProps.setFieldValue(
          "securityClearanceLevel",
          item.positionDetails.securityClearanceLevel
        );
        tempFormikProps.setFieldValue(
          "internalContact",
          item.internalDetails.internalContact
        );
        tempFormikProps.setFieldValue(
          "coordinator",
          item.internalDetails.coOrdinator
        );
        tempFormikProps.setFieldValue(
          "recruitingLead",
          item.internalDetails.recruitingLead
        );
        tempFormikProps.setFieldValue(
          "salesLead",
          item.internalDetails.salesLead
        );
        tempFormikProps.setFieldValue("recruiters", []);
        if (item.recruiters && item.recruiters.length) {
          const recruiters = [];
          item.recruiters.forEach((value) => {
            const recruiter = recruitersList.find((i) => i.value === value);
            recruiter &&
              recruiters.push({
                name: recruiter.value,
                email: recruiter.email,
              });
          });

          tempFormikProps.setFieldValue("recruiters", recruiters);
        }
        tempFormikProps.setFieldValue(
          "recruitingLeadsEmail",
          item.internalDetails.recruitingLeadsEmail
        );
        tempFormikProps.setFieldValue(
          "salesLeadsEmail",
          item.internalDetails.salesLeadsEmail
        );
        setTimeout(() => {
          const errorList = Object.values(tempFormikProps.errors);
          if (errorList && errorList.length) {
            tempFormikProps.handleSubmit();
          }
        });
        toggleLoader();
      });
    }
  }, []);
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={state.initialValues}
      onSubmit={(e) => {
        if (!state.isPreview) {
          props.dispatch(clearAll());
          togglePreviewMode();
        } else {
          toggleLoader();
          if (tempFormikProps.values.requisitionNumber) {
            tempFormikProps.setFieldValue("action", "UPDATE");
            props.dispatch(saveJobListing({ ...e, action: "UPDATE" }));
          } else {
            props.dispatch(saveJobListing(e));
          }
        }
      }}
    >
      {(formikProps) => {
        tempFormikProps = formikProps;
        return (
          <form>
            {state.isShowLoader && <Loader />}
            <Grid
              container
              spacing={1}
              style={{
                backgroundColor: "#FFF",
                padding: "30px 90px 30px 40px",
              }}
            >
              {state.isPreview ? (
                <React.Fragment>
                  <PreviewJobListing
                    {...props}
                    toggleLoader={toggleLoader}
                    formikProps={formikProps}
                    onEdit={togglePreviewMode}
                  />
                  {state.isShowJobListingError &&
                    !formikProps.values.jobListingBoard.length && (
                      <div
                        style={{
                          marginTop: -10,
                          marginLeft: 14,
                          marginBottom: 15,
                          color: "red",
                        }}
                      >
                        Please select the Job Listing Board, Before Publishing
                      </div>
                    )}
                </React.Fragment>
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
                      backgroundColor: "#234071",
                      marginRight: 12,
                    }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={
                    state.isPreview
                      ? () => {
                          // PREVIEW - PUBLISH CLIENT EVENT
                          if (formikProps.values.jobListingBoard.length) {
                            setState({
                              ...state,
                              isShowJobListingError: false,
                            });
                            toggleLoader();
                            formikProps.setFieldValue("action", "PUBLISH");
                            props.dispatch(
                              saveJobListing({
                                ...formikProps.values,
                                action: "PUBLISH",
                              })
                            );
                          } else {
                            setState({ ...state, isShowJobListingError: true });
                          }
                        }
                      : //
                        formikProps.handleSubmit
                  }
                  style={{
                    width: 190,
                    height: 36,
                    borderRadius: 4,
                    fontSize: 14,
                    color: "#FFF",
                    backgroundColor: "#e32686",
                    //!formikProps.isValid
                    //? "#f4a0cb"
                    //: "#e32686",
                  }}
                >
                  {state.isPreview ? "Publish" : "Preview"}
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
  dispatch: PropTypes.func.isRequired,
};

export default AddJobListingForm;
