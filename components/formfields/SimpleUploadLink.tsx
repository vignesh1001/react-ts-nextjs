import React from "react";
import PropTypes from "prop-types";

function SimpleUploadLink(props) {
  const { labelText, name } = props;
  return (
    <React.Fragment>
      <input style={{ display: "none" }} type="file" {...props} />
      <label
        htmlFor={name}
        style={{
          color: "#f4308f",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {labelText}
      </label>
    </React.Fragment>
  );
}
SimpleUploadLink.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
};
export default SimpleUploadLink;
