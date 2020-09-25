import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "@material-ui/core";
import AddJobListingForm from "../add-joblisting";
import { saveJobListing } from "../../../actions";

const EditReqisitionModal = props => {
  const [state, setState] = React.useState({
    formikProps: null
  });
  const handleUpdate = () => {
    if (state.formikProps.errors) {
      const errorList = Object.values(state.formikProps.errors);
      if (errorList.length > 0) {
        alert(
          errorList.join("\n") +
            "\n        Please fill the above mandatory fields"
        );
      } else {
        const payLoad = { ...state.formikProps.values, action: "UPDATE" };
        props.dispatch(saveJobListing(payLoad));
      }
    }
  };

  return (
    <div>
      <Modal disablePortal disableEnforceFocus disableAutoFocus open>
        <div
          style={{
            position: "absolute",
            width: "60%",
            backgroundColor: "#FFF",
            borderRadius: "2px",
            border: "1px #fff",
            boxShadow: 5,
            padding: 8,
            left: "20%",
            top: "30px"
          }}
        >
          <h4 id="modal-title" style={{ marginTop: 0 }}>
            Edit Requisition
          </h4>
          <div
            id="modal-description"
            style={{ height: 400, overflowY: "auto", overflowX: "hidden" }}
          >
            <AddJobListingForm
              {...props}
              formikProps={formikProps => setState({ ...state, formikProps })}
            />
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={props.onCloseReqisitionModal}
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
              onClick={handleUpdate}
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

export default EditReqisitionModal;
