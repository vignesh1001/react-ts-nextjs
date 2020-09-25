import React from "react";

import { Checkbox, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useField } from "formik";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  outlinedBorder: {
    borderWidth: 4,
    borderColor: "red",
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "3px solid #195091"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "2px solid #195091"
    }
  }
});

const styles = {
  labelOffset: 110,
  focused: true,
  textFiledStyle: {
    color: "#ba0065",
    lineHeight: 1.5,
    borderRadius: 6,
    fontSize: 16,
    border: "0px solid #FFF",
    width: 25,
    height: 25
  },
  helpTextStyle: {
    color: "#195091",
    fontSize: 12,
    paddingLeft: 8
  }
};

function CheckBoxComponent(props) {
  let [filed, meta] = useField(props);
  const classes = useStyles();
  const height = 40;
  return (
    <React.Fragment>
      <Box my={1} style={{ padding: 8 }}>
        <Checkbox
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
            style: {
              height,
              padding: "3px 14px",
              margin: 0
            }
          }}
          style={styles.textFiledStyle}
        />
        <span>{props.displayLabel}</span>
      </Box>
    </React.Fragment>
  );
}

CheckBoxComponent.propTypes = {
  displayLabel: PropTypes.string
};
export default CheckBoxComponent;
