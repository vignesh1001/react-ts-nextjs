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
      color="#a40c58"
    >
      {props.options &&
        props.options.map(item => (
          <FormControlLabel
            value={item.value}
            control={<Radio color="primary" />}
            label={item.title}
          />
        ))}
    </RadioGroup>
  );
}

export default RadioGroupBox;
