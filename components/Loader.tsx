import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 9999,
        top: 0,
        left: 0
      }}
    >
      <CircularProgress
        color="secondary"
        style={{
          width: 75,
          height: 75,
          top: "50%",
          left: "calc(50% - 100px)",
          color: "#840000",
          position: "absolute"
        }}
      />
    </div>
  );
}
export default Loader;
