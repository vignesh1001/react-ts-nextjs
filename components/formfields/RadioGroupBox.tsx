import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { useField } from "formik";
import PropTypes from "prop-types";

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
  },
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
      iconcolor="#a40c58"
      iconStyle={{
        style: {
          color: "#953967",
        },
      }}
    >
      {props.options &&
        props.options.map((item, i) => (
          <FormControlLabel
            key={"FormControlLabel" + i}
            iconStyle={{
              style: {
                color: "#953967",
              },
            }}
            value={item.value}
            InputLabelProps={{
              style: {
                color: "#953967",
              },
            }}
            control={
              <Radio
                iconStyle={{
                  style: {
                    color: "#953967",
                  },
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
      title: PropTypes.string.isRequired,
    })
  ),
  style: PropTypes.shape({ color: PropTypes.string.isRequired }),
};
export default RadioGroupBox;
