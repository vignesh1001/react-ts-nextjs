import React, { Component } from "react";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadJobListing } from "../actions";
import { useRouter } from "next/router";

function ViewJobListingTable(props) {
  const [state, setState] = React.useState({
    jobList: props.jobList
  });

  React.useEffect(() => {
    props.dispatch(loadJobListing());
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
    localSession.setItem("setSelectedJobListing", row);
    useRouter().push("/AddJobListing");
  };
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[
          {
            title: "Position Title",
            field: "positionTitle",
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
          { title: "Location", field: "location.city" },
          { title: "Req #", field: "requisitionNumber" },
          { title: "Date | Time", field: "priority" },
          { title: "Recruiters", field: "recruiters" },
          { title: "Int Sub", field: "numberOfPositions" }
        ]}
        data={state.jobList}
        actions={[
          {
            icon: "email",
            tooltip: "Email",
            onClick: (event, rowData) => alert("Email " + rowData.positionTitle)
          },
          {
            icon: "close",
            tooltip: "Close Requisition",
            onClick: (event, rowData) =>
              confirm(
                "You want to close the Requisition of " + rowData.positionTitle
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
          rowStyle: {
            backgroundColor: "#FFF",
            //boxShadow: '0 1px 5px 0',
            marginBottom: "12px"
          },
          actionsColumnIndex: -1,
          toolbar: false
        }}
        icons={{ Filter: () => <div /> }}
        localization={{ header: { actions: "" } }}
      />
    </div>
  );
}

ViewJobListingTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidates: PropTypes.object
};
const mapStateToProps = state => state;

export default connect(mapStateToProps)(ViewJobListingTable);
