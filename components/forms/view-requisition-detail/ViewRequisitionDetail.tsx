import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
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
          clientName: "",
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
          internalContact: "",
          coOrdinator: "",
          recruitingLead: "",
          recruitingLeadsEmail: "nick@ptechpartners.com",
          salesLead: "",
          salesLeadsEmail: "jay@ptechpartners.com"
        },
        recruiters: [],
        jobPortal: ["[dice, glassdoor, monster]"],
        jobStatus: "open",
        recruitersString: "",
        jobPortalString: ""
      })
    );
    let selectedJobListing: any = localStorage.getItem("setSelectedJobListing");
    if (selectedJobListing) {
      localStorage.removeItem("setSelectedJobListing");
      selectedJobListing = JSON.parse(selectedJobListing);
      if (selectedJobListing.jobPortal && selectedJobListing.jobPortal.length) {
        selectedJobListing.jobPortal = selectedJobListing.jobPortal[0]
          .replace("[", "")
          .replace("]", "")
          .replace(/ /g, "")
          .split(",");
      }
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
