import React from "react";
import { TextField, FormHelperText, Box,Select,MenuItem } from "@material-ui/core";
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
  },
  helpTextErrorStyle: {
    color: "#f44336",
    fontSize: 12,
    paddingLeft: 10
  }
};

function ComboSelectBox(props) {
  const [filed, meta] = useField(props);
  
  return (
    <React.Fragment>
      <Box my={1}>
        <Select
          {...props}
          {...filed}
          variant="outlined"
          onChange={(e)=>{filed['value']=e.target.value;
          filed.onChange(e);
          meta.value=e.target.value}}
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
            maxLength: props.maxlength || 50,
            style: {
              height: styles.height,
              padding: "0 14px"
            }
          }}
        >
          {
            props.options.map(item=><MenuItem value={item.value}>{item.title}</MenuItem>)
          }
        </Select>
        {meta.touched && Boolean(meta.error) && <FormHelperText color="primary" style={{
          ...styles.helpTextErrorStyle,
          marginTop: meta.touched && meta.error ? 10 : -5
        }}>{meta.error}</FormHelperText>}
        
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
      {(!(meta.touched && Boolean(meta.error))) &&<FormHelperText
        id="helper-text-filterSkills"
        style={{
          ...styles.helpTextStyle,
          marginTop: -5
        }}
      >
        {props.displayLabel}
      </FormHelperText>}
    </React.Fragment>
  );
}

export default ComboSelectBox;
