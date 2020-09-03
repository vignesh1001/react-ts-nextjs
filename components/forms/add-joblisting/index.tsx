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

const initialValues = {
  requisitionNumber: null,
  noOfPosition: "",
  priority: "High",
  clientName: "",
  clientContact: "",
  location: "on-site",
  country: "",
  state: "",
  city: "",
  zip: "",
  employeementType: "Fulltime",
  duration: "",
  rateBy: "Hourly",
  clientBillRate: "",
  payRate: "",
  positionTitle: "",
  skills: "",
  requirementDescription:
    '<p>dsgss  <strong>dsgdgdsgd  </strong>dgsdgsdgs dsgdsg <span style="font-size: 36px;">test..</span><',
  workAuthorizationStatus: "",
  securityClearanceLevel: "",
  internalContact: "",
  coordinator: "",
  recruitingLead: "",
  salesLead: "",
  recruiters: [],
  recruitingLeadsEmail: "",
  salesLeadsEmail: "",
  action: "ADD"
};

const validationSchema = yup.object({
  noOfPosition: yup
    .string("Enter a No.Of.Position")
    .required("No.Of.Position is required"),
  city: yup.string("Enter your City").required("City is required"),
  state: yup.string("Enter your State").required("State is required"),
  zip: yup.string("Enter your zip").required("Zip is required"),
  country: yup.string("Enter your country").required("Country is required"),
  positionTitle: yup
    .string("Enter your Position Title")
    .required("Position Title is required"),
  skills: yup.string("Enter Skills").required("Skills is required")
});
let tempFormikProps;
function AddJobListingForm(props) {
  const [state, setState] = React.useState({
    isPreview: false,
    isShowLoader: false
  });
  const togglePreviewMode = () =>
    setState({ ...state, isPreview: !state.isPreview });
  const toggleLoader = () =>
    setState(prevState => ({
      ...prevState,
      isShowLoader: !prevState.isShowLoader
    }));
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

        tempFormikProps.setFieldValue("employeementType", item.employmentType);
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
          "recruitingLead:",
          item.internalDetails.recruitingLead
        );
        tempFormikProps.setFieldValue(
          "salesLead",
          item.internalDetails.salesLead
        );
        tempFormikProps.setFieldValue("recruiters", item.recruiters);
        tempFormikProps.setFieldValue(
          "recruitingLeadsEmail",
          item.internalDetails.recruitingLeadsEmail
        );
        tempFormikProps.setFieldValue(
          "salesLeadsEmail",
          item.internalDetails.salesLeadsEmail
        );
        toggleLoader();
      });
    }
  }, []);
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={e => {
        if (!state.isPreview) {
          props.dispatch(clearAll());
          togglePreviewMode();
        } else {
          toggleLoader();
          props.dispatch(saveJobListing(e));
        }
      }}
    >
      {formikProps => {
        tempFormikProps = formikProps;
        return (
          <form>
            {state.isShowLoader && <Loader />}
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
                  toggleLoader={toggleLoader}
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
                      backgroundColor: "#234071",
                      marginRight: 12
                    }}
                    onClick={formikProps.handleSubmit}
                  >
                    Save Draft
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={
                    state.isPreview
                      ? () => {
                          toggleLoader();
                          formikProps.setFieldValue("action", "PUBLISH");
                          props.dispatch(
                            saveJobListing({
                              ...formikProps.values,
                              action: "PUBLISH"
                            })
                          );
                        }
                      : formikProps.handleSubmit
                  }
                  style={{
                    width: 190,
                    height: 36,
                    borderRadius: 4,
                    fontSize: 14,
                    color: "#FFF",
                    backgroundColor: "#e32686"
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
  dispatch: PropTypes.func.isRequired
};

export default AddJobListingForm;
