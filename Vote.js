import React from "react";

function Vote(props) {
  
  if (props.a >= 18) {
    return <span> Elligible for Vote</span>;
  } else {
    return <span>not Elligible for Vote</span>;
  }
}
export default Vote;
