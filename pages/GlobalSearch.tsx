import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment, FormHelperText } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { addFilterCriteria } from "../actions";
import Router from "next/router";
import PropTypes from "prop-types";
import CircularLoader from "../components/CircularLoader";
import Header from "../components/Header";
import * as jobTitles from "../constants/jobTitles";

const THEME = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});
const styles = {
  helperText: {
    color: "#195091",
    fontSize: 12,
    paddingLeft: 10,
    paddingBottom: 10
  },
  searchContainerStyle: {
    color: "black",
    backgroundColor: "#eefaff",
    marginTop: 150,
    width: "90%",
    margin: "auto",
    padding: "10px 50px"
  },
  searchHeaderText: {
    fontSize: 60,
    color: "#4a4a4a",
    margin: "10px 0",
    fontWeight: "normal"
  },
  searchButtonStyle: {
    backgroundColor: "#d0006b",
    fontSize: 14,
    marginTop: 5,
    width: 150,
    height: 50
  },
  searchTextField: {
    color: "#4a4a4a",
    width: "100%",
    borderRadius: 6,
    border: "2px solid #195091"
  }
};

function GlobalSearch(props) {
  const [state, setState] = useState({
    filterTitle: "",
    filterTitleEnteredValue: "",
    filterSkills: "",
    filterLocation: "",
    isShowLoader: false,
    isShowNoResults: false,
    isShowAPIError: false
  });

  const handleOnChange = event => {
    const { target } = event;
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };
  const handleOnClick = () => {
    const { dispatch } = props;
    setState({ ...state, isShowLoader: true, isShowNoResults: false });
    const filterTitle = state.filterTitle
      ? state.filterTitle
      : {
          title: state.filterTitleEnteredValue,
          value: state.filterTitleEnteredValue
        };
    dispatch(addFilterCriteria({ ...state, filterTitle }));
  };

  useEffect(() => {
    if (
      props.candidates &&
      props.candidates.candidateList &&
      props.candidates.candidateList.length
    ) {
      Router.push("/SearchResults");
    } else if (
      props.candidates &&
      props.candidates.candidateList &&
      props.candidates.candidateList.length === 0
    ) {
      setState({
        ...state,
        isShowLoader: false,
        isShowNoResults: true,
        isShowAPIError: false
      });
    } else if (props.candidates && props.candidates.error) {
      setState({
        ...state,
        isShowLoader: false,
        isShowAPIError: true,
        isShowNoResults: false
      });
    }
  }, [props.candidates]);

  const renderAutoComplete = (list, listName) => {
    const filterTitle = state[listName]
      ? state[listName]
      : {
          title: state[listName + "EnteredValue"],
          value: state[listName + "EnteredValue"]
        };
    return (
      <Autocomplete
        id="combo-box-demo"
        options={list}
        getOptionLabel={option => option.title}
        style={styles.searchTextField}
        onChange={(e, newValue) => {
          handleOnChange({
            target: {
              value: newValue && newValue.value ? newValue : "",
              name: listName
            }
          });
        }}
        freeSolo
        title={filterTitle.title}
        onKeyUp={e => {
          setState({ ...state, [listName + "EnteredValue"]: e.target.value });
        }}
        renderInput={params => <TextField {...params} variant="outlined" />}
      />
    );
  };
  const renderSearch = () => (
    <div style={{ height: "86vh", width: "100%", display: "flex" }}>
      <div style={styles.searchContainerStyle}>
        <h1 style={styles.searchHeaderText}>Search</h1>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            {/* <TextField
              style={styles.searchTextField}
              value={state.filterTitle}
              onChange={handleOnChange}
              name="filterTitle"
              id="filterTitle"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            /> */}
            {renderAutoComplete(jobTitles.default, "filterTitle")}
            <FormHelperText
              id="helper-text-filterTitle"
              style={styles.helperText}
            >
              Search by Candidates or Job Titles
            </FormHelperText>
          </Grid>
          <Grid item lg={3}>
            {/*<TextField
              style={styles.searchTextField}
              value={state.filterSkills}
              onChange={handleOnChange}
              name="filterSkills"
              id="filterSkills"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />*/}
            {renderAutoComplete(jobTitles.default, "filterSkills")}
            <FormHelperText
              id="helper-text-filterSkills"
              style={styles.helperText}
            >
              Search by Skills
            </FormHelperText>
          </Grid>
          <Grid item lg={3}>
            <TextField
              style={styles.searchTextField}
              value={state.filterLocation}
              onChange={handleOnChange}
              name="filterLocation"
              id="filterLocation"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <RoomIcon />
                  </InputAdornment>
                )
              }}
            />
            <FormHelperText
              id="helper-text-filterLocation"
              style={styles.helperText}
            >
              Search by City, State, or Zip
            </FormHelperText>
          </Grid>
          <Grid item lg={3}>
            <Button
              style={styles.searchButtonStyle}
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleOnClick}
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>
        {state.isShowLoader && (
          <CircularLoader
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              marginTop: -160
            }}
          />
        )}
        {state.isShowNoResults && (
          <span style={{ color: "#666666", fontSize: 16 }}>
            No results found, please expand your search
          </span>
        )}
        {state.isShowAPIError && (
          <span style={{ color: "#666666", fontSize: 16 }}>
            API Service Error
          </span>
        )}
      </div>
    </div>
  );
  return (
    <MuiThemeProvider theme={THEME}>
      <Box>
        <Header {...props} />
        <Box my={4}>
          <Grid container style={{ height: "80vh" }}>
            {renderSearch()}
          </Grid>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}

GlobalSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidates: PropTypes.object
};
const mapStateToProps = state => state;

export default connect(mapStateToProps)(GlobalSearch);
