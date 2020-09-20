import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    },
    justifyContent: "center"
  }
}));

function CircularLoader(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" style={props.style} />
    </div>
  );
}

CircularLoader.propTypes = {
  style: PropTypes.object.isRequired
};

export default CircularLoader;
