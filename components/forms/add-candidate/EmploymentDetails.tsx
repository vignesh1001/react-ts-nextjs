import React from "react";
import { Grid } from "@material-ui/core";
import Textfield from "../../formfields/TextBox";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import RadioGroupBox from "../../formfields/RadioGroupBox";
import PropTypes from "prop-types";
import Heading from "./Heading";
import {
  employmentType,
  workType,
  availabilityType,
  scType,
  tpType,
  openToRelocate,
} from "../../../constants/dropdown";

const styles = {
  fieldWrapper: { paddingTop: 0 },
};
function EmploymentDetails(props) {
  const { formikProps } = props;
  const isW2Benefits = formikProps.values.employmentType === "W2 with Benefits";
  return (
    <React.Fragment>
      <Heading title="Employment" />
      <Grid item xs={12} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="employmentType"
          id="employmentType"
          displayLabel="Employment Type"
          options={employmentType}
          style={{ width: "100%", height: 49}}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <Textfield
          name="rate"
          id="rate"
          variant="outlined"
          displayLabel="Rate"
          maxlength="3"
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <RadioGroupBox
          name="empWorkType"
          id="empWorkType"
          variant="outlined"
          options={workType}
          color="red"
          style={{ width: 110 }}
        />
      </Grid>
      {isW2Benefits && (
        <React.Fragment>
          <Grid item xs={3} sm={3} style={styles.fieldWrapper}>
            <Textfield
              name="annualBaseSalary"
              id="annualBaseSalary"
              variant="outlined"
              displayLabel="Annual Base Salary"
              maxlength="3"
            />
          </Grid>
          <Grid item xs={3} sm={3} style={styles.fieldWrapper}>
            <Textfield
              name="annualBonusPct"
              id="annualBonusPct"
              variant="outlined"
              displayLabel="Annual Bonus in %"
              maxlength="3"
            />
          </Grid>
          <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
            <Textfield
              name="empBenefits"
              id="empBenefits"
              variant="outlined"
              displayLabel="Benefits"
              maxlength="100"
            />
          </Grid>
        </React.Fragment>
      )}
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="availability"
          id="availability"
          displayLabel="Availability"
          options={availabilityType}
          style={{ width: "100%", height: 49}}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="securityClearance"
          id="securityClearance"
          displayLabel="Security Clearance"
          options={scType}
          style={{ width: "100%", height: 49}}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="travelPreferences"
          id="travelPreferences"
          variant="outlined"
          displayLabel="Travel Preferences"
          options={tpType}
          style={{ width: "100%", height: 49 }}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="openToRelocate"
          id="openToRelocate"
          displayLabel="Open to Relocate"
          variant="outlined"
          options={openToRelocate}
          style={{ width: "100%", height: 49 }}
        />
      </Grid>
    </React.Fragment>
  );
}
EmploymentDetails.propTypes = {
  formikProps: PropTypes.shape({
    values: PropTypes.shape({
      employmentType: PropTypes.string,
    }),
    setFieldValue: PropTypes.func.isRequired,
  }),
};
export default EmploymentDetails;
