import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import ViewDetail from "./ViewDetail";
import Router from "next/router";

function ViewRequisitionDetail({ dispatch }) {
  const [state, setState] = React.useState({ selectedJobListing: {} });
  React.useEffect(() => {
    localStorage.setItem(
      "setSelectedJobListing",
      JSON.stringify({
        requisitionNumber: 1629,
        numberOfPositions: "1",
        priority: "high",
        clientInfo: {
          clientName: "Peterson Technology partners",
          clientContact: "999-999-9999"
        },
        location: {
          workType: "onsite/remote",
          city: "chicago",
          state: "illinois",
          zip: "60169",
          country: "USA"
        },
        employmentType: "Fulltime/Contract to Hire",
        duration: "",
        compensationDetails: {
          wages: "Hourly",
          clientBillRate: "",
          payRate: ""
        },
        positionDetails: {
          positionTitle: "Data Engineer",
          skills: "python",
          requirementDescription: "Data Engineer",
          workAuthorizationStatus: "GC",
          securityClearanceLevel: "yes"
        },
        internalDetails: {
          internalContact: "nick shah",
          coOrdinator: "jay johnson",
          recruitingLead: "nick shah",
          recruitingLeadsEmail: "nick@ptechpartners.com",
          salesLead: "jay johnson",
          salesLeadsEmail: "jay@ptechpartners.com"
        },
        recruiters: ["[nick, jay]"],
        jobPortal: ["[dice, glassdoor, monster]"],
        jobStatus: "open",
        recruitersString: "[[nick, jay]]",
        jobPortalString: "[[dice, glassdoor, monster]]"
      })
    );
    let selectedJobListing = localStorage.getItem("setSelectedJobListing");
    if (selectedJobListing) {
      localStorage.removeItem("setSelectedJobListing");
      selectedJobListing = JSON.parse(selectedJobListing);
      setState(prevState => ({ ...prevState, selectedJobListing }));
    } else {
      Router.push("/viewjoblisting");
    }
  }, []);
  return (
    <Box my={4}>
      <Grid container>
        <ViewDetail selectedJobListing={state.selectedJobListing} />
      </Grid>
    </Box>
  );
}

ViewRequisitionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired
};
export default ViewRequisitionDetail;
