import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { useField } from "formik";
import PropTypes from "prop-types";

const styles = {
  height: 24,
  labelOffset: 110,
  focused: true,
  iconColor: "#ba0065",
  textFiledStyle: {
    color: "#1a5091",
    width: "100%",
    height: 24,
    lineHeight: 1.5,
    borderRadius: 6,
    fontSize: 16
  }
};
function RadioGroupBox(props) {
  const [filed] = useField(props);
  return (
    <RadioGroup
      {...props}
      {...filed}
      style={
        props.style
          ? { ...styles.textFiledStyle, ...props.style }
          : styles.textFiledStyle
      }
    >
      {props.options &&
        props.options.map((item, i) => (
          <FormControlLabel
            key={"FormControlLabel" + i}
            value={item.value}
            control={
              <Radio
                style={{
                  color: styles.iconColor
                }}
              />
            }
            label={item.title}
          />
        ))}
    </RadioGroup>
  );
}
RadioGroupBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  style: PropTypes.shape({ color: PropTypes.string.isRequired })
};
export default RadioGroupBox;
