import React from "react";
import Button from "@material-ui/core/Button";
import { DialogActions, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";

const handleDelete = () => {
  alert("You clicked the delete icon.");
};

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};
const validationSchema = yup.object({
  name: yup.string("Enter a name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string("Enter your password")
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Password does not match")
});

const mystyle = {
  color: "black",
  backgroundColor: "lightblue"
};

export default function LeftFilter(props) {
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}>
      {formikProps => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <div>
              <InputLabel htmlFor="filterJOb" style={{ color: "Darkblue" }}>
                Filter the job by title
              </InputLabel>
              <TextField
                id="filterJOb"
                aria-describedby="helper-text-forJOb"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <FormHelperText id="helper-text-forJOb" style={{paddingBottom:4}}>
                Filter the job by title
              </FormHelperText>
              <Button variant="contained" size="small" style={mystyle}>
                Front end developres
              </Button>
            </div>
            
            <div>
              <br />
              <br />
              <TextField
                id="filterSkill"
                aria-describedby="my-helper-forSkill"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <FormHelperText id="helper-text-forSkill">
                Filter by skill
              </FormHelperText>
            </div>
            <br />
              <Chip
                size="medium"
                label="Javascript"
                onDelete={handleDelete}
                style={mystyle}
              />
              <Chip
                size="medium"
                label="CSS"
                onDelete={handleDelete}
                style={mystyle}
              />
              <Chip
                size="medium"
                label="HTML5"
                onDelete={handleDelete}
                style={mystyle}
              />
              <Chip
                size="medium"
                label="LERS"
                onDelete={handleDelete}
                style={mystyle}
              />
              <Chip
                size="medium"
                label="SASS"
                onDelete={handleDelete}
                style={mystyle}
              />
            <div style={{paddingTop:40}}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Filter by other job sites
                </FormLabel>
                <FormGroup aria-label="position">
                  <FormControlLabel
                    value="Dice"
                    control={<Checkbox color="primary" />}
                    label="Dice"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Monster"
                    control={<Checkbox color="primary" />}
                    label="Monster"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="LinkedIn"
                    control={<Checkbox color="primary" />}
                    label="LinkedIn"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Career Builder"
                    control={<Checkbox color="primary" />}
                    label="Career Builder"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
LeftFilter.defaultProps = {
  handleClose: () => {}
};
LeftFilter.propTypes = {
  handleClose: PropTypes.func.isRequired
};
