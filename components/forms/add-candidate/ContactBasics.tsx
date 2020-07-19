import React from "react";
import { Grid } from "@material-ui/core";
import Textfield from "../../formfields/Textfield";


const styles = {
  headerStyle: {
    color: "#374c97",
    marginBottom: 0
  }
};
function ContactBasics(props) {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item lg={12} style={{ paddingBottom: 0, paddingLeft: 20 }}>
          <h3 style={styles.headerStyle}>Candidate Basics</h3>
        </Grid>
      </Grid>
      <Grid item lg={4}>
        <Textfield
          name="fullName"
          id="fullName"
          variant="outlined"
          displayLabel="First Name"
          fullWidth
          required
        />
      </Grid>
      <Grid item lg={4}>
        <Textfield
          name="emailAddress"
          id="emailAddress"
          variant="outlined"
          displayLabel="Emaill Address"
        />
      </Grid>
      <Grid item lg={4}>
        <Textfield
          name="phone"
          id="phone"
          variant="outlined"
          displayLabel="Phone Number"
          maxlength="12"
        />
      </Grid>
    </React.Fragment>
  );
}

export default ContactBasics;
