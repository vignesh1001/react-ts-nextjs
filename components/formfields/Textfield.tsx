import React from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const height = 24;
const labelOffset = 0;
const focused = true;

function Textfield(props) {
  return (
    <React.Fragment>
      <TextField
        {...props}
        /* styles the label component */
        InputLabelProps={{
          style: {
            height,
            ...(!focused && { top: `${labelOffset}px` })
          }
        }}
        /* styles the input component */
        inputProps={{
          style: {
            height,
            padding: "0 14px"
          }
        }}
        style={{
          color: "#4a4a4a",
          width: "100%",
          height: 24,
          lineHeight: 1.5,
          borderRadius: 6,
          fontSize: 16,
          border: "1px solid #195091"
        }}
      />
      <FormHelperText id="helper-text-filterSkills" style={{
    color: "#195091",
    fontSize: 12,
    paddingLeft: 10,
    marginTop: 2
  }}>
        {props.displayLabel}
      </FormHelperText>
    </React.Fragment>
  );
}

export default Textfield;
