import React from "react";
import { Grid } from "@material-ui/core";
import Textfield from "../../formfields/TextBox";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import Heading from "./Heading";
import PropTypes from "prop-types";
import { scType, immiStatus } from "../../../constants/dropdown";

import ControlledEditor from "../../formfields/ControlledEditor";

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
        {/* <Textfield
          name="requirementDescription"
          id="requirementDescription"
          variant="outlined"
          
          fullWidth
          multiple
          required
        /> */}
        <ControlledEditor
          {...props}
          displayLabel="Requirement Description"
          name="requirementDescription"
          id="requirementDescription"
          variant="outlined"
          value={props.formikProps.values.requirementDescription}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="workAuthorizationStatus"
          id="workAuthorizationStatus"
          displayLabel="Work Authorization Status"
          options={immiStatus}
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
          options={scType}
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
