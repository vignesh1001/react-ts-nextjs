import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
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

function ViewRequisitionDetail({ selectedJobListing }) {
  return (
    <Box my={4}>
      <Grid container>
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
              <div style={styles.section}>
                <span style={styles.labelStyle}>Requisition #: </span>
                {selectedJobListing.requisitionNumber}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Number Of Position: </span>
                {selectedJobListing.numberOfPositions}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Priority: </span>
                {selectedJobListing.priority}
              </div>
            </div>
            <h4 style={styles.headingStyle}>CLIENT DETAILS</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Client Name: </span>
                {selectedJobListing.clientInfo.clientName}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Client Contact: </span>
                {selectedJobListing.clientInfo.clientContact}
              </div>
            </div>
            <h4 style={styles.headingStyle}>LOCATION</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Location: </span>
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>City: </span>
                {selectedJobListing.location.city}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>State: </span>
                {selectedJobListing.location.state}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Zip: </span>
                {selectedJobListing.location.zip}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Country: </span>
                {selectedJobListing.location.country}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <h4 style={styles.headingStyle}>EMPLOYMENT TYPE</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Employeement Type:</span>
                {selectedJobListing.employmentType}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Duration: </span>
                {selectedJobListing.duration}
              </div>
            </div>
            <h4 style={styles.headingStyle}>COMPENSATION DETAILS</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Rate By: </span>
                {selectedJobListing.compensationDetails.wages}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Client Bill Rate:</span>
                {selectedJobListing.compensationDetails.clientBillRate}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Pay Rate:</span>
                {selectedJobListing.compensationDetails.payRate}
              </div>
            </div>
            <h4 style={styles.headingStyle}>POSITION DETAILS</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Position Title: </span>
                {selectedJobListing.positionDetails.positionTitle}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Skills:</span>
                {selectedJobListing.positionDetails.skills}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Requirement Description: </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedJobListing.positionDetails
                        .requirementDescription || ""
                  }}
                />
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>
                  Work Authorization Status:{" "}
                </span>
                {selectedJobListing.positionDetails.workAuthorizationStatus}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>
                  Security Clearance Level:{" "}
                </span>
                {selectedJobListing.positionDetails.securityClearanceLevel}
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
              {selectedJobListing.internalDetails.internalContact}
            </div>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Co-ordinator: </span>
              {selectedJobListing.internalDetails.coOrdinator}
            </div>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Recruitting Lead: </span>
              {selectedJobListing.internalDetails.recruitingLead}
            </div>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Sales Lead: </span>
              {selectedJobListing.internalDetails.salesLead}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

ViewRequisitionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired
};
export default ViewRequisitionDetail;
