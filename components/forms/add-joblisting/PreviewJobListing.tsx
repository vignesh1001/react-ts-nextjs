import React from "react";
import { Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { jobListingBoardList } from "../../../constants/dropdown";
import CheckBoxComponent from "../../formfields/CheckBox";

const styles = {
  previewTitle: {
    margin: "10px 0",
    padding: 0,
    fontSize: 16,
    color: "#220037",
    fontWeight: "normal"
  },
  savedMessage: {
    margin: "10px 0",
    padding: 0,
    fontSize: 16,
    color: "#e32586",
    fontWeight: "normal"
  },
  savedFailedMessage: {
    margin: "10px 0",
    padding: 0,
    fontSize: 16,
    color: "red",
    fontWeight: "normal"
  },
  jobDetailsTitle: {
    margin: "10px 0",
    padding: 0,
    fontSize: 16,
    color: "#000",
    fontWeight: "normal"
  },
  publishToHeadingStyle: {
    margin: "10px 0",
    padding: 0,
    fontSize: 20,
    color: "#000",
    fontWeight: "normal"
  },
  labelStyle: {
    fontSize: 12,
    color: "#4a4a4a",
    fontWeight: "normal",
    paddingRight: "4px"
  },
  headingStyle: {
    fontSize: 12,
    margin: "16px 8px 2px 0",
    color: "#4f46a2",
    fontWeight: "normal"
  },
  section: {
    padding: "2px 4px 2px 0",
    color: "#4a4a4a",
    fontWeight: "bold"
  }
};

function PreviewJobListing(props) {
  const { formikProps } = props;

  React.useEffect(() => {
    if (props.saveJobListingResponse) {
      props.formikProps.setFieldValue(
        "requisitionNumber",
        props.saveJobListingResponse.jobPosting[0].requisitionNumber
      );
      props.toggleLoader();
    }
  }, [props.saveJobListingResponse]);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        style={{
          backgroundColor: "#FFF"
        }}
      >
        <Grid item xs={6} sm={6} style={{ paddingLeft: 0 }}>
          <h4 style={styles.previewTitle}>Preview</h4>
        </Grid>
        <Grid item xs={6} sm={6} style={{ paddingLeft: 0 }}>
          {formikProps.values.action === "ADD" &&
            props.saveJobListingStatus === "SAVED" && (
              <h2 style={styles.savedMessage}>JobListing Saved Successfully</h2>
            )}
          {formikProps.values.action === "ADD" &&
            props.saveJobListingStatus === "FAILED" && (
              <h2 style={styles.savedFailedMessage}>JobListing Save Failed</h2>
            )}
          {formikProps.values.action === "PUBLISH" &&
            props.saveJobListingStatus === "SAVED" && (
              <h2 style={styles.savedMessage}>
                JobListing Published Successfully
              </h2>
            )}
          {formikProps.values.action === "PUBLISH" &&
            props.saveJobListingStatus === "FAILED" && (
              <h2 style={styles.savedFailedMessage}>
                JobListing Published Failed
              </h2>
            )}
        </Grid>
        <Grid
          container
          style={{
            backgroundColor: "#f2fbff",
            padding: 16,
            borderRadius: 8
          }}
        >
          <Grid item xs={12} sm={12} style={{ paddingLeft: 0 }}>
            <h4 style={styles.jobDetailsTitle}>Job Details</h4>
          </Grid>
          <Grid item xs={6} sm={6}>
            <h4 style={styles.headingStyle}>REQUISITION DETAILS</h4>
            <div>
              {formikProps.values.requisitionNumber && (
                <div style={styles.section}>
                  <span style={styles.labelStyle}>Requisition #: </span>
                  {formikProps.values.requisitionNumber}
                </div>
              )}
              <div style={styles.section}>
                <span style={styles.labelStyle}>Number Of Position: </span>
                {formikProps.values.noOfPosition}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Priority: </span>
                {formikProps.values.priority}
              </div>
            </div>
            <h4 style={styles.headingStyle}>CLIENT DETAILS</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Client Name: </span>
                {formikProps.values.clientName}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Client Contact: </span>
                {formikProps.values.clientContact}
              </div>
            </div>
            <h4 style={styles.headingStyle}>LOCATION</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Location: </span>
                {formikProps.values.location}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>City: </span>
                {formikProps.values.city}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>State: </span>
                {formikProps.values.state}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Zip: </span>
                {formikProps.values.zip}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Country: </span>
                {formikProps.values.country}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <h4 style={styles.headingStyle}>EMPLOYMENT TYPE</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Employeement Type:</span>
                {formikProps.values.employeementType}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Duration: </span>
                {formikProps.values.duration}
              </div>
            </div>
            <h4 style={styles.headingStyle}>COMPENSATION DETAILS</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Rate By: </span>
                {formikProps.values.rateBy}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Client Bill Rate:</span>
                {formikProps.values.clientBillRate}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Pay Rate:</span>
                {formikProps.values.payRate}
              </div>
            </div>
            <h4 style={styles.headingStyle}>POSITION DETAILS</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Position Title: </span>
                {formikProps.values.positionTitle}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Skills:</span>
                {formikProps.values.skills}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Requirement Description: </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: formikProps.values.requirementDescription || ""
                  }}
                />
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>
                  Work Authorization Status:{" "}
                </span>
                {formikProps.values.workAuthorizationStatus}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>
                  Security Clearance Level:{" "}
                </span>
                {formikProps.values.securityClearanceLevel}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            backgroundColor: "#f2fbff",
            padding: 16,
            marginTop: 16,
            paddingTop: 0,
            borderRadius: 8
          }}
        >
          <Grid item xs={12} sm={12}>
            <h4 style={styles.headingStyle}>INTERNAL DETAILS</h4>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Internal Contact: </span>
              {formikProps.values.internalContact}
            </div>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Co-ordinator: </span>
              {formikProps.values.coordinator}
            </div>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Recruitting Lead: </span>
              {formikProps.values.recruitingLead}
            </div>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Sales Lead: </span>
              {formikProps.values.salesLead}
            </div>
            {/* <div style={styles.section}>
              <span style={styles.labelStyle}>Assign To recruiers: </span>
              {formikProps.values.recruiters.toString()}
            </div> */}
          </Grid>
          <Grid item xs={12} sm={12} style={{ paddingTop: 6 }}>
            <Button
              variant="contained"
              style={{
                width: 50,
                height: 34,
                borderRadius: 4,
                fontSize: 14,
                color: "#FFF",
                backgroundColor: "#234071"
              }}
              onClick={props.onEdit}
            >
              EDIT
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12}>
          <h4 style={styles.publishToHeadingStyle}>
            Publish to external Job Listing Boards
          </h4>
        </Grid>
        <Grid item xs={12} sm={12} style={{ display: "flex" }}>
          {jobListingBoardList.map(i => (
            <CheckBoxComponent
              key={"jobListingBoard_" + i.value}
              name="jobListingBoard"
              id="jobListingBoard"
              variant="outlined"
              value={i.value}
              displayLabel={i.title}
              style={{ "flex-flow": "wrap", minHeight: 50 }}
            />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

PreviewJobListing.propTypes = {
  onEdit: PropTypes.func.isRequired,
  toggleLoader: PropTypes.func.isRequired,
  formikProps: {
    values: PropTypes.shape({
      fullName: PropTypes.string,
      emailAddress: PropTypes.string,
      phone: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string,
      country: PropTypes.string,
      immigrationStatus: PropTypes.string,
      SSN: PropTypes.string,
      dob: PropTypes.string,
      employeementType: PropTypes.string,
      rate: PropTypes.string,
      availability: PropTypes.string,
      securityClearance: PropTypes.string,
      travelPreferences: PropTypes.string,
      openToRelocate: PropTypes.string,
      positionTitle: PropTypes.string,
      professionalExperience: PropTypes.string,
      primarySkills: PropTypes.string,
      otherSkills: PropTypes.string,
      additionalNotes: PropTypes.string,
      yearOfCompletion: PropTypes.string,
      certifications: PropTypes.arrayOf(PropTypes.string),
      education: PropTypes.arrayOf(PropTypes.string)
    }),
    setFieldValue: PropTypes.func.isRequired
  },
  saveJobListingStatus: PropTypes.string,
  saveJobListingResponse: PropTypes.object
};

export default PreviewJobListing;
