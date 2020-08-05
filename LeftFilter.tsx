import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import { InputLabel, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Chip } from "@material-ui/core";
import React, { useState } from "react";
import { loadCandidates } from "../actions";

const initialValues = {};
const validationSchema = yup.object({});

const buttonStyle = {
  color: "black",
  marginRight: 12,
  backgroundColor: "#83cff6",
  fontSize: 14,
  borderRadius: 5,
};
const titleColor = {
  color: "#404a9b",
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 30,
  marginTop: 30,
};
const chipsStyle = {
  ...buttonStyle,
};
const fieldTitle = {
  color: "#195091",
  fontSize: 12,
  paddingBottom: 8,
};
const searchButtonStyle = {
  backgroundColor: "#d0006b",
  fontSize: 14,
  marginTop: 16,
  width: 90,
  height: 35,
};

export default function LeftFilter(props) {
  const [state, setState] = useState({
    filterTitle: "",
    filterSkills: "",
    filterLocation: "",
    filterTitleList: props.filterData.filterTitle
      ? [props.filterData.filterTitle.title]
      : [],
    filterSkillsList: props.filterData.filterSkills
      ? [props.filterData.filterSkills]
      : [],
    filterLocationList: props.filterData.filterLocation
      ? [props.filterData.filterLocation]
      : [],
    // filterJobSites: ["Dice", "Monster", "LinkedIn", "Career Builder"],
    // selectedFilterJobSites: []
  });
  const handleDelete = (listName, e) => {
    state[listName].splice(state[listName].indexOf(e), 1);
    setState({ ...state, [listName]: state[listName] });
  };
  const handleSearchIcon = () => {
    alert("You clicked the delete icon.");
  };
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };
  const handleOnClick = () => {
    const { dispatch, filterData } = props;
    setState({ ...state, isShowLoader: true, isShowNoResults: false });
    const filterTitle =
      filterData.filterTitle.title === state.filterTitleList.join("")
        ? filterData.filterTitle.value
        : state.filterTitleList.join("");
    if (filterTitle) {
      dispatch(
        loadCandidates({ ...state, filterTitle: { value: filterTitle } })
      );
    }
  };
  const handleKeyUp = (e) => {
    const { target, keyCode } = e;
    const { name, value } = target;
    if (keyCode === 13 && state[name + "List"].indexOf(value) === -1) {
      if (name === "filterTitle" || name === "filterLocation") {
        // const { dispatch } = props;
        // store.dispatch(loadCandidates());
        // dispatch(loadCandidates({ filterTitle: value }));
        state[name + "List"] = [];
      }
      state[name + "List"].push(value);
      setState({ ...state, [name]: "", [name + "List"]: state[name + "List"] });
    }
  };
  /*const handleCheckBox = e => {
    const { target } = e;
    const { name, value } = target;
    const index = state.selectedFilterJobSites.indexOf(value);
    if(index===-1){
      state.selectedFilterJobSites.push(value);
    } else {
      state.selectedFilterJobSites.splice(index,1);
    }
    setState({...state});
  }*/
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}>
      {() => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <div>
              <InputLabel htmlFor="filterJOb" style={titleColor}>
                Filter by Title
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
                      <SearchIcon onClick={handleSearchIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText id="helper-text-forJOb" style={fieldTitle}>
                Filter the job by title
              </FormHelperText>
              {state.filterTitleList.map((i) => (
                <Chip
                  size="medium"
                  label={i}
                  onDelete={() => handleDelete("filterTitleList", i)}
                  style={chipsStyle}
                  key={"filterTitleList" + i}
                />
              ))}
            </div>

            <InputLabel htmlFor="filterJOb" style={titleColor}>
              Filter by Skills
            </InputLabel>
            <div style={{ marginTop: 40 }}>
              <TextField
                value={state.filterSkills}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                name="filterSkills"
                id="filterSkills"
                aria-describedby="my-helper-filterSkills"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText id="helper-text-filterSkills" style={fieldTitle}>
                Filter by skill
              </FormHelperText>
            </div>
            {state.filterSkillsList.map((i) => (
              <Chip
                size="medium"
                label={i}
                onDelete={() => handleDelete("filterSkillsList", i)}
                style={chipsStyle}
                key={"filterSkillsList" + i}
              />
            ))}
            <InputLabel htmlFor="filterJOb" style={titleColor}>
              Filter by Location
            </InputLabel>
            <div style={{ marginTop: 40 }}>
              <TextField
                value={state.filterLocation}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                name="filterLocation"
                id="filterLocation"
                aria-describedby="my-helper-filterLocation"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText
                id="helper-text-filterLocation"
                style={fieldTitle}
              >
                Filter by location
              </FormHelperText>
            </div>
            {state.filterLocationList.map((i) => (
              <Chip
                size="medium"
                label={i}
                onDelete={() => handleDelete("filterLocationList", i)}
                style={chipsStyle}
                key={"filterLocationList" + i}
              />
            ))}
            {/* <div style={{ paddingTop: 40 }}>
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
                  {state.selectedFilterJobSites.length}
                </Avatar>
                <FormGroup aria-label="position" style={{ color: "#00bfff" }}>
                  {state.filterJobSites.map(item => (
                    <FormControlLabel
                      value={item}
                      control={<Checkbox color="primary" />}
                      label={item}
                      labelPlacement="end"
                      onChange={handleCheckBox}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </div> */}
            <Button
              style={searchButtonStyle}
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleOnClick}
            >
              SEARCH
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}
LeftFilter.defaultProps = {
  handleClose: () => {},
};
LeftFilter.propTypes = {
  handleClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  filterData: PropTypes.shape({
    filterTitle: PropTypes.string,
    filterSkills: PropTypes.string,
    filterLocation: PropTypes.string,
  }),
};
