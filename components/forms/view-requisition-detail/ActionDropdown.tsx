import React from "react";
import { Box, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  outlinedBorder: {
    backgroundColor: "#ff3e3e",
    border: "none",
    borderRadius: 4,
    color: "#FFF",
    height: 40,
    width: 130,
    "&:hover": {
      border: "none"
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "rgba(0, 0, 0, 0)"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  },
  dropdownContainer: {
    position: "relative",
    "& .MuiMenuItem-root": {
      backgroundColor: "#ffFFF",
      height: 40
    }
  }
});

const styles = {
  height: 24,
  labelOffset: 110,
  focused: true
};

function ActionDropdown(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <div className={classes.dropdownContainer}>
        <span
          style={{
            cursor: "pointer",
            position: "absolute",
            zIndex: 9,
            top: 12,
            right: 35,
            color: "#FFF"
          }}
          onClick={() => setOpen(!open)}
        >
          ACTIONS
        </span>
        <Select
          {...props}
          className={classes.outlinedBorder}
          variant="outlined"
          onChange={e => {
            props.onChange && props.onChange(e);
          }}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
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
            <MenuItem
              value={item.value}
              key={"menu_item" + item.value}
              style={{ minHeight: 25 }}
            >
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </div>
    </React.Fragment>
  );
}
ActionDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, title: PropTypes.string })
  ),
  displayLabel: PropTypes.string.isRequired
};
export default ActionDropdown;
