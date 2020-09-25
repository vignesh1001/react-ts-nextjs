import React from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Grid, Modal } from "@material-ui/core";
import { saveJobListing } from "../../../actions";
import { jobListingBoardList } from "../../../constants/dropdown";

const ManagePostModal = props => {
  const { selectedJobListing } = props;
  const [state, setState] = React.useState({
    jobPortal: selectedJobListing.jobPortal || []
  });

  const handlePublish = () => {};
  return (
    <div>
      <Modal disablePortal disableEnforceFocus disableAutoFocus open>
        <div
          style={{
            position: "absolute",
            width: 385,
            backgroundColor: "#FFF",
            borderRadius: 2,
            border: "1px #fff",
            boxShadow: 5,
            padding: 8,
            left: "calc(50% - 200px)",
            top: "calc(50% - 200px)"
          }}
        >
          <h4 id="modal-title" style={{ margin: 0 }}>
            Req #{selectedJobListing.requisitionNumber} posted on:
          </h4>
          <div
            id="modal-description"
            style={{ height: 280, overflowY: "auto", overflowX: "hidden" }}
          >
            <Grid item xs={12} sm={12}>
              {jobListingBoardList.map(i => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 30,
                    overflow: "hidden"
                  }}
                >
                  <Checkbox
                    key={"jobListingBoard_" + i.value}
                    name="jobListingBoard"
                    id={"jobListingBoard_" + i.value}
                    variant="outlined"
                    value={i.value}
                    checked={state.jobPortal.indexOf(i.value) > -1}
                    style={{ flexFlow: "wrap", minHeight: 50 }}
                    onChange={e => {
                      console.log(e.target.checked, e.target.value);
                      if (e.target.checked) {
                        state.jobPortal.push(e.target.value);
                      } else {
                        state.jobPortal.splice(
                          state.jobPortal.indexOf(e.target.value),
                          1
                        );
                      }
                      setState({ ...state });
                    }}
                  />
                  <label htmlFor={"jobListingBoard_" + i.value}>
                    {i.title}
                  </label>
                </div>
              ))}
            </Grid>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={props.onCloseManagePostingModal}
              variant="contained"
              style={{
                width: 100,
                padding: 0,
                height: 36,
                borderRadius: 4,
                fontSize: 14,
                boxShadow: "none",
                marginRight: 12,
                backgroundColor: "#FFF"
              }}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              onClick={handlePublish}
              style={{
                width: 100,
                height: 36,
                padding: 0,
                borderRadius: 4,
                fontSize: 14,
                boxShadow: "none",
                MozOutlineColor: "#e32686",
                backgroundColor: "#FFF"
              }}
            >
              UPDATE
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManagePostModal;
