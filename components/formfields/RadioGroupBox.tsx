import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
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
    fontSize: 16
  }
};
function RadioGroupBox(props) {
  const [filed, meta] = useField(props);
  return (
    <RadioGroup
      {...props}
      {...filed}
      style={styles.textFiledStyle}
      iconcolor="#a40c58"
      iconStyle={{
        style: {
          color: "#953967"
        }
      }}
    >
      {props.options &&
        props.options.map(item => (
          <FormControlLabel
            iconStyle={{
              style: {
                color: "#953967"
              }
            }}
            value={item.value}
            InputLabelProps={{
              style: {
                color: "#953967"
              }
            }}
            control={
              <Radio
                iconStyle={{
                  style: {
                    color: "#953967"
                  }
                }}
              />
            }
            label={item.title}
          />
        ))}
    </RadioGroup>
  );
}

export default RadioGroupBox;
