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
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
const handleDelete = () => {
  alert("You clicked the delete icon.");
};

const initialValues = {};
const validationSchema = yup.object({});

const mystyle = {
  color: "black",
  backgroundColor: "#00bfff"
};

export default function LeftFilter(props) {
  const [state, setState] = useState({
    filterTitle: "",
    filterSkill: "",
    filterTitleList: [],
    filterSkillList: [],
    filterJobSites: ['Dice','Monster','','']
  });
  const handleChange = e => {
    const { target, keyCode } = e;
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };
  const handleKeyUp = e => {
    const { target, keyCode } = e;
    const { name, value } = target;
    if (keyCode === 13) {
      state[name + "List"].push(value);
      setState({ ...state, [name]: "", [name + "List"]: state[name + "List"] });
    }
  };
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
                value={state.filterTitle}
                name="filterTitle"
                onKeyUp={handleKeyUp}
                onChange={handleChange}
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
              <FormHelperText
                id="helper-text-forJOb"
                style={{ paddingBottom: 4 }}
              >
                Filter the job by title
              </FormHelperText>
              {state.filterTitleList.map(item => (
                <Button variant="contained" size="small" style={mystyle}>
                  {item}
                </Button>
              ))}
            </div>

            <div>
              <TextField
                value={state.filterSkill}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                name="filterSkill"
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
            {state.filterSkillList.map(i => (
              <Chip
                size="medium"
                label={i}
                onDelete={handleDelete}
                style={mystyle}
              />
            ))}
            <div style={{ paddingTop: 40 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend" style={{ color: "#00bfff" }}>
                  Filter by other job sites
                </FormLabel>
                <Avatar
                  style={{
                    backgroundColor: "orange",
                    marginLeft: 180,
                    marginTop: -25
                  }}
                >
                  4
                </Avatar>
                <FormGroup aria-label="position" style={{ color: "#00bfff" }}>
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
