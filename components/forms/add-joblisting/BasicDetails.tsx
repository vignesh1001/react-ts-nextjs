import React from "react";
import { Grid } from "@material-ui/core";
import Textfield from "../../formfields/TextBox";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import RadioGroupBox from "../../formfields/RadioGroupBox";
import Heading from "./Heading";
import PropTypes from "prop-types";
import {
  countries,
  getStateList,
  workLocation,
  priority,
} from "../../../constants/dropdown";
import {
  clientNames,
  getClientContact,
} from "../../../constants/clientDetails";

const styles = {
  fieldWrapper: { paddingTop: 0, paddingRight: 12 },
  chipsStyle: {
    color: "black",
    marginTop: 5,
    marginRight: 12,
    backgroundColor: "#00bfff",
  },
};

function BasicDetails({ formikProps }) {
  const stateList = getStateList(formikProps.values.country);
  return (
    <React.Fragment>
      {/*<Grid item xs={12} sm={12} style={{ paddingTop: 6, paddingLeft: 0 }}>
        <label style={{ color: "#195091", fontSize: 16, paddingLeft: 2 }}>
          Requsition #{formikProps.values.requisitionNo}
        </label>
  </Grid>*/}
      <Heading title="Candidate Basics" />
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Textfield
          type="number"
          name="noOfPosition"
          id="noOfPosition"
          variant="outlined"
          displayLabel="Number of Position"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="priority"
          id="priority"
          displayLabel="Priority"
          options={priority}
          style={{
            width: "100%",
            height: 49,
          }}
        />
      </Grid>
      <Heading title="Client Info" />
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="clientName"
          id="clientName"
          displayLabel="Client Name"
          options={clientNames}
          style={{
            width: "100%",
            height: 49,
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="clientContact"
          id="clientContact"
          displayLabel="Client Contact"
          options={getClientContact(formikProps.values.clientName)}
          style={{
            width: "100%",
            height: 49,
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Heading title="Location" />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <RadioGroupBox
          name="location"
          id="location"
          variant="outlined"
          options={workLocation}
          color="red"
          style={{ width: 110 }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
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
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
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
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Textfield
          name="city"
          id="city"
          variant="outlined"
          displayLabel="City"
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Textfield name="zip" id="zip" variant="outlined" displayLabel="Zip" />
      </Grid>
    </React.Fragment>
  );
}

BasicDetails.propTypes = {
  formikProps: PropTypes.shape({
    values: PropTypes.shape({
      country: PropTypes.string,
      requisitionNo: PropTypes.string,
      clientName: PropTypes.string,
    }).isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }),
};

export default BasicDetails;
