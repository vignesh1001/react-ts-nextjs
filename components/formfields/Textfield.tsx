import React from "react";
import { TextField, FormHelperText, Box } from "@material-ui/core";
import { useField } from "formik";

const styles = {
  labelOffset: 110,
  focused: true,
  textFiledStyle: {
    color: "#4a4a4a",
    width: "100%",
    lineHeight: 1.5,
    borderRadius: 6,
    fontSize: 16,
    border: "1px solid #195091"
  },
  helpTextStyle: {
    color: "#195091",
    fontSize: 12,
    paddingLeft: 10
  }
};

function Textfield(props) {
  const [filed, meta] = useField(props);
  const height = props.multiline ? 100 : 24;
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
              ...(!styles.focused && { top: `${styles.labelOffset}px` })
            }
          }}
          inputProps={{
            maxLength: props.maxlength || 50,
            style: {
              height,
              padding: "0 14px"
            }
          }}
          style={styles.textFiledStyle}
        />
      </Box>
      {(!(meta.touched && Boolean(meta.error))) && <FormHelperText
        id="helper-text-filterSkills"
        style={{
          ...styles.helpTextStyle,
          marginTop: meta.touched && meta.error ? height : -5
        }}
      >
        {props.displayLabel}
      </FormHelperText>}
    </React.Fragment>
  );
}

export default Textfield;
