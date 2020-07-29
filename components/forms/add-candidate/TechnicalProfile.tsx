import React from "react";
import Heading from "./Heading";
import { Grid } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Textfield from "../../formfields/TextBox";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import PropTypes from "prop-types";
import {
  yearOfCompletion,
  referanceRelations,
} from "../../../constants/dropdown";

const styles = {
  fieldWrapper: { paddingTop: 0 },
  chipsStyle: {
    color: "black",
    marginTop: 5,
    marginRight: 12,
    backgroundColor: "#00bfff",
  },
};
function TechnicalProfile(props) {
  const addNewItem = (listName, item) => () => {
    props.formikProps.values[listName].push(item);
    props.formikProps.setFieldValue(
      listName,
      props.formikProps.values[listName]
    );
  };
  const removeItem = (listName, idx) => () => {
    props.formikProps.values[listName].splice(idx, 1);
    props.formikProps.setFieldValue(
      listName,
      props.formikProps.values[listName]
    );
  };
  const updateFieldElement = (listName, fieldName, idx) => (e) => {
    props.formikProps.values[listName][idx][fieldName] = e.target.value;
    props.formikProps.setFieldValue(
      listName,
      props.formikProps.values[listName]
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
      <Grid item xs={12} sm={12} style={{ paddingTop: 10 }}>
        <label
          style={{
            color: "#374c97",
            paddingRight: 4,
          }}
        >
          Education{" "}
        </label>
        <label
          style={{
            color: "#f4308f",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={addNewItem("educations", {
            education: "",
            yearOfCompletion: "",
          })}
        >
          Add
        </label>
      </Grid>

      {props.formikProps.values.educations.map((item, idx) => (
        <React.Fragment key={"educations_" + idx}>
          <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
            <Textfield
              name={"education_" + idx}
              id={"education_" + idx}
              variant="outlined"
              displayLabel="Education"
              value={item.education}
              onChange={updateFieldElement("educations", "education", idx)}
            />
          </Grid>
          <Grid item xs={5} sm={5} style={styles.fieldWrapper}>
            <ComboSelectBox
              name={"yearOfCompletion_" + idx}
              id={"yearOfCompletion_" + idx}
              value={item.yearOfCompletion}
              displayLabel="Year Of Completion"
              options={yearOfCompletion}
              style={{ width: "100%", height: 49, borderRadius: 4 }}
              onChange={updateFieldElement(
                "educations",
                "yearOfCompletion",
                idx
              )}
            />
          </Grid>
          <Grid item xs={1} sm={1} style={styles.fieldWrapper}>
            <CancelIcon
              htmlColor="gray"
              style={{ marginTop: 20, cursor: "pointer" }}
              onClick={removeItem("educations", idx)}
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12} sm={12} style={{ paddingTop: 10 }}>
        <label
          style={{
            color: "#374c97",
            paddingRight: 4,
          }}
        >
          Certification(s){" "}
        </label>
        <label
          style={{
            color: "#f4308f",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={addNewItem("certifications", {
            certification: "",
            yearOfCompletion: "",
          })}
        >
          Add
        </label>
      </Grid>
      {props.formikProps.values.certifications.map((item, idx) => (
        <React.Fragment key={"certifications_" + idx}>
          <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
            <Textfield
              name={"certification_" + idx}
              id={"certification_" + idx}
              variant="outlined"
              displayLabel="Certification"
              value={item.education}
              onChange={updateFieldElement(
                "certifications",
                "certification",
                idx
              )}
            />
          </Grid>
          <Grid item xs={5} sm={5} style={styles.fieldWrapper}>
            <ComboSelectBox
              name={"c_yearOfCompletion_" + idx}
              id={"c_yearOfCompletion_" + idx}
              value={item.yearOfCompletion}
              displayLabel="Year Of Completion"
              options={yearOfCompletion}
              style={{ width: "100%", height: 49, borderRadius: 4 }}
              onChange={updateFieldElement(
                "certifications",
                "yearOfCompletion",
                idx
              )}
            />
          </Grid>
          <Grid item xs={1} sm={1} style={styles.fieldWrapper}>
            <CancelIcon
              htmlColor="gray"
              style={{ marginTop: 20, cursor: "pointer" }}
              onClick={removeItem("certifications", idx)}
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12} sm={12} style={{ paddingTop: 10, paddingBottom: 10 }}>
        <label
          style={{
            color: "#374c97",
            paddingRight: 4,
          }}
        >
          References{" "}
        </label>
        <label
          onClick={addNewItem("references", {
            fullName: "",
            position: "",
            relationship: "",
            phone: "",
            email: "",
          })}
          style={{
            color: "#f4308f",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Add
        </label>
      </Grid>
      {props.formikProps.values.references.map((item, idx) => (
        <React.Fragment key={"_references_" + idx}>
          <Grid item xs={7} sm={7} style={styles.fieldWrapper}>
            <Textfield
              name={"r_fullName_" + idx}
              id={"r_fullName_" + idx}
              variant="outlined"
              displayLabel="Full Name"
            />
          </Grid>
          <Grid item xs={4} sm={4} style={styles.fieldWrapper}>
            <Textfield
              name={"r_position_" + idx}
              id={"r_position_" + idx}
              variant="outlined"
              displayLabel="Position / Company"
            />
          </Grid>
          <Grid item xs={1} sm={1} style={styles.fieldWrapper}>
            <CancelIcon
              htmlColor="gray"
              style={{ marginTop: 20, cursor: "pointer" }}
              onClick={removeItem("references", idx)}
            />
          </Grid>
          <Grid item xs={4} sm={4} style={styles.fieldWrapper}>
            <ComboSelectBox
              name={"r_relationship_" + idx}
              id={"r_relationship_" + idx}
              displayLabel="Relationship"
              options={referanceRelations}
              style={{ width: "100%", height: 49, borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={4} sm={4} style={styles.fieldWrapper}>
            <Textfield
              name={"r_phone_" + idx}
              id={"r_phone_" + idx}
              variant="outlined"
              displayLabel="Phone"
            />
          </Grid>
          <Grid item xs={4} sm={4} style={styles.fieldWrapper}>
            <Textfield
              name={"r_email_" + idx}
              id={"r_email_" + idx}
              variant="outlined"
              displayLabel="Email"
            />
          </Grid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
TechnicalProfile.propTypes = {
  formikProps: PropTypes.shape({
    values: PropTypes.shape({
      certifications: PropTypes.arrayOf(
        PropTypes.shape({
          certification: PropTypes.string,
          yearOfCompletion: PropTypes.string,
        })
      ),
      educations: PropTypes.arrayOf(
        PropTypes.shape({
          education: PropTypes.string,
          yearOfCompletion: PropTypes.string,
        })
      ),
      references: PropTypes.arrayOf(
        PropTypes.shape({
          fullName: PropTypes.string,
          position: PropTypes.string,
          relationship: PropTypes.string,
          phone: PropTypes.string,
          email: PropTypes.string,
        })
      ),
    }),
    setFieldValue: PropTypes.func.isRequired,
  }),
};
export default TechnicalProfile;
