import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, Modal } from "@material-ui/core";
import AddJobListingForm from "../add-joblisting";
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
    margin: 0,
    padding: 0,
    fontSize: 18,
    color: "darkblue",
    fontWeight: "bold"
  },
  subJobDetailsTitle: {
    margin: 0,
    padding: 0,
    paddingTop: 5,
    fontSize: 14,
    color: "darkblue",
    fontWeight: "bold"
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

function ViewRequisitionDetail(props) {
  const { selectedJobListing } = props;
  const [state, setState] = React.useState({
    isShowEditModal: false,
    isExpand: false,
    formikProps: null
  });
  const handleUpdate = () => {
    debugger;
    console.log(state.formikProps);
  };
  return (
    <Grid
      container
      style={{
        backgroundColor: "#b5e8ff",
        padding: 16,
        paddingTop: 5,
        borderRadius: 8,
        position: "relative"
      }}
    >
      <Grid item xs={12} sm={12} style={{ paddingLeft: 0 }}>
        <h4 style={styles.jobDetailsTitle}>
          {selectedJobListing.positionDetails.positionTitle}
          <span style={{ fontWeight: "normal", paddingLeft: 5 }}>
            | #{selectedJobListing.requisitionNumber}
          </span>
        </h4>
        <h6 style={styles.subJobDetailsTitle}>AllState</h6>
      </Grid>
      <Grid item xs={5} sm={5}>
        <div>
          <div style={styles.section}>
            <span style={styles.labelStyle}>Address: </span>
            {selectedJobListing.location.city},{" "}
            {selectedJobListing.location.state},{" "}
            {selectedJobListing.location.zip},{" "}
            {selectedJobListing.location.country}
          </div>
          <div style={styles.section}>
            <span style={styles.labelStyle}>Employeement Type:</span>
            {selectedJobListing.employmentType}
          </div>
          <div style={styles.section}>
            <span style={styles.labelStyle}>Pay Rate: </span>
            {selectedJobListing.compensationDetails.payRate}
          </div>
          {state.isExpand && (
            <React.Fragment>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Location: </span>
                {selectedJobListing.location.workType}
              </div>
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
                <h4 style={styles.headingStyle}>COMPENSATION DETAILS</h4>
                <div>
                  <div style={styles.section}>
                    <span style={styles.labelStyle}>Rate By:</span>
                    {selectedJobListing.compensationDetails.wages}
                  </div>
                  <div style={styles.section}>
                    <span style={styles.labelStyle}>Client Bill Rate:</span>
                    {selectedJobListing.compensationDetails.clientBillRate}
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </Grid>
      <Grid item xs={7} sm={7}>
        <div style={styles.section}>
          <span style={styles.labelStyle}>Work Authorization Status: </span>
          {selectedJobListing.positionDetails.workAuthorizationStatus}
        </div>
        <div style={styles.section}>
          <span style={styles.labelStyle}>Recruiters: </span>
          {selectedJobListing.recruiters}
        </div>
        <div style={styles.section}>
          <span style={styles.labelStyle}>Posted: </span>
          {selectedJobListing.jobPortal}
        </div>
        {state.isExpand && (
          <React.Fragment>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Internal Contact: </span>
              {selectedJobListing.internalDetails.internalContact}
            </div>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Co-ordinator: </span>
              {selectedJobListing.internalDetails.coOrdinator}
            </div>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Sales Lead: </span>
              {selectedJobListing.internalDetails.salesLead}
            </div>
            <div style={styles.section}>
              <span style={styles.labelStyle}>Recruitting Lead: </span>
              {selectedJobListing.internalDetails.recruitingLead}
            </div>
            <h4 style={styles.headingStyle}>EMPLOYMENT TYPE</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Duration: </span>
                {selectedJobListing.duration}
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
                  Security Clearance Level:{" "}
                </span>
                {selectedJobListing.positionDetails.securityClearanceLevel}
              </div>
            </div>
          </React.Fragment>
        )}
      </Grid>
      <div
        style={{
          position: "absolute",
          right: 10,
          bottom: 5
        }}
      >
        <Button
          onClick={() => setState({ ...state, isShowEditModal: true })}
          color="primary"
          variant="text"
          style={{
            padding: "4px 0",
            textTransform: "unset",
            fontWeight: "500",
            backgroundColor: "#3f51b5",
            color: "#FFF",
            width: "140px",
            marginRight: 8
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => setState({ ...state, isExpand: !state.isExpand })}
          color="primary"
          variant="text"
          style={{
            padding: "4px 0",
            textTransform: "unset",
            fontWeight: "500",
            backgroundColor: "#3f51b5",
            color: "#FFF",
            width: "140px"
          }}
        >
          {state.isExpand ? "View Less" : "View More"}
        </Button>
      </div>
      {state.isShowEditModal && (
        <div>
          <Modal disablePortal disableEnforceFocus disableAutoFocus open>
            <div
              style={{
                position: "absolute",
                width: "60%",
                backgroundColor: "#FFF",
                borderRadius: "2px",
                border: "1px #fff",
                boxShadow: 5,
                padding: 8,
                left: "20%",
                top: "30px"
              }}
            >
              <h4 id="modal-title" style={{ marginTop: 0 }}>
                Edit Requisition
              </h4>
              <div
                id="modal-description"
                style={{ height: 400, overflowY: "auto", overflowX: "hidden" }}
              >
                <AddJobListingForm
                  {...props}
                  formikProps={formikProps =>
                    setState({ ...state, formikProps })
                  }
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <Button
                  onClick={() => setState({ ...state, isShowEditModal: false })}
                  variant="contained"
                  style={{
                    width: 100,
                    padding: 0,
                    height: 36,
                    borderRadius: 4,
                    fontSize: 14,
                    boxShadow: "none",
                    marginRight: 12,
                    backgroundColor: "#FFF"
                  }}
                >
                  CANCEL
                </Button>
                <Button
                  variant="contained"
                  onClick={handleUpdate}
                  style={{
                    width: 100,
                    height: 36,
                    padding: 0,
                    borderRadius: 4,
                    fontSize: 14,
                    boxShadow: "none",
                    MozOutlineColor: "#e32686",
                    backgroundColor: "#FFF"
                  }}
                >
                  UPDATE
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </Grid>
  );
}

ViewRequisitionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired
};
export default ViewRequisitionDetail;
