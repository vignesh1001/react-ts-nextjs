import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import ViewDetail from "./ViewDetail";
import Router from "next/router";

function ViewRequisitionDetail({ dispatch }) {
  const [state, setState] = React.useState({
    selectedJobListing: {
      clientInfo: {},
      location: {},
      compensationDetails: {},
      positionDetails: {},
      internalDetails: {}
    }
  });
  React.useEffect(() => {
    localStorage.setItem(
      "setSelectedJobListing",
      JSON.stringify({
        requisitionNumber: 1629,
        numberOfPositions: "1",
        priority: "high",
        clientInfo: {
          clientName: "Peterson Technology partners",
          clientContact: ""
        },
        location: {
          workType: "onsite",
          city: "chicago",
          state: "NV",
          zip: "60169",
          country: "USA"
        },
        employmentType: "Fulltime/Contract to Hire",
        duration: "8",
        compensationDetails: {
          wages: "hourly",
          clientBillRate: "$50/h",
          payRate: "$30/h W2, C2C or 1099"
        },
        positionDetails: {
          positionTitle: "Data Engineer",
          skills: "python",
          requirementDescription: "Data Engineer",
          workAuthorizationStatus: "greencard",
          securityClearanceLevel: "yes"
        },
        internalDetails: {
          internalContact: "nick shah",
          coOrdinator: "",
          recruitingLead: "",
          recruitingLeadsEmail: "nick@ptechpartners.com",
          salesLead: "",
          salesLeadsEmail: "jay@ptechpartners.com"
        },
        recruiters: [],
        jobPortal: [],
        jobStatus: "open",
        recruitersString: "",
        jobPortalString: ""
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
    <Grid container>
      <ViewDetail selectedJobListing={state.selectedJobListing} />
    </Grid>
  );
}

ViewRequisitionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired
};
export default ViewRequisitionDetail;
