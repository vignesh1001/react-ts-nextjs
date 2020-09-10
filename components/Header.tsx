import React from "react";
import { Grid, AppBar, Toolbar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import WorkIcon from "@material-ui/icons/Work";
import PeopleIcon from "@material-ui/icons/People";
import EventIcon from "@material-ui/icons/Event";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const styles = {
  header: {
    backgroundColor: "#27377e",
    color: "#FFF"
  },
  headerIcon: {
    width: 20,
    height: 20,
    paddingRight: 5
  },
  headerIconContainer: {
    display: "inline-flex",
    padding: "0 8px",
    marginTop: 2,
    cursor: "pointer"
  }
};

function Header() {
  return (
    <AppBar position="static" style={styles.header}>
      <Toolbar style={{ minHeight: 50 }}>
        <Grid container>
          <Grid item sm={8} lg={8} md={8} xl={8}>
            Logo
            <span style={styles.headerIconContainer}>
              <SearchIcon style={styles.headerIcon} /> Resume Search
            </span>
            <span style={styles.headerIconContainer}>
              <WorkIcon style={styles.headerIcon} /> Requisitions
            </span>
            <span style={styles.headerIconContainer}>
              <PeopleIcon style={styles.headerIcon} /> Candidates
            </span>
          </Grid>
          <Grid item sm={4} lg={4} md={4} xl={4}>
            2
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
