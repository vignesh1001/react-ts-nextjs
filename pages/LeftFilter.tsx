import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import {
  InputLabel,
  FormHelperText,
  Slider,
  Switch,
  FormControlLabel,
  Checkbox,
  Link,
  Button
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Chip } from "@material-ui/core";
import React, { useState } from "react";
import { loadCandidates } from "../actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as jobTitles from "../constants/jobTitles";
import { getSkillData, immiStatus } from "../constants/dropdown";
import {
  professionalExpSlider,
  availabilitySlider,
  backSearchSlider
} from "../constants/dropdown";
import { withStyles } from "@material-ui/styles";

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
  marginTop: 16
};
const advancedFilterTitleColor = {
  color: "#404a9b",
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 8
};
const chipsStyle = {
  ...buttonStyle,
  marginBottom: 8
};
const chipsStyleDisable = {
  ...buttonStyle,
  backgroundColor: "lightgray",
  marginBottom: 8
};
const advancedSearchLink = {
  textDecoration: "underline",
  width: "100%",
  textAlign: "left",
  marginBottom: 16,
  marginTop: 16,
  color: "#e32686"
  //display: "none"
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

const SliderCSSComponent = withStyles({
  root: {
    color: "#54bdf1"
  },
  markLabel: {
    color: "#596064",
    fontSize: 12
  },
  thumbColorPrimary: {
    backgroundColor: "#2280c8"
  },
  track: {
    backgroundColor: "#2280c8"
  },
  valueLabel: {
    display: "none"
  }
})(Slider);
const isShowAdvancedSearch = true;
export default function LeftFilter(props) {
  const filterData = props.filterData
    ? props.filterData
    : { filterTitle: "", filterSkills: "", filterLocation: "" };
  const [state, setState] = useState({
    isOnlyActivelyCandidate: true,
    isShowLoader: false,
    isShowAdvSearch: false,
    isShowNoResults: false,
    filterTitle: filterData.filterTitle
      ? jobTitles.default.find(i => i.value === filterData.filterTitle.value)
      : "",
    filterSkills: filterData.filterSkills || [],
    filterLocation: "",
    filterTitleList: filterData.filterTitle
      ? [filterData.filterTitle.title]
      : [],
    filterLocationList: filterData.filterLocation
      ? [filterData.filterLocation]
      : [],
    filterSkills_List: getSkillData(""),
    filterTitle_List: jobTitles.default,
    filterTitleEnteredValue: "",
    filterSkillsEnteredValue: "",
    availability: 20,
    backSearchRange: [20, 60],
    professionalExpRange: [40, 60],
    FilterJobSites: [
      "Internal Conrep",
      "LinkedIn",
      "Dice",
      "Monster",
      "Career Builder"
    ],
    selectedFilterJobSites: [],
    FilterLegalStatus: immiStatus,
    selectedFilterLegalStatus: []
  });
  const handleDelete = (listName, e) => {
    state[listName].splice(state[listName].indexOf(e), 1);
    setState({ ...state, [listName]: state[listName] });
  };

  const handleChange = event => {
    const { target } = event;
    const { name, value } = target;
    if (name === "isOnlyActivelyCandidate") {
      setState({
        ...state,
        isOnlyActivelyCandidate: !state.isOnlyActivelyCandidate
      });
    } else if (name === "filterTitle") {
      const filterSkills = [];
      const filterSkills_List = getSkillData(value || "");
      state.filterSkills.forEach(i => {
        const item = filterSkills_List.find(item => i.title === item.title);
        if (item) {
          filterSkills.push(item);
        }
      });
      setState({
        ...state,
        [name]: value || "",
        filterSkills,
        filterSkills_List
      });
    } else {
      setState({ ...state, [name]: value });
    }
  };
  const handleSliderChange = (event, newValue) => {
    const { id } = event;
    setState({ ...state, [id]: newValue });
  };
  const handleSearch = () => {
    const { dispatch, filterData } = props;
    setState({ ...state, isShowLoader: true, isShowNoResults: false });
    const filterTitle =
      filterData.filterTitle.title === state.filterTitle.title
        ? filterData.filterTitle.value
        : state.filterTitle.value;
    debugger;
    if (
      filterTitle ||
      state.filterSkills.length ||
      state.filterLocationList.length
    ) {
      dispatch(
        loadCandidates({
          ...state,
          filterSkills: state.filterSkills,
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
  const handleCheckBox = e => {
    const { target } = e;
    const { name, value } = target;
    const index = state["selected" + name].indexOf(value);
    if (index === -1) {
      state["selected" + name].push(value);
    } else {
      state["selected" + name].splice(index, 1);
    }
    setState({ ...state });
  };
  const renderAutoComplete = (listName, isMultiple) => {
    const list = state[listName + "_List"];
    return (
      <Autocomplete
        id="combo-box-demo"
        options={list}
        value={state[listName]}
        getOptionLabel={option => option.title}
        multiple={isMultiple}
        style={styles.searchTextField}
        onChange={(e, newValue) => {
          handleChange({
            target: {
              value: newValue,
              name: listName
            }
          });
        }}
        freeSolo
        onKeyUp={e => {
          setState({ ...state, [listName + "EnteredValue"]: e.target.value });
        }}
        renderInput={params => <TextField {...params} variant="outlined" />}
      />
    );
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={e => {
        console.log(e);
        alert("Here");
      }}
    >
      {() => {
        const ExpandOrLess = state.isShowAdvSearch ? ExpandLess : ExpandMore;
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
              <div style={{ marginTop: 8 }}>
                {renderAutoComplete("filterTitle", false)}
              </div>
              <FormHelperText id="helper-text-forJOb" style={fieldTitle}>
                Filter by title
              </FormHelperText>
            </div>

            <InputLabel htmlFor="filterJOb" style={titleColor}>
              Filter by Skills
            </InputLabel>
            <div style={{ marginTop: 8 }}>
              {renderAutoComplete("filterSkills", true)}
              <FormHelperText id="helper-text-filterSkills" style={fieldTitle}>
                Filter by skill
              </FormHelperText>
            </div>
            <InputLabel htmlFor="filterJOb" style={titleColor}>
              Filter by Location
            </InputLabel>
            <div style={{ marginTop: 8 }}>
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
            {isShowAdvancedSearch && (
              <>
                <div
                  style={{
                    marginTop: 16
                  }}
                >
                  <InputLabel
                    htmlFor="filterJOb"
                    style={advancedFilterTitleColor}
                  >
                    Back Search
                  </InputLabel>
                  <SliderCSSComponent
                    valueLabelFormat={value => {
                      return `${
                        backSearchSlider.find(i => i.value == value).tooltip
                      } `;
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
                    onChange={(event, newVal) =>
                      handleSliderChange({ id: "backSearchRange" }, newVal)
                    }
                    style={{ width: "96%", marginLeft: 8 }}
                  />
                </div>
                <div>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                      setState(prevState => ({
                        ...prevState,
                        isShowAdvSearch: !prevState.isShowAdvSearch
                      }));
                    }}
                    style={advancedSearchLink}
                  >
                    Advanced Search
                    <ExpandOrLess
                      color="action"
                      style={{
                        fontSize: 25,
                        position: "absolute",
                        right: 16
                      }}
                    />
                  </Link>
                </div>
                {state.isShowAdvSearch && (
                  <React.Fragment>
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
                    <div style={{ marginTop: 16 }}>
                      <InputLabel
                        htmlFor="filterJOb"
                        style={advancedFilterTitleColor}
                      >
                        Legal Status
                      </InputLabel>
                      <div>
                        {state.FilterLegalStatus.map(i => (
                          <Chip
                            name="FilterLegalStatus"
                            size="medium"
                            label={i.title}
                            onClick={() =>
                              handleCheckBox({
                                target: {
                                  name: "FilterLegalStatus",
                                  value: i.value
                                }
                              })
                            }
                            style={
                              state.selectedFilterLegalStatus.indexOf(i.value) >
                              -1
                                ? chipsStyle
                                : chipsStyleDisable
                            }
                            key={"FilterLegalStatus" + i.value}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <InputLabel
                        htmlFor="filterJOb"
                        style={advancedFilterTitleColor}
                      >
                        Professional Experiance
                      </InputLabel>
                      <SliderCSSComponent
                        valueLabelFormat={value => {
                          return `${
                            professionalExpSlider.find(i => i.value == value)
                              .oValue
                          } Yr`;
                        }}
                        getAriaValueText={value => {
                          return `${value} Year`;
                        }}
                        value={state.professionalExpRange}
                        aria-labelledby="discrete-slider-restrict"
                        step={null}
                        scale={x => x}
                        valueLabelDisplay="auto"
                        marks={professionalExpSlider}
                        name="professionalExpRange"
                        id="professionalExpRange"
                        onChange={(event, newVal) =>
                          handleSliderChange(
                            { id: "professionalExpRange" },
                            newVal
                          )
                        }
                        style={{ width: "98%", marginLeft: 4 }}
                      />
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <InputLabel
                        htmlFor="filterJOb"
                        style={advancedFilterTitleColor}
                      >
                        Availability
                      </InputLabel>
                      <SliderCSSComponent
                        defaultValue={state.availability}
                        valueLabelFormat={value => {
                          return `${
                            availabilitySlider.find(i => i.value == value)
                              .oValue
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
                        style={{ width: "96%", marginLeft: 8 }}
                        onChange={(event, newVal) =>
                          handleSliderChange({ id: "availability" }, newVal)
                        }
                      />
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <InputLabel
                        htmlFor="filterJOb"
                        style={advancedFilterTitleColor}
                      >
                        Filter by Source
                      </InputLabel>
                      {state.FilterJobSites.map(item => (
                        <FormControlLabel
                          key={"FilterJobSites_" + item}
                          value={item}
                          name="FilterJobSites"
                          control={<Checkbox color="default" />}
                          label={item}
                          labelPlacement="end"
                          onChange={handleCheckBox}
                          style={{ color: "#374c97" }}
                        />
                      ))}
                    </div>
                  </React.Fragment>
                )}
              </>
            )}
            <div>
              <Button
                style={searchButtonStyle}
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSearch}
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
