import React from "react";
import { AppBar, Toolbar, Grid, Typography, Link } from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import PeopleIcon from "@material-ui/icons/People";
import Router from "next/router";
import { loadCandidatesSuccess, clearAll } from "../actions";
import PropTypes from "prop-types";

const styles = {
  header: {
    backgroundColor: "#27377e"
  },
  headerIcon: {
    width: 21,
    height: 21,
    marginRight: 8
  },
  headerIconContainer: {
    display: "inline-flex",
    padding: "0 24px",
    cursor: "pointer",
    opacity: 0.4,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    textDecoration: "none",
    verticalAlign: "super"
  },
  headerIconContainer_active: {
    display: "inline-flex",
    padding: "0 24px",
    cursor: "pointer",
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    textDecoration: "none",
    verticalAlign: "super"
  }
};
function Header({ dispatch }) {
  const [selectedTab, setSelectedTab] = React.useState("Candidates");
  React.useEffect(() => {
    const route = Router.router.route;
    if (["/AddJobListing", "/ViewJobListing"].indexOf(route) > -1) {
      setSelectedTab("Requisitions");
    } else if (["/AddCandidate", "/SearchResults"].indexOf(route) > -1) {
      setSelectedTab("Candidates");
    } else {
      setSelectedTab("Candidates");
    }
  }, []);
  const goToHomePage = () => {
    dispatch(loadCandidatesSuccess(null));
    dispatch(clearAll());
    Router.push("/");
  };
  const goToOpenReqs = () => {
    Router.push("/ViewJobListing");
    dispatch(clearAll());
  };
  return (
    <AppBar position="static" style={styles.header}>
      <Toolbar style={{ padding: 0, minHeight: 50 }}>
        <Grid container>
          <Grid item style={{ paddingLeft: 24, paddingRight: 24 }}>
            <Typography>
              <img
                src="/static/img/logo.svg"
                style={{
                  cursor: "pointer",
                  paddingTop: 6,
                  opacity: 0.7,
                  height: 40,
                  paddingRight: 40
                }}
              />

              <Link
                href="#"
                color="inherit"
                style={
                  selectedTab === "Candidates"
                    ? styles.headerIconContainer_active
                    : styles.headerIconContainer
                }
                onClick={goToHomePage}
              >
                <PeopleIcon style={styles.headerIcon} />
                <span>Candidates</span>
              </Link>

              <Link
                href="#"
                color="inherit"
                style={
                  selectedTab === "Requisitions"
                    ? styles.headerIconContainer_active
                    : styles.headerIconContainer
                }
                onClick={goToOpenReqs}
              >
                <WorkIcon style={styles.headerIcon} />
                <span>Requisitions</span>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired
};
export default Header;
