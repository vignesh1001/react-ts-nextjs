import React from "react";
import { TextField, FormHelperText, Box } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useField } from "formik";

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
  }
};

function ComboSelectBox(props) {
  const [filed, meta] = useField(props);
  return (
    <React.Fragment>
      <Box my={1}>
        <Autocomplete
          {...props}
          {...filed}
          id="combo-box-demo"
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />
        {/*<TextField
          {...props}
          {...filed}
          helperText={meta.touched ? meta.error : ""}
          error={meta.touched && Boolean(meta.error)}
          InputLabelProps={{
            style: {
              height: styles.height,
              ...(!styles.focused && { top: `${styles.labelOffset}px` })
            }
          }}
          inputProps={{
            maxLength: props.maxlength || 50,
            style: {
              height: styles.height,
              padding: "0 14px"
            }
          }}
          style={styles.textFiledStyle}
        />*/}
      </Box>
      <FormHelperText
        id="helper-text-filterSkills"
        style={{
          ...styles.helpTextStyle,
          marginTop: meta.touched && meta.error ? 20 : -5
        }}
      >
        {props.displayLabel}
      </FormHelperText>
    </React.Fragment>
  );
}

export default ComboSelectBox;
