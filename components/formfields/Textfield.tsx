import React from "react";
import { TextField, FormHelperText, Box } from "@material-ui/core";
import { useField } from "formik";

const height = 24;
const labelOffset = 110;
const focused = true;

function Textfield(props) {
  const [filed, meta] = useField(props);
  return (
    <React.Fragment>
      <Box my={1}>
        <TextField
          {...props}
          {...filed}
          helperText={meta.touched ? meta.error : ""}
          error={meta.touched && Boolean(meta.error)}
          InputLabelProps={{
            style: {
              height,
              ...(!focused && { top: `${labelOffset}px` })
            }
          }}
          inputProps={
            {
            maxLength:props.maxlength || 50,
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
      </Box>
      <FormHelperText
        id="helper-text-filterSkills"
        style={{
          color: "#195091",
          fontSize: 12,
          paddingLeft: 10,
          marginTop: meta.touched && meta.error ? 20 : -3
        }}
      >
        {props.displayLabel}
      </FormHelperText>
    </React.Fragment>
  );
}

export default Textfield;
