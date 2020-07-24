import React from "react";
import PreviewCandidateForm from "../components/forms/PreviewCandidateForm";
import { Box, Grid } from "@material-ui/core";
import Header from "../components/Header";
import { connect } from "react-redux";
function AddCandidate(props){

    return (
        <React.Fragment>
        {/*<Header {...props} />
        <Box my={4}>
            <Grid container>
              <Grid item xs={3} style={{ paddingLeft: 24, paddingRight: 24 }}>
              </Grid>
              <Grid item xs={9} style={{ paddingRight: 24 }}>
                <AddCandidateForm {...props}/>
              </Grid>
            </Grid>
        </Box>*/}
        <PreviewCandidateForm {...props}/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(AddCandidate);