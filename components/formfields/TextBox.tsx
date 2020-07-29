import React from "react";
import { TextField, FormHelperText, Box } from "@material-ui/core";
import { useField } from "formik";
import PropTypes from "prop-types";

const styles = {
  labelOffset: 110,
  focused: true,
  textFiledStyle: {
    color: "#4a4a4a",
    width: "100%",
    lineHeight: 1.5,
    borderRadius: 6,
    fontSize: 16,
    border: "0px solid #FFF",
  },
  helpTextStyle: {
    color: "#195091",
    fontSize: 12,
    paddingLeft: 8,
  },
};

function TextBox(props) {
  const [filed, meta] = useField(props);
  const height = props.multiline ? 100 : 40;
  return (
    <React.Fragment>
      <Box my={1}>
        <TextField
          {...filed}
          {...props}
          helperText={meta.touched ? meta.error : ""}
          error={meta.touched && Boolean(meta.error)}
          InputLabelProps={{
            style: {
              height,
              border: "1px solid #195091",
              padding: "0 14px",
              ...(!styles.focused && { top: `${styles.labelOffset}px` }),
            },
          }}
          inputProps={{
            maxLength: props.maxlength || 50,
            style: {
              borderRadius: 4,
              border: "2px solid #195091",
              height,
              padding: "3px 14px",
              margin: props.multiline ? "-17px -15px" : 0,
            },
          }}
          style={styles.textFiledStyle}
        />
      </Box>
      {!(meta.touched && Boolean(meta.error)) && (
        <FormHelperText
          id="helper-text-filterSkills"
          style={{
            ...styles.helpTextStyle,
            marginTop: meta.touched && meta.error ? height : -5,
          }}
        >
          {props.displayLabel}
        </FormHelperText>
      )}
    </React.Fragment>
  );
}

TextBox.propTypes = {
  multiline: PropTypes.string.isRequired,
  maxlength: PropTypes.string.isRequired,
  displayLabel: PropTypes.string.isRequired,
};
export default TextBox;
