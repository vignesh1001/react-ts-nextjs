import React from "react";
import { Grid, TextField, Link } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Textfield from "../../formfields/Textfield";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import RadioGroupBox from "../../formfields/RadioGroupBox";
import SimpleUploadLink from "../../formfields/SimpleUploadLink";
import Heading from "./Heading";

const top100Films = [
  { title: "The Shawshank Redemption", value: 1994 },
  { title: "The Godfather", value: 1972 },
  { title: "The Godfather: Part II", value: 1974 }
];
const countryList = [
  { title: "US", value: 1 },
  { title: "UK", value: 2 },
  { title: "India", value: 3 }
];

const styles={
  fieldWrapper: { paddingTop: 0 }
}
function ContactBasics(props) {
  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes("image") ? "images" : "videos";
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = e => {
      debugger;
    };
  };
  return (
    <React.Fragment>
      <Heading title="Candidate Basics" />
      <Grid item xs={12} sm={12} style={{ paddingTop: 6 }}>
        <label style={{ color: "#195091", paddingLeft: 8, paddingTop: 15 }}>
          Resume{" "}
        </label>
        <SimpleUploadLink
          onChange={handleCapture}
          labelText="Add"
          name="candidate_resume"
          id="candidate_resume"
          accept="image/*"
        />
      </Grid>
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
          name="state"
          id="state"
          variant="outlined"
          displayLabel="State"
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
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="country"
          id="country"
          displayLabel="Country"
          options={countryList}
          style={{ width: "100%", height: 32 }}
        />
      </Grid>
      <Heading title="Profile Information" />
      <Grid item xs={12} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="immigrationStatus"
          id="immigrationStatus"
          displayLabel="Immigration Status"
          options={top100Films}
          style={{ width: "100%", height: 32 }}
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
      <Grid item xs={12} sm={12} style={{ paddingTop: 6 }}>
        <label style={{ color: "#195091", paddingLeft: 8, paddingTop: 15 }}>
          Work Authorization Form{" "}
        </label>
        <SimpleUploadLink
          onChange={handleCapture}
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

export default ContactBasics;
