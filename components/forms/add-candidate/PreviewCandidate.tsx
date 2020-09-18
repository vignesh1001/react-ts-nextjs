import React from "react";
import { Grid, Button, Modal } from "@material-ui/core";
import PropTypes from "prop-types";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import Textfield from "../../formfields/TextBox";
import Router from "next/router";
import { loadCandidatesSuccess, clearAll } from "../../../actions";

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
    fontWeight: "bold",
    wordWrap: "break-word"
  }
};
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
function PreviewCandidate(props) {
  const { formikProps } = props;
  const [state, setState] = React.useState({
    isShowModal: false,
    modalTitle: "erere",
    modalDescription: "rererer",
    callBack1: () => {},
    callBack2: () => {},
    button1Text: "CLOSE",
    button2Text: "SEARCH"
  });
  const [modalStyle] = React.useState(getModalStyle);
  const goToHomePage = () => {
    props.dispatch(loadCandidatesSuccess(null));
    props.dispatch(clearAll());
    Router.push("/");
  };
  const goToOpenReqs = () => {
    Router.push("/ViewJobListing");
    props.dispatch(clearAll());
  };
  const closeSaveModel = () => {
    setState({ ...state, isShowModal: false });
  };
  React.useEffect(() => {
    if (
      props.saveCandidateResponse &&
      props.saveCandidateStatus &&
      !state.isShowModal
    ) {
      const { candidateList, error } = props.saveCandidateResponse;
      if (!error) {
        formikProps.setFieldValue("documentId", candidateList[0].documentId);
      }
      props.toggleLoader(false);

      if (props.saveCandidateStatus === "CANDIDATE_SAVED") {
        const modalTitle =
          formikProps.values.action === "SAVE"
            ? "Prospect was saved!"
            : "Candidate was submitted!";

        const modalDescription =
          formikProps.values.action === "SAVE"
            ? formikProps.values.fullName +
              " was successfully saved to PTP database and can be submitted to an Open Requisition later."
            : formikProps.values.fullName +
              " was successfully submitted to Requisition #" +
              formikProps.values.requisitionNumber +
              "." +
              " You can return to Search or View Requisition #" +
              formikProps.values.requisitionNumber +
              ".";

        const callBack1 =
          formikProps.values.action === "SAVE" ? closeSaveModel : goToHomePage;
        const callBack2 =
          formikProps.values.action === "SAVE" ? goToHomePage : goToOpenReqs;
        const button1Text =
          formikProps.values.action === "SAVE" ? "CLOSE" : "SEARCH";
        const button2Text =
          formikProps.values.action === "SAVE" ? "SEARCH" : "VIEW REQ";
        setState({
          ...state,
          button1Text,
          button2Text,
          isShowModal: true,
          modalTitle,
          modalDescription,
          callBack1,
          callBack2
        });
      } else if (props.saveCandidateStatus === "CANDIDATE_FAILED") {
        const modalTitle =
          formikProps.values.action === "SAVE"
            ? "Prospect save was failed!"
            : "Candidate submit was failed!";
        const modalDescription =
          formikProps.values.action === "SAVE"
            ? formikProps.values.fullName + " was not saved to PTP database."
            : formikProps.values.fullName + " was not submitted.";
        const callBack1 = null;
        const callBack2 = closeSaveModel;
        const button1Text = "";
        const button2Text = "CLOSE";
        setState({
          ...state,
          button1Text,
          button2Text,
          isShowModal: true,
          modalTitle,
          modalDescription,
          callBack1,
          callBack2
        });
      }
    }
  }, [props.saveCandidateResponse]);
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
        {/*<Grid item xs={6} sm={6} style={{ paddingLeft: 0 }}>
          {formikProps.values.action === "SAVE" &&
            props.saveCandidateStatus === "CANDIDATE_SAVED" && (
              <h2 style={styles.savedMessage}>Candidate Saved Successfully</h2>
            )}
          {formikProps.values.action === "SAVE" &&
            props.saveCandidateStatus === "CANDIDATE_FAILED" && (
              <h2 style={styles.savedFailedMessage}>Candidate Save Failed</h2>
            )}
          {formikProps.values.action === "SUBMIT" &&
            props.saveCandidateStatus === "CANDIDATE_SAVED" && (
              <h2 style={styles.savedMessage}>
                Candidate Submitted Successfully
              </h2>
            )}
          {formikProps.values.action === "SUBMIT" &&
            props.saveCandidateStatus === "CANDIDATE_FAILED" && (
              <h2 style={styles.savedFailedMessage}>
                Candidate Submission Failed
              </h2>
            )}
            </Grid>*/}
        <Grid
          container
          style={{
            backgroundColor: "#f2fbff",
            padding: "16px",
            borderRadius: "8px"
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
            </div>
          </Grid>

          <Grid item xs={6} sm={6}>
            <h4 style={styles.headingStyle}>EMPLOYMENT</h4>
            <div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Employeement Type:</span>
                {formikProps.values.employmentType}
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

              <h4 style={styles.headingStyle}>PROFILE INFORMATION</h4>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Immigration Status:</span>
                {formikProps.values.immigrationStatus}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>SSN: </span>
                {formikProps.values.SSN}
              </div>
              <div style={styles.section}>
                <span style={styles.labelStyle}>Date Of Birth: </span>
                {formikProps.values.dob}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
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
                <span style={styles.labelStyle}>Additional Notes:</span>
                <Textfield
                  name="additionalNotes"
                  id="additionalNotes"
                  variant="outlined"
                  displayLabel=""
                  multiline
                  rows={4}
                />
              </div>
            </div>
          </Grid>
          <Grid container style={{ paddingTop: 6 }}>
            {formikProps.values.educations.map((i, idx) => (
              <>
                <Grid item xs={6} sm={6}>
                  <div style={styles.section}>
                    <span style={styles.labelStyle}>
                      {" "}
                      Education {idx + 1}:{" "}
                    </span>
                    {i.name}
                  </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <div style={styles.section}>
                    <span style={styles.labelStyle}> Year of Completion: </span>
                    {i.yearOfCompletion}
                  </div>
                </Grid>
              </>
            ))}
          </Grid>
          <Grid container style={{ paddingTop: 6 }}>
            {formikProps.values.certifications.map((i, idx) => (
              <>
                <Grid item xs={6} sm={6}>
                  <div style={styles.section}>
                    <span style={styles.labelStyle}>
                      {" "}
                      Certification {idx + 1}:{" "}
                    </span>
                    {i.title}
                  </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <div style={styles.section}>
                    <span style={styles.labelStyle}> Year of Completion: </span>
                    {i.yearOfCompletion}
                  </div>
                </Grid>
              </>
            ))}
          </Grid>
          <Grid container style={{ paddingTop: 6 }}>
            {formikProps.values.references.map((i, idx) => (
              <>
                <Grid item xs={12} sm={12}>
                  <div style={styles.section}>
                    <span style={styles.labelStyle}>
                      {" "}
                      References {idx + 1}:{" "}
                    </span>
                    <span style={{ fontWeight: "normal" }}>
                      <b>{i.fullName}</b> | {i.position} | {i.relationship} |{" "}
                      {i.phone} | {i.email}
                    </span>
                  </div>
                </Grid>
              </>
            ))}
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
        <Grid item xs={4} sm={6}>
          <ComboSelectBox
            name="requisitionNumber"
            id="requisitionNumber"
            displayLabel="Submit to Requisition"
            style={{ width: "100%", height: 49 }}
            options={formikProps.values.internalDetails}
            onChange={e => {
              const value = e.target.value;
              const selectedInternalDetails = formikProps.values.internalDetails.find(
                i => i.value === value
              );
              formikProps.setFieldValue(
                "salesLead",
                selectedInternalDetails.internalDetails.salesLead
              );
              formikProps.setFieldValue(
                "recruitingLead",
                selectedInternalDetails.internalDetails.recruitingLead
              );
            }}
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <Textfield
            name="salesLead"
            id="salesLead"
            variant="outlined"
            displayLabel="Sales Lead"
            disabled
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <Textfield
            name="recruitingLead"
            id="recruitingLead"
            variant="outlined"
            displayLabel="Recruitting Lead"
            disabled
          />
        </Grid>
      </Grid>
      {state.isShowModal && (
        <div>
          <Modal disablePortal disableEnforceFocus disableAutoFocus open>
            <div
              style={{
                position: "absolute",
                width: 385,
                backgroundColor: "#FFF",
                borderRadius: "2px",
                border: "1px #fff",
                boxShadow: 5,
                padding: 8,
                ...modalStyle,
                left: "50%",
                top: "50%"
              }}
            >
              <h2 id="modal-title" style={{ marginTop: 0 }}>
                {state.modalTitle}
              </h2>
              <p id="modal-description">{state.modalDescription}</p>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={state.callBack1}
                  style={{
                    width: 90,
                    height: 36,
                    borderRadius: 4,
                    fontSize: 14,
                    boxShadow: "none",
                    marginRight: 12,
                    backgroundColor: "#FFF"
                  }}
                >
                  {state.button1Text}
                </Button>
                <Button
                  variant="contained"
                  onClick={state.callBack2}
                  style={{
                    width: 100,
                    height: 36,
                    borderRadius: 4,
                    fontSize: 14,
                    boxShadow: "none",
                    MozOutlineColor: "#e32686",
                    backgroundColor: "#FFF"
                  }}
                >
                  {state.button2Text}
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </React.Fragment>
  );
}

PreviewCandidate.propTypes = {
  onEdit: PropTypes.func.isRequired,
  toggleLoader: PropTypes.func.isRequired,
  saveCandidateStatus: PropTypes.string,
  saveCandidateResponse: PropTypes.shape({
    candidateList: PropTypes.arrayOf(
      PropTypes.shape({
        documentId: PropTypes.string
      })
    ),
    error: PropTypes.object
  }),
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
      employmentType: PropTypes.string,
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
  dispatch: PropTypes.func
};

export default PreviewCandidate;
