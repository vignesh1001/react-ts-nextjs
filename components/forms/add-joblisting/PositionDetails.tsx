import React from "react";
import { Grid, Chip } from "@material-ui/core";
import Textfield from "../../formfields/TextBox";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import RadioGroupBox from "../../formfields/RadioGroupBox";
import SimpleUploadLink from "../../formfields/SimpleUploadLink";
import Heading from "./Heading";
import PropTypes from "prop-types";
import {
  countries,
  immiStatus,
  USA_STATE,
  INDIA_STATE,
  getStateList,
  workType,
  employmentWorkingType
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

function PositionDetails(props) {
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
      <Heading title="Position Details" />
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <Textfield
          name="positionTitle"
          id="positionTitle"
          variant="outlined"
          displayLabel="Position Title"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <Textfield
          name="skills"
          id="skills"
          variant="outlined"
          displayLabel="Skills"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <Textfield
          name="requirementDescription"
          id="requirementDescription"
          variant="outlined"
          displayLabel="Requirement Description"
          fullWidth
          multiple
          required
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="workAuthorizationStatus"
          id="workAuthorizationStatus"
          displayLabel="Work Authorization Status"
          options={countries}
          style={{
            width: "100%",
            height: 49
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="securityClearanceLevel"
          id="securityClearanceLevel"
          displayLabel="Security Clearance Level"
          options={countries}
          style={{
            width: "100%",
            height: 49
          }}
        />
      </Grid>
    </React.Fragment>
  );
}

PositionDetails.propTypes = {
  formikProps: PropTypes.shape({
    values: PropTypes.shape({
      candidate_resume: PropTypes.arrayOf(PropTypes.string.isRequired)
    }).isRequired,
    setFieldValue: PropTypes.func.isRequired
  })
};

export default PositionDetails;
