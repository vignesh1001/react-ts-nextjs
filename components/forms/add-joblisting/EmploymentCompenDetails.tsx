import React from "react";
import { Grid } from "@material-ui/core";
import Textfield from "../../formfields/TextBox";
import RadioGroupBox from "../../formfields/RadioGroupBox";
import Heading from "./Heading";
import PropTypes from "prop-types";
import { workType, employmentWorkingType } from "../../../constants/dropdown";

const styles = {
  fieldWrapper: { paddingTop: 0, paddingRight: 12 },
  chipsStyle: {
    color: "black",
    marginTop: 5,
    marginRight: 12,
    backgroundColor: "#00bfff",
  },
};

function EmploymentCompenDetails() {
  return (
    <React.Fragment>
      <Heading title="Employment Type" />
      <Grid item xs={12} sm={6} style={styles.fieldWrapper}>
        <RadioGroupBox
          name="employeementType"
          id="employeementType"
          variant="outlined"
          options={employmentWorkingType}
          color="red"
          style={{ "flex-flow": "wrap" }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Textfield
          name="duration"
          id="duration"
          variant="outlined"
          displayLabel="Duration"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Heading title="Compensation Details" />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <RadioGroupBox
          name="rateBy"
          id="rateBy"
          variant="outlined"
          options={workType}
          color="red"
          style={{ width: 110 }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Textfield
          name="clientBillRate"
          id="clientBillRate"
          displayLabel="Client Bill Rate"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Textfield
          name="payRate"
          id="payRate"
          variant="outlined"
          displayLabel="Pay Rate"
        />
      </Grid>
    </React.Fragment>
  );
}

EmploymentCompenDetails.propTypes = {
  formikProps: PropTypes.shape({
    values: PropTypes.shape({
      candidate_resume: PropTypes.arrayOf(PropTypes.string.isRequired),
    }).isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }),
};

export default EmploymentCompenDetails;
