import React from "react";

function SimpleUploadLink(props) {
  const { handleCapture, labelText, name } = props;
  return (
    <React.Fragment>
      <input
        style={{ display: "none" }}
        type="file"
        {...props}
      />
      <label
        htmlFor={name}
        style={{
          color: "#f4308f",
          textDecoration: "underline",
          cursor: "pointer"
        }}
      >
        {labelText}
      </label>
    </React.Fragment>
  );
}

export default SimpleUploadLink;

