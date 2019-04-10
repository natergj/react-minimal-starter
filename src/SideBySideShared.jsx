import React from "react";
import SharedHooks from "./SharedHooks";

export default () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div style={{ display: "flex", flexGrow: 1, height: "100%" }}>
        <div style={{ flexBasis: "50%", borderRight: "1px solid black" }}>
          <SharedHooks />
        </div>
        <div style={{ flexBasis: "50%" }}>
          <SharedHooks />
        </div>
      </div>
    </div>
  );
};
