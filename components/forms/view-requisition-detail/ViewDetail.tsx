import React from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import ActionDropdown from "./ActionDropdown";
import EditReqisitionModal from "./EditReqisitionModal";
import ManagePostModal from "./ManagePostModal";
import Router from "next/router";

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
const requisitionActions = [
  { title: "Add Candidate", value: "add_candidate" },
  { title: "Put on Hold", value: "put_on_hold" },
  { title: "Close Req", value: "close_req" },
  { title: "Email Req", value: "email_req" },
  { title: "Manage Posting", value: "manage_posting" }
];
function ViewRequisitionDetail(props) {
  const { selectedJobListing } = props;
  const [state, setState] = React.useState({
    isShowEditModal: false,
    openCloseReqModel: false,
    isShowManagePostingModal: false,
    isExpand: false
  });

  const handleReqisitionAction = action => {
    switch (action) {
      case "add_candidate": {
        Router.push("/addCandidate");
        break;
      }
      case "manage_posting": {
        setState({ ...state, isShowManagePostingModal: true });
        break;
      }
    }
  };
  const onCloseReqisitionModal = () => {
    setState({ ...state, isShowEditModal: false });
  };
  const onCloseManagePostingModal = () => {
    setState({ ...state, isShowManagePostingModal: false });
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
      <Grid container style={{ paddingLeft: 0 }}>
        <Grid item xs={8} sm={8}>
          <h4 style={styles.jobDetailsTitle}>
            {selectedJobListing.positionDetails.positionTitle}
            <span style={{ fontWeight: "normal", paddingLeft: 5 }}>
              | #{selectedJobListing.requisitionNumber}
            </span>
          </h4>
          <h6 style={styles.subJobDetailsTitle}>AllState</h6>
        </Grid>
        <Grid item xs={4} sm={4} style={{ textAlign: "right" }}>
          <ActionDropdown
            options={requisitionActions}
            onChange={e => handleReqisitionAction(e.target.value)}
            value=""
          />
        </Grid>
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
          {selectedJobListing.jobPortal
            ? selectedJobListing.jobPortal.join(", ")
            : ""}
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
        <EditReqisitionModal
          {...props}
          onCloseReqisitionModal={onCloseReqisitionModal}
        />
      )}
      {state.isShowManagePostingModal && (
        <ManagePostModal
          {...props}
          onCloseManagePostingModal={onCloseManagePostingModal}
        />
      )}
    </Grid>
  );
}

ViewRequisitionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired
};
export default ViewRequisitionDetail;
