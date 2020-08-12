import React from "react";
import { Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import Textfield from "../../formfields/TextBox";

const styles = {
  previewTitle: {
    margin: "10px 0",
    padding: 0,
    fontSize: 16,
    color: "#220037",
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
  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        style={{
          backgroundColor: "#FFF"
        }}
      >
        <Grid item xs={12} sm={12} style={{ paddingLeft: 0 }}>
          <h4 style={styles.previewTitle}>Preview</h4>
        </Grid>
        <Grid
          container
          style={{
            backgroundColor: "#f2fbff",
            padding: 16,
            borderRadius: 8
          }}
        >
          <Grid item xs={6} sm={6}>
            <h4 style={styles.headingStyle}>CANDIDATE BASICS </h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Full Name: </span>
                {formikProps.values.fullName}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Email Address: </span>
                {formikProps.values.emailAddress}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Phone: </span>
                {formikProps.values.phone}
              </div>
            </div>
            <h4 style={styles.headingStyle}>LOCATION</h4>
            <div>
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
              <div style={styles.section}>
                <h4 style={styles.headingStyle}>PROFILE INFORMATION</h4>
                <span style={styles.labelStyle}>Immigration Status:</span>
                {formikProps.values.immigrationStatus}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>SSN: </span>
                {formikProps.values.SSN}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Date Of birth: </span>
                {formikProps.values.dob}
              </div>
            </div>
          </Grid>

          <Grid item xs={6} sm={6}>
            <h4 style={styles.headingStyle}>EMPLOYMENT</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Employeement Type:</span>
                {formikProps.values.employeementType}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}> Rate: </span>
                {formikProps.values.rate}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}> Availability: </span>
                {formikProps.values.availability}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Security Clearance:</span>
                {formikProps.values.securityClearance}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Travel Preferences:</span>
                {formikProps.values.travelPreferences}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Open To Relocate: </span>
                {formikProps.values.openToRelocate}
              </div>
            </div>
            <h4 style={styles.headingStyle}>TECHNICAL PROFILE</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}> Position Title: </span>
                {formikProps.values.positionTitle}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Professional Experience:</span>
                {formikProps.values.professionalExperience}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Primary Skils: </span>
                {formikProps.values.primarySkills}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Other Skills: </span>
                {formikProps.values.otherSkills}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}> Education: </span>
                {formikProps.values.educations.map(i => i.education).join()}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Additional Notes:</span>
                {formikProps.values.additionalNotes}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Year Of Completion:</span>
                {formikProps.values.yearOfCompletion}
              </div>
            </div>
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
        <Grid item xs={4} sm={3}>
          <ComboSelectBox
            name="submitToRequirement"
            id="submitToRequirement"
            displayLabel="Submit to Requirement"
            style={{ width: "100%", height: 49 }}
            options={[]}
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <Textfield
            name="salesLead"
            id="salesLead"
            variant="outlined"
            displayLabel="Sales Lead"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <Textfield
            name="recruittingLead"
            id="recruittingLead"
            variant="outlined"
            displayLabel="Recruitting Lead"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

PreviewCandidate.propTypes = {
  onEdit: PropTypes.func.isRequired,
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
  }
};

export default PreviewJobListing;
