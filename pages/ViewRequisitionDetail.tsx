import React from "react";
import { Box, Grid } from "@material-ui/core";
import Header from "../components/Header";
import { connect } from "react-redux";
import ViewRequisitionDetail from "../components/forms/view-requisition-detail/ViewRequisitionDetail";

const ViewRequisition = props => {
  return (
    <React.Fragment>
      <Header {...props} />
      <Box my={4}>
        <Grid container>
          <Grid item xs={3} style={{ paddingLeft: 24, paddingRight: 24 }} />
          <Grid item xs={9} style={{ paddingRight: 24 }}>
            <ViewRequisitionDetail {...props} />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ViewRequisition);