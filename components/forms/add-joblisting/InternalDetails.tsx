import React from "react";
import { Grid, Chip } from "@material-ui/core";
import ComboSelectBox from "../../formfields/ComboSelectBox";
import Heading from "./Heading";
import PropTypes from "prop-types";
import { internalContacts } from "../../../constants/internalContacts";
const styles = {
  fieldWrapper: { paddingTop: 0, paddingRight: 12 },
  chipsStyle: {
    color: "black",
    marginTop: 5,
    marginRight: 12,
    backgroundColor: "#00bfff"
  }
};
const internalContactList = internalContacts.map(i => ({
  title: i.Name,
  value: i.Name
}));
const coordinatorList = internalContacts.map(i => ({
  title: i.Name,
  value: i.Name
}));

const recruitingLeadList = internalContacts.map(i => ({
  title: i.Name,
  value: i.Name,
  email: i.Email
}));
const salesLeadList = internalContacts.map(i => ({
  title: i.Name,
  value: i.Name,
  email: i.Email
}));
const recruitersList = internalContacts.map(i => ({
  title: i.Name,
  value: i.Name,
  email: i.Email
}));

function InternalDetails(props) {
  const addNewItem = (listName, item) => () => {
    props.formikProps.values[listName].push(item);
    props.formikProps.setFieldValue(
      listName,
      props.formikProps.values[listName]
    );
  };
  const handleDelete = (listName, e) => {
    props.formikProps.values[listName].splice(
      props.formikProps.values[listName].indexOf(e),
      1
    );
    props.formikProps.setFieldValue(name, props.formikProps.values[listName]);
  };
  return (
    <React.Fragment>
      <Heading title="Internal Details" />
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="internalContact"
          id="internalContact"
          displayLabel="Internal Contact"
          options={internalContactList}
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
          options={coordinatorList}
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
          options={recruitingLeadList}
          style={{
            width: "100%",
            height: 49
          }}
          onChange={e => {
            const { target } = e;
            const { value } = target;
            if (value) {
              props.formikProps.setFieldValue(
                "recruitingLeadsEmail",
                recruitingLeadList.find(i => i.value === value).email
              );
            }
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        <ComboSelectBox
          name="salesLead"
          id="salesLead"
          displayLabel="Sales Lead"
          options={salesLeadList}
          style={{
            width: "100%",
            height: 49
          }}
          onChange={e => {
            const { target } = e;
            const { value } = target;
            if (value) {
              props.formikProps.setFieldValue(
                "salesLeadsEmail",
                salesLeadList.find(i => i.value === value).email
              );
            }
          }}
        />
      </Grid>
      <Heading title="Recruiters" />
      <Grid item xs={6} sm={6} style={styles.fieldWrapper}>
        {/* <label
          style={{
            color: "#374c97",
            paddingRight: 4,
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
            email: "",
          })}
          style={{
            color: "#f4308f",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Assign
        </label> */}
        <ComboSelectBox
          name="recruiter"
          id="recruiter"
          options={recruitersList}
          style={{
            width: "100%",
            height: 49
          }}
          onChange={e => {
            const { target } = e;
            const { value } = target;
            if (value) {
              const recruiters = props.formikProps.values.recruiters;
              const recruiter = recruitersList.find(i => i.value === value);
              recruiters.push({
                name: recruiter.value,
                email: recruiter.email
              });
              props.formikProps.setFieldValue("recruiters", recruiters);
            }
          }}
        />
        {props.formikProps.values.recruiters.map(i => (
          <Chip
            key={"recruiters" + i.name}
            size="medium"
            label={i.name}
            onDelete={() => handleDelete("recruiters", i)}
            style={styles.chipsStyle}
          />
        ))}
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
