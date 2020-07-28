import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = {
  headerStyle: {
    color: "#374c97",
    marginBottom: 0,
    marginTop: 0,
    fontSize: 16,
    fontWeight: 500,
  },
};
function Heading(props) {
  const { title } = props;
  return (
    <Grid container style={{ paddingBottom: 0, paddingTop: 16 }}>
      <Grid item lg={12} style={{ paddingBottom: 0, paddingLeft: 2 }}>
        <h3 style={styles.headerStyle}>{title}</h3>
      </Grid>
    </Grid>
  );
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Heading;
