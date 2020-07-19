import React from 'react';
import { Grid } from "@material-ui/core";


const styles = {
  headerStyle: {
    color: "#374c97",
    marginBottom: 0,
    marginTop: 0
  }
};
function Heading(props) {
  const {title} = props;
  return (
    <Grid container style={{ paddingBottom: 0, paddingTop: 16 }}>
      <Grid item lg={12} style={{ paddingBottom: 0, paddingLeft: 10 }}>
        <h3 style={styles.headerStyle}>{title}</h3>
      </Grid>
    </Grid>
  );
}


export default Heading;