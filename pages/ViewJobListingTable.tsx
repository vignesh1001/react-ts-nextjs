import React from "react";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
//import { loadJobListing } from "../../../actions";
import Router from "next/router";
import { Checkbox } from "@material-ui/core";

const ViewJobListingTable = props => {
  const [state, setState] = React.useState({
    jobList: [], //props.jobList,
    isIncludeReq: false,
    filters: { action: "GET" }
  });

  React.useEffect(() => {
    //props.dispatch(loadJobListing(state.filters));
  }, []);

  React.useEffect(() => {
    const { jobList } = props;
    if (jobList && jobList.length) {
      const tempJobList = [];
      for (var i = 0; i < jobList.length; i++) {
        var item = jobList[i];
        // item.recruitersString = JSON.parse(item.recruitersString);
        tempJobList.push(item);
      }
      setState({ ...state, jobList: tempJobList });
    }
  }, [props.jobList]);
  const goToJobListing = row => {
    // props.dispatch(setSelectedJobListing());
    localStorage.setItem("setSelectedJobListing", JSON.stringify(row));
    Router.push("/AddJobListing");
  };
  return (
    <div style={{ maxWidth: "100%" }}>
      <div>
        Include Closed Requisition
        <Checkbox
          name="inCludeClosed"
          id="inCludeClosed"
          variant="outlined"
          value={state.isIncludeReq}
          displayLabel={""}
          style={{ flexFlow: "wrap", minHeight: 50 }}
          onChange={e => {
            /*if (e.target.checked) {
              props.dispatch(
                loadJobListing({
                  ...state.filters,
                  property: "IncludeClosedJobPosting"
                })
              );
            } else {
              props.dispatch(loadJobListing(state.filters));
            }*/
            state.isIncludeReq = !state.isIncludeReq;
            setState(state);
          }}
        />
      </div>
      <div className="test">
        <MaterialTable
          columns={[
            {
              title: "Position Title",
              field: "positionDetails.positionTitle",
              render: rowData => (
                <a
                  onClick={() => goToJobListing(rowData)}
                  style={{
                    fontSize: 16,
                    color: "#27377e",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  {rowData.positionDetails.positionTitle}
                </a>
              )
            },
            { title: "Client", field: "clientInfo.clientName" },
            {
              title: "Location",
              field: "location.city",
              render: rowData => (
                <span>
                  {rowData.location.city + ", " + rowData.location.state}
                </span>
              )
            },
            { title: "Req #", field: "requisitionNumber" },
            { title: "Date | Time", field: "lastUpdatedTS" },
            {
              title: "Recruiters",
              field: "recruiters",
              render: rowData => (
                <span>
                  {rowData.recruiters ? rowData.recruiters.join(", ") : ""}
                </span>
              )
            },
            {
              title: "Int Sub",
              field: "submission",
              render: rowData => <span>{rowData.submission} submissions</span>
            }
          ]}
          data={state.jobList}
          actions={[
            {
              icon: "email",
              tooltip: "Email",
              onClick: (event, rowData) =>
                alert("Email " + rowData.positionDetails.positionTitle)
            },
            {
              icon: "close",
              tooltip: "Close Requisition",
              onClick: (event, rowData) =>
                confirm(
                  "You want to close the Requisition of " +
                    rowData.positionDetails.positionTitle
                )
            }
          ]}
          options={{
            showTitle: false,
            sorting: true,
            search: false,
            filtering: true,
            headerStyle: {
              //backgroundColor: '#01579b',
              //color: '#FFF'
            },
            cellStyle: {
              padding: 0
            },
            rowStyle: rowData => {
              if (rowData.jobStatus === "closed") {
                return { backgroundColor: "yellow" };
              }
              return {
                backgroundColor: "#FFF",
                //boxShadow: '9px 20px 15px 15px',
                boxShadow: "1px 2px 1px 0px",
                marginBottom: "12px",
                //borderTop: '13px solid #FFF',
                borderTop: "13px solid #ffffff00"
              };
            },
            actionsColumnIndex: -1,
            toolbar: false
          }}
          //icons={{ Filter: () => <div /> }}
          localization={{
            header: { actions: "" }
          }}
        />
      </div>
    </div>
  );
};

ViewJobListingTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidates: PropTypes.object,
  jobList: PropTypes.arrayOf(PropTypes.object)
};

export default ViewJobListingTable;
