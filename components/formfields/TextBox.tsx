import React from "react";
import { TextField, FormHelperText, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useField } from "formik";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  outlinedBorder: {
    borderWidth: 4,
    borderColor: 'red',
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        border: "3px solid #195091",
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: "2px solid #195091",
    }
  }
});

const styles = {
  labelOffset: 110,
  focused: true,
  textFiledStyle: {
    color: "#4a4a4a",
    width: "100%",
    lineHeight: 1.5,
    borderRadius: 6,
    fontSize: 16,
    border: "0px solid #FFF"
  },
  helpTextStyle: {
    color: "#195091",
    fontSize: 12,
    paddingLeft: 8
  }
};

function TextBox(props) {
  const [filed, meta] = useField(props);
  const classes = useStyles();
  const height = props.multiline ? 100 : 40;
  return (
    <React.Fragment>
      <Box my={1}>
        <TextField
          {...filed}
          {...props}
          className={classes.outlinedBorder}
          helperText={meta.touched ? meta.error : ""}
          error={meta.touched && Boolean(meta.error)}
          InputLabelProps={{
            style: {
              height,
              padding: "0 14px",
              ...(!styles.focused && { top: `${styles.labelOffset}px` })
            }
          }}
          inputProps={{
            maxLength: props.maxlength || 50,
            style: {
              height,
              padding: "3px 14px",
              margin: props.multiline ? "-17px -15px" : 0
            }
          }}
          style={styles.textFiledStyle}
        />
      </Box>
      {!(meta.touched && Boolean(meta.error)) && (
        <FormHelperText
          id="helper-text-filterSkills"
          style={{
            ...styles.helpTextStyle,
            marginTop: meta.touched && meta.error ? height : -5
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
  displayLabel: PropTypes.string.isRequired
};
export default TextBox;
