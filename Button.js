import React from "react";

function Button() {
  function add() {
    alert("nothing");
  }
  function addition() {
    var a = 1;
    var b=a+1;

  }
  return (
    <div>
      <h1>{b}</h1>
      <button onClick={add}>Click Here</button>
      <p>
        <button onclick={addition}>Click to count</button>
      </p>
    </div>
  );
}

export default Button;
