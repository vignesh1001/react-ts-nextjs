import React, { Component } from "react";
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function ViewJobListingTable(props) {
  const [state, setState] = React.useState({
    jobList: props.jobList
  });

  React.useEffect(()=>{
    props.dispatch(loadJobListing());
  },[]);

  React.useEffect(() => {
    if (props.jobList && props.jobList.length) {
      setState({ ...state, jobList: props.jobList });
    }
  }, [props.jobList]);
  return (
    <div style={{ maxWidth: "100%" }}>
             {" "}
      <MaterialTable
        columns={[
          {
            title: "Position Title",
            field: "positionTitle",
            render: rowData => (
              <a
                onClick={() => alert(rowData.positionTitle)}
                style={{
                  fontSize: 16,
                  color: "#27377e",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
              >
                {rowData.positionTitle}
              </a>
            )
          },
          { title: "Client", field: "client" },
          { title: "Location", field: "location" },
          { title: "Req #", field: "req" },
          { title: "Date | Time", field: "dateTime" },
          { title: "Recruiters", field: "recruiters" },
          { title: "Int Sub", field: "intSub" }
        ]}
        data={[
          {
            positionTitle: "Mobile Application Test",
            client: "Grainger",
            location: "Chicago, IL",
            req: "#102617",
            dateTime: "Jun 26, 2020 | 07:14 PM",
            recruiters: "Reena Shah, Surai Kumar",
            intSub: "9 submitions"
          },
          {
            positionTitle: "Mobile Application Architect",
            client: "Grainger",
            location: "Chicago, IL",
            req: "#102617",
            dateTime: "Jun 26, 2020 | 07:14 PM",
            recruiters: "Reena Shah, Surai Kumar",
            intSub: "9 submitions"
          }
        ]}
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
           {" "}
    </div>
  );
}

ViewJobListingTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidates: PropTypes.object
};
const mapStateToProps = state => state;

export default connect(mapStateToProps)(ViewJobListingTable);
