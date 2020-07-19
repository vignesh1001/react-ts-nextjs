import React from "react";
import { Grid,TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Textfield from "../../formfields/Textfield";


const styles = {
  headerStyle: {
    color: "#374c97",
    marginBottom: 0,
    marginTop: 0
  }
};
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 }
];

function renderAutocomplete() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
}
function renderSection(name) {
  return (
    <Grid container style={{ paddingBottom: 0, paddingTop: 0 }}>
      <Grid item lg={12} style={{ paddingBottom: 0, paddingLeft: 10 }}>
        <h3 style={styles.headerStyle}>{name}</h3>
      </Grid>
    </Grid>
  );
}
function ContactBasics(props) {
  return (
    <React.Fragment>
      {renderSection("Candidate Basics")}
      <Grid item xs={6} sm={4} style={{ paddingTop: 0 }}>
        <Textfield
          name="fullName"
          id="fullName"
          variant="outlined"
          displayLabel="Full Name"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6} sm={4} style={{ paddingTop: 0 }}>
        <Textfield
          name="emailAddress"
          id="emailAddress"
          variant="outlined"
          displayLabel="Emaill Address"
        />
      </Grid>
      <Grid item xs={4} sm={4} style={{ paddingTop: 0 }}>
        <Textfield
          name="phone"
          id="phone"
          variant="outlined"
          displayLabel="Phone"
          maxlength="12"
        />
      </Grid>
      {renderSection("Location")}
      <Grid item xs={6} sm={3} style={{ paddingTop: 0 }}>
        <Textfield
          name="city"
          id="city"
          variant="outlined"
          displayLabel="City"
          maxlength="12"
        />
      </Grid>
      <Grid item xs={6} sm={3} style={{ paddingTop: 0 }}>
        <Textfield
          name="state"
          id="state"
          variant="outlined"
          displayLabel="State"
          maxlength="12"
        />
      </Grid>
      <Grid item xs={6} sm={3} style={{ paddingTop: 0 }}>
        <Textfield
          name="zip"
          id="zip"
          variant="outlined"
          displayLabel="Zip"
          maxlength="12"
        />
      </Grid>
      <Grid item xs={6} sm={3} style={{ paddingTop: 0 }}>
        <Textfield
          name="country"
          id="country"
          variant="outlined"
          displayLabel="Country"
          maxlength="12"
        />
      </Grid>
      {renderSection("Profile Information")}
      <Grid item xs={6} sm={3} style={{ paddingTop: 0 }}>
        {renderAutocomplete()}
      </Grid>
      <Grid item xs={6} sm={3} style={{ paddingTop: 0 }}>
        <Textfield
          name="country"
          id="country"
          variant="outlined"
          displayLabel="Country"
          maxlength="12"
        />
      </Grid>
      <Grid item xs={6} sm={3} style={{ paddingTop: 0 }}>
        <Textfield
          name="country"
          id="country"
          variant="outlined"
          displayLabel="Country"
          maxlength="12"
        />
      </Grid>
    </React.Fragment>
  );
}

export default ContactBasics;
