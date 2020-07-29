import React from "react";
import { Grid, Chip } from "@material-ui/core";
import Textfield from "../../formfields/TextBox";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import SimpleUploadLink from "../../formfields/SimpleUploadLink";
import Heading from "./Heading";
import PropTypes from "prop-types";
import {
  countries,
  immiStatus,
  USA_STATE,
  INDIA_STATE,
  getStateList
} from "../../../constants/dropdown";

const styles = {
  fieldWrapper: { paddingTop: 0, paddingRight: 12 },
  chipsStyle: {
    color: "black",
    marginTop: 5,
    marginRight: 12,
    backgroundColor: "#00bfff"
  }
};

function ContactBasics(props) {
  const handleFileUpload = ({ target }) => {
    const { name, files } = target;
    var fileList = props.formikProps.values[name];
    for (var i = 0; i < files.length; i++) {
      fileList.push(files[i]);
    }
    props.formikProps.setFieldValue(name, fileList);
  };
  const handleDelete = (listName, e) => {
    props.formikProps.values[listName].splice(
      props.formikProps.values[listName].indexOf(e),
      1
    );
    props.formikProps.setFieldValue(name, props.formikProps.values[listName]);
  };
  const stateList = getStateList(props.formikProps.values.country);
  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} style={{ paddingTop: 6, paddingLeft: 0 }}>
        <label style={{ color: "#195091", fontSize: 16, paddingLeft: 2 }}>
          Resume{" "}
        </label>
        <SimpleUploadLink
          onChange={handleFileUpload}
          labelText="Add"
          name="candidate_resume"
          id="candidate_resume"
          accept=".doc,.docx,.ppt,.pdf"
        />{" "}
        {props.formikProps.values.candidate_resume.map(i => (
          <Chip
            key={"candidate_resume_chip" + i.name}
            size="medium"
            label={i.name}
            onDelete={() => handleDelete("candidate_resume", i)}
            style={styles.chipsStyle}
          />
        ))}
      </Grid>
      <Heading title="Candidate Basics" />
      <Grid item xs={6} sm={4} style={styles.fieldWrapper}>
        <Textfield
          name="fullName"
          id="fullName"
          variant="outlined"
          displayLabel="Full Name"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6} sm={4} style={styles.fieldWrapper}>
        <Textfield
          name="emailAddress"
          id="emailAddress"
          variant="outlined"
          displayLabel="Emaill Address"
        />
      </Grid>
      <Grid item xs={4} sm={4} style={styles.fieldWrapper}>
        <Textfield
          name="phone"
          id="phone"
          variant="outlined"
          displayLabel="Phone"
          maxlength="12"
        />
      </Grid>
      <Heading title="Location" />
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="country"
          id="country"
          displayLabel="Country"
          options={countries}
          style={{
            width: "100%",
            height: 49,
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="state"
          id="state"
          displayLabel="State"
          options={stateList}
          style={{
            width: "100%",
            height: 49,
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <Textfield
          name="city"
          id="city"
          variant="outlined"
          displayLabel="City"
          maxlength="12"
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <Textfield
          name="zip"
          id="zip"
          variant="outlined"
          displayLabel="Zip"
          maxlength="12"
        />
      </Grid>
      <Heading title="Profile Information" />
      <Grid item xs={12} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="immigrationStatus"
          id="immigrationStatus"
          displayLabel="Immigration Status"
          options={immiStatus}
          style={{ width: "100%", height: 49 }}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <Textfield
          name="SSN"
          id="SSN"
          variant="outlined"
          displayLabel="SSN (last 4 digits)"
          maxlength="3"
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <Textfield
          name="dob"
          id="dob"
          variant="outlined"
          displayLabel="Date Of Birth"
          maxlength="3"
        />
      </Grid>
      <Grid item xs={12} sm={12} style={{ paddingTop: 6, paddingLeft: 2 }}>
        <label style={{ color: "#374c97", paddingTop: 15 }}>
          Work Authorization Form{" "}
        </label>
        <SimpleUploadLink
          onChange={handleFileUpload}
          labelText="Add"
          name="workAuthForm"
          id="workAuthForm"
          multiple
          accept="image/*"
        />
      </Grid>
    </React.Fragment>
  );
}

ContactBasics.propTypes = {
  formikProps: PropTypes.shape({
    values: PropTypes.shape({
      candidate_resume: PropTypes.arrayOf(PropTypes.string.isRequired)
    }).isRequired,
    setFieldValue: PropTypes.func.isRequired
  }),
  labelText: PropTypes.string.isRequired
};

export default ContactBasics;
