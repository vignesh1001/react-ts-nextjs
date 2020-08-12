import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import { InputLabel, FormHelperText, Slider, Switch } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Chip } from "@material-ui/core";
import React, { useState } from "react";
import { loadCandidates } from "../actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as jobTitles from "../constants/jobTitles";
import {
  professionalExpSlider,
  availabilitySlider,
  backSearchSlider
} from "../constants/dropdown";

const styles = {
  searchTextField: {
    color: "#4a4a4a",
    width: "100%",
    border: "none"
  }
};
const initialValues = {};
const validationSchema = yup.object({});

const buttonStyle = {
  color: "black",
  marginRight: 12,
  backgroundColor: "#83cff6",
  fontSize: 14,
  borderRadius: 5
};
const titleColor = {
  color: "#404a9b",
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 30,
  marginTop: 30
};
const advancedFilterTitleColor = {
  color: "#404a9b",
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 10
};
const chipsStyle = {
  ...buttonStyle
};
const fieldTitle = {
  color: "#195091",
  fontSize: 12,
  paddingBottom: 8
};
const searchButtonStyle = {
  backgroundColor: "#d0006b",
  fontSize: 14,
  marginTop: 16,
  width: 90,
  height: 35
};

export default function LeftFilter(props) {
  const [state, setState] = useState({
    isOnlyActivelyCandidate: true,
    isShowLoader: false,
    isShowNoResults: false,
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
    filterTitleEnteredValue: "",
    backSearchRange: [33, 49]
    // filterJobSites: ["Dice", "Monster", "LinkedIn", "Career Builder"],
    // selectedFilterJobSites: []
  });
  const handleDelete = (listName, e) => {
    state[listName].splice(state[listName].indexOf(e), 1);
    setState({ ...state, [listName]: state[listName] });
  };
  /*const handleSearchIcon = () => {
    alert("You clicked the delete icon.");
  };*/
  const handleChange = e => {
    const { target } = e;
    const { name, value } = target;
    if (name === "isOnlyActivelyCandidate") {
      setState({
        ...state,
        isOnlyActivelyCandidate: !state.isOnlyActivelyCandidate
      });
    } else {
      setState({ ...state, [name]: value });
    }
  };
  const handleSliderChange = (event, newValue) => {
    const { id } = event;
    setState({ ...state, [id]: newValue });
    console.log("->", event, newValue);
    // setValue(newValue);
  };
  const handleOnClick = () => {
    const { dispatch, filterData } = props;
    setState({ ...state, isShowLoader: true, isShowNoResults: false });
    const filterTitle =
      filterData.filterTitle.title === state.filterTitleList.join("")
        ? filterData.filterTitle.value
        : state.filterTitleList.join("");
    if (
      filterTitle ||
      state.filterSkillsList.length ||
      state.filterLocationList.length
    ) {
      dispatch(
        loadCandidates({
          filterSkills: state.filterSkillsList.join(","),
          filterTitle: { value: filterTitle },
          filterLocation: state.filterLocationList.join(",")
        })
      );
    }
  };
  const handleKeyUp = e => {
    const { target, keyCode } = e;
    const { name, value } = target;
    if (value && keyCode === 13 && state[name + "List"].indexOf(value) === -1) {
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
  const renderAutoComplete = () => {
    const jobTitlesList = jobTitles.default;
    let filterTitle = state.filterTitleList.length
      ? jobTitlesList.find(item => item.title === state.filterTitleList[0])
      : {
          title: state.filterTitleEnteredValue,
          value: state.filterTitleEnteredValue
        };

    filterTitle = jobTitlesList.find(
      item => item.title === "JUNIOR DATA SCIENTIST"
    );
    return (
      <Autocomplete
        value={filterTitle}
        id="combo-box-demo"
        options={jobTitlesList}
        getOptionLabel={option => option.title}
        style={styles.searchTextField}
        onChange={(e, newValue) => {
          handleKeyUp({
            target: {
              name: "filterTitle",
              value: newValue && newValue.value ? newValue.value : ""
            },
            keyCode: 13
          });
        }}
        freeSolo
        searchText={filterTitle.title}
        onKeyUp={e => {
          setState({ ...state, filterTitleEnteredValue: e.target.value });
        }}
        renderInput={params => <TextField {...params} />}
      />
    );
  };
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}>
      {() => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <div>
              <InputLabel htmlFor="filterJOb" style={titleColor}>
                Filter by Title
              </InputLabel>
              {renderAutoComplete()}
              {/*<TextField
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
              />*/}
              <FormHelperText id="helper-text-forJOb" style={fieldTitle}>
                Filter the job by title
              </FormHelperText>
              {/*state.filterTitleList.map((i) => (
                <Chip
                  size="medium"
                  label={i}
                  onDelete={() => handleDelete("filterTitleList", i)}
                  style={chipsStyle}
                  key={"filterTitleList" + i}
                />
              ))*/}
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
                  )
                }}
              />
              <FormHelperText id="helper-text-filterSkills" style={fieldTitle}>
                Filter by skill
              </FormHelperText>
            </div>
            {state.filterSkillsList.map(i => (
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
                  )
                }}
              />
              <FormHelperText
                id="helper-text-filterLocation"
                style={fieldTitle}
              >
                Filter by location
              </FormHelperText>
            </div>
            {state.filterLocationList.map(i => (
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
            <div style={{ width: "90%", marginLeft: 10, marginTop: 16 }}>
              <InputLabel htmlFor="filterJOb" style={advancedFilterTitleColor}>
                Back Search
              </InputLabel>
              <Slider
                defaultValue={33}
                valueLabelFormat={value => {
                  return `${
                    backSearchSlider.find(i => i.value == value).oValue
                  } Yr`;
                }}
                getAriaValueText={value => {
                  return `${value} Year`;
                }}
                value={state.backSearchRange}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                scale={x => x}
                valueLabelDisplay="auto"
                marks={backSearchSlider}
                name="backSearchRange"
                id="backSearchRange"
                onChange={handleSliderChange}
              />
            </div>
            <div style={{ paddingBottom: 10, minHeight: 30 }}>
              <InputLabel htmlFor="filterJOb" style={titleColor}>
                <div style={{ width: "80%", float: "left" }}>
                  Only Actively Looking Candidates
                </div>
                <div
                  style={{
                    width: "20%",
                    float: "left",
                    marginTop: -12,
                    textAlign: "right"
                  }}
                >
                  <Switch
                    checked={state.isOnlyActivelyCandidate}
                    onChange={handleChange}
                    name="isOnlyActivelyCandidate"
                    color="secondary"
                    style={{ float: "right" }}
                  />
                </div>
              </InputLabel>
            </div>
            <div style={{ width: "90%", marginLeft: 10, marginTop: 16 }}>
              <InputLabel htmlFor="filterJOb" style={advancedFilterTitleColor}>
                Legal Status
              </InputLabel>
            </div>
            <div style={{ width: "90%", marginLeft: 10, marginTop: 16 }}>
              <InputLabel htmlFor="filterJOb" style={advancedFilterTitleColor}>
                Professional Experiance
              </InputLabel>
              <Slider
                defaultValue={33}
                valueLabelFormat={value => {
                  return `${
                    professionalExpSlider.find(i => i.value == value).oValue
                  } Yr`;
                }}
                getAriaValueText={value => {
                  return `${value} Year`;
                }}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={professionalExpSlider}
              />
            </div>
            <div style={{ width: "90%", marginLeft: 10, marginTop: 16 }}>
              <InputLabel htmlFor="filterJOb" style={advancedFilterTitleColor}>
                Availability
              </InputLabel>
              <Slider
                defaultValue={33}
                valueLabelFormat={value => {
                  return `${
                    availabilitySlider.find(i => i.value == value).oValue
                  } Yr`;
                }}
                getAriaValueText={value => {
                  return `${value} Year`;
                }}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                scale={x => x}
                valueLabelDisplay="auto"
                marks={availabilitySlider}
              />
            </div>
            <div>
              <Button
                style={searchButtonStyle}
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleOnClick}
              >
                SEARCH
              </Button>
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
  handleClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  filterData: PropTypes.shape({
    filterTitle: PropTypes.string,
    filterSkills: PropTypes.string,
    filterLocation: PropTypes.string
  })
};
