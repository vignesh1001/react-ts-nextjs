import React from "react";
import { Grid, Chip } from "@material-ui/core";
import Textfield from "../../formfields/TextBox";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import RadioGroupBox from "../../formfields/RadioGroupBox";
import SimpleUploadLink from "../../formfields/SimpleUploadLink";
import Heading from "./Heading";
import PropTypes from "prop-types";
import {
  countries,
  immiStatus,
  USA_STATE,
  INDIA_STATE,
  getStateList,
  workType,
  employmentWorkingType
} from "../../../constants/dropdown";

const styles = {
  fieldWrapper: { paddingTop: 0, paddingRight: 12 },
  chipsStyle: {
    color: "black",
    marginTop: 5,
    marginRight: 12,
    backgroundColor: "#00bfff"
  }
};

function InternalDetails(props) {
  const handleFileUpload = ({ target }) => {
    const { name, files } = target;
    var fileList = props.formikProps.values[name];
    for (var i = 0; i < files.length; i++) {
      fileList.push(files[i]);
    }
    props.formikProps.setFieldValue(name, fileList);
  };
  const handleDelete = (listName, e) => {
    props.formikProps.values[listName].splice(
      props.formikProps.values[listName].indexOf(e),
      1
    );
    props.formikProps.setFieldValue(name, props.formikProps.values[listName]);
  };
  const addNewItem = (listName, item) => () => {
    props.formikProps.values[listName].push(item);
    props.formikProps.setFieldValue(
      listName,
      props.formikProps.values[listName]
    );
  };
  const stateList = getStateList(props.formikProps.values.country);
  return (
    <React.Fragment>
      <Heading title="Internal Details" />
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="internalContact"
          id="internalContact"
          displayLabel="Internal Contact"
          options={countries}
          style={{
            width: "100%",
            height: 49
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="coordinator"
          id="coordinator"
          displayLabel="co-ordinator"
          options={countries}
          style={{
            width: "100%",
            height: 49
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="recruitingLead"
          id="recruitingLead"
          displayLabel="Recruiting Lead"
          options={countries}
          style={{
            width: "100%",
            height: 49
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="salesLead"
          id="salesLead"
          displayLabel="Sales Lead"
          options={countries}
          style={{
            width: "100%",
            height: 49
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} style={{ paddingTop: 10, paddingBottom: 10 }}>
        <label
          style={{
            color: "#374c97",
            paddingRight: 4
          }}
        >
          Recruiters{" "}
        </label>
        <label
          onClick={addNewItem("recruiters", {
            fullName: "",
            position: "",
            relationship: "",
            phone: "",
            email: ""
          })}
          style={{
            color: "#f4308f",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          Assign
        </label>
      </Grid>
    </React.Fragment>
  );
}

InternalDetails.propTypes = {
  formikProps: PropTypes.shape({
    values: PropTypes.shape({
      candidate_resume: PropTypes.arrayOf(PropTypes.string.isRequired)
    }).isRequired,
    setFieldValue: PropTypes.func.isRequired
  })
};

export default InternalDetails;
