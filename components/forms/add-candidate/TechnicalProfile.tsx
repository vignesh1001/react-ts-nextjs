import React from "react";
import Heading from "./Heading";
import { Grid } from "@material-ui/core";
import Textfield from "../../formfields/Textfield";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import SimpleUploadLink from "../../formfields/SimpleUploadLink";

const yearOfCompletion = [
  { title: "2000", value: "2000" },
  { title: "2001", value: "2001" },
  { title: "2002", value: "2002" },
  { title: "2003", value: "2003" },
  { title: "2004", value: "2004" }
];
const styles = {
  fieldWrapper: { paddingTop: 0 }
};
function TechnicalProfile() {
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
      <Heading title="Technical Profile" />
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Textfield
          name="positionTitle"
          id="positionTitle"
          variant="outlined"
          displayLabel="Position Title"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <Textfield
          name="professionalExperience"
          id="professionalExperience"
          variant="outlined"
          displayLabel="Professional Experience"
        />
      </Grid>
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <Textfield
          name="primarySkills"
          id="primarySkills"
          variant="outlined"
          displayLabel="Primary Skills"
        />
      </Grid>
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <Textfield
          name="otherSkills"
          id="otherSkills"
          variant="outlined"
          displayLabel="Other Skills"
        />
      </Grid>
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <Textfield
          name="additionalNotes"
          id="additionalNotes"
          variant="outlined"
          multiline
          rows={4}
          displayLabel="Additional Notes"
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <label
          style={{
            color: "#195091",
            paddingLeft: 8,
            paddingTop: 15,
            paddingRight: 4
          }}
        >
          Education{" "}
        </label>
        <SimpleUploadLink
          onChange={handleCapture}
          labelText="Add"
          name="education"
          id="education"
          accept="image/*"
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="yearOfCompletion"
          id="yearOfCompletion"
          displayLabel="Year Of Completion"
          options={yearOfCompletion}
          style={{ width: "100%", height: 24 }}
        />
      </Grid>
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <label
          style={{
            color: "#195091",
            paddingLeft: 8,
            paddingTop: 15,
            paddingRight: 4
          }}
        >
          Certification(s){" "}
        </label>
        <SimpleUploadLink
          onChange={handleCapture}
          labelText="Add"
          name="certifications"
          id="certifications"
          accept="image/*"
        />
      </Grid>
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <label
          style={{
            color: "#195091",
            paddingLeft: 8,
            paddingTop: 15,
            paddingRight: 4
          }}
        >
          References{" "}
        </label>
        <SimpleUploadLink
          onChange={handleCapture}
          labelText="Add"
          name="references"
          id="references"
          accept="image/*"
        />
      </Grid>
    </React.Fragment>
  );
}

export default TechnicalProfile;
