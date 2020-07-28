import React from "react";
import Heading from "./Heading";
import { Grid, Chip } from "@material-ui/core";
import Textfield from "../../formfields/TextBox";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import PropTypes from "prop-types";
import { yearOfCompletion,referanceRelations } from "../../../constants/dropdown";

const styles = {
  fieldWrapper: { paddingTop: 0 },
  chipsStyle: {
    color: "black",
    marginTop: 5,
    marginRight: 12,
    backgroundColor: "#00bfff"
  }
};
function TechnicalProfile(props) {
  const handleDelete = (listName, e) => {
    props.formikProps.values[listName].splice(
      props.formikProps.values[listName].indexOf(e),
      1
    );
    props.formikProps.setFieldValue(name, props.formikProps.values[listName]);
  };
  const addNewReferences = () => {
    props.formikProps.setFieldValue(
      "hasReferences",
      !props.formikProps.values.hasReferences
    );
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
      <Heading title="Additional Notes" />
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <Textfield
          name="additionalNotes"
          id="additionalNotes"
          variant="outlined"
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={6} sm={9} style={styles.fieldWrapper}>
        <label
          style={{
            color: "#374c97",
            paddingTop: 15,
            paddingRight: 4
          }}
        >
          Education{" "}
        </label>
        <label
          style={{
            color: "#f4308f",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          Add
        </label>
        {props.formikProps.values.education.map(i => (
          <Chip
            key={"education_chip" + i}
            size="medium"
            label={i}
            onDelete={() => handleDelete("education", i)}
            style={styles.chipsStyle}
          />
        ))}
      </Grid>
      <Grid item xs={6} sm={3} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="yearOfCompletion"
          id="yearOfCompletion"
          displayLabel="Year Of Completion"
          options={yearOfCompletion}
          style={{ width: "100%", height: 49, borderRadius: 4 }}
        />
      </Grid>
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <label
          style={{
            color: "#374c97",
            paddingTop: 15,
            paddingRight: 4
          }}
        >
          Certification(s){" "}
        </label>
        <label
          style={{
            color: "#f4308f",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          Add
        </label>
        {props.formikProps.values.certifications.map(i => (
          <Chip
            key={"certifications_chip" + i}
            size="medium"
            label={i}
            onDelete={() => handleDelete("certifications", i)}
            style={styles.chipsStyle}
          />
        ))}
      </Grid>
      <Grid item xs={12} sm={12} style={styles.fieldWrapper}>
        <label
          style={{
            color: "#374c97",
            paddingTop: 15,
            paddingRight: 4
          }}
        >
          References{" "}
        </label>
        <label
          onClick={addNewReferences}
          style={{
            color: "#f4308f",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          {!props.formikProps.values.hasReferences ? "Add" : "Remove"}
        </label>
        {props.formikProps.values.hasReferences && (
          <React.Fragment>
            <Grid item xs={3} sm={3} style={styles.fieldWrapper}>
              <Textfield
                name="referanceFullName"
                id="referanceFullName"
                variant="outlined"
                displayLabel="Full Name"
              />
            </Grid>
            <Grid item xs={3} sm={3} style={styles.fieldWrapper}>
              <Textfield
                name="referancePosition"
                id="referancePosition"
                variant="outlined"
                displayLabel="Position / Company"
              />
            </Grid>
            <Grid item xs={3} sm={3} style={styles.fieldWrapper}>
              <Textfield
                name="referancePhone"
                id="referancePhone"
                variant="outlined"
                displayLabel="Phone"
              />
            </Grid>
            <Grid item xs={3} sm={3} style={styles.fieldWrapper}>
              <ComboSelectBox
                name="referanceRelation"
                id="referanceRelation"
                displayLabel="Relationship"
                options={referanceRelations}
                style={{ width: "100%", height: 49, borderRadius: 4 }}
              />
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </React.Fragment>
  );
}
TechnicalProfile.propTypes = {
  formikProps: PropTypes.shape({
    values: PropTypes.shape({
      certifications: PropTypes.arrayOf(PropTypes.string),
      education: PropTypes.arrayOf(PropTypes.string),
      hasReferences: PropTypes.bool.isRequired
    }),
    setFieldValue: PropTypes.func.isRequired
  })
};
export default TechnicalProfile;
