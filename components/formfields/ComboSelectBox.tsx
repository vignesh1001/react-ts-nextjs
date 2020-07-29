import React from "react";
import { FormHelperText, Box, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useField } from "formik";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  outlinedBorder: {
    border: "2px solid #195091",
    borderRadius: 4,
    "&:hover": {
      border: "3px solid #195091"
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "rgba(0, 0, 0, 0)"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  }
});

const styles = {
  height: 24,
  labelOffset: 110,
  focused: true,
  textFiledStyle: {
    color: "#4a4a4a",
    width: "100%",
    height: 24,
    lineHeight: 1.5,
    borderRadius: 6,
    fontSize: 16,
    border: "1px solid #195091"
  },
  helpTextStyle: {
    color: "#195091",
    fontSize: 12,
    paddingLeft: 10
  },
  helpTextErrorStyle: {
    color: "#f44336",
    fontSize: 12,
    paddingLeft: 10
  }
};

function ComboSelectBox(props) {
  const [filed, meta] = useField(props);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box my={1}>
        <Select
          {...filed}
          {...props}
          className={classes.outlinedBorder}
          variant="outlined"
          onChange={e => {
            filed["value"] = e.target.value;
            filed.onChange(e);
            meta.value = e.target.value;
            props.onChange && props.onChange(e);
          }}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched ? meta.error : ""}
          type="select"
          InputLabelProps={{
            style: {
              height: styles.height,
              ...(!styles.focused && { top: `${styles.labelOffset}px` })
            }
          }}
          inputProps={{
            style: {
              height: styles.height,
              padding: "0 14px"
            }
          }}
        >
          {props.options.map(item => (
            <MenuItem value={item.value} key={"menu_item" + item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
        {meta.touched && Boolean(meta.error) && (
          <FormHelperText
            color="primary"
            style={{
              ...styles.helpTextErrorStyle,
              marginTop: meta.touched && meta.error ? 10 : -5
            }}
          >
            {meta.error}
          </FormHelperText>
        )}
      </Box>
      {!(meta.touched && Boolean(meta.error)) && (
        <FormHelperText
          id="helper-text-filterSkills"
          style={{
            ...styles.helpTextStyle,
            marginTop: -5
          }}
        >
          {props.displayLabel}
        </FormHelperText>
      )}
    </React.Fragment>
  );
}
ComboSelectBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, title: PropTypes.string })
  ),
  displayLabel: PropTypes.string.isRequired
};
export default ComboSelectBox;
