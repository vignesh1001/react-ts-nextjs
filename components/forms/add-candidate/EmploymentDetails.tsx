import React from "react";
import { Grid } from "@material-ui/core";
import Textfield from "../../formfields/TextBox";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import RadioGroupBox from "../../formfields/RadioGroupBox";
import Heading from "./Heading";

const employmentType = [
  { title: "Hourly", value: "Hourly" },
  { title: "Yearly", value: "Yearly" },
];
const workType = [
  { title: "Hourly", value: "Hourly" },
  { title: "Yearly", value: "Yearly" },
];
const openToRelocate = [
  { title: "Yes", value: "Yes" },
  { title: "No", value: "No" },
];
const styles = {
  fieldWrapper: { paddingTop: 0 },
};
function EmploymentDetails() {
  return (
    <React.Fragment>
      <Heading title="Employment" />
      <Grid item xs={12} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="employmentType"
          id="employmentType"
          displayLabel="Employment Type"
          options={employmentType}
          style={{ width: "100%", height: 32 }}
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
          color="#a40c58"
          style={{ width: 110 }}
        />
      </Grid>

      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="availability"
          id="availability"
          displayLabel="Availability"
          options={employmentType}
          style={{ width: "100%", height: 32 }}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="securityClearance"
          id="securityClearance"
          displayLabel="Security Clearance"
          options={employmentType}
          style={{ width: "100%", height: 32 }}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="travelPreferences"
          id="travelPreferences"
          variant="outlined"
          displayLabel="Travel Preferences"
          options={employmentType}
          style={{ width: "100%", height: 32 }}
        />
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="openToRelocate"
          id="openToRelocate"
          displayLabel="Open to Relocate"
          variant="outlined"
          options={openToRelocate}
          style={{ width: "100%", height: 32 }}
        />
      </Grid>
    </React.Fragment>
  );
}

export default EmploymentDetails;
