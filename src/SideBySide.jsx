import React from "react";
import SideBySideClass from "./SideBySideClass";
import SideBySideHooks from "./SideBySideHooks";

export default () => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <div style={{width: "100%", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ height: "100px" }}>
          <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} /> Toggle
        </div>
        <div style={{ display: "flex", flexGrow: 1 }}>
          <div style={{ flexBasis: "50%", borderRight: "1px solid black" }}>
            <SideBySideClass isChecked={isChecked} />
          </div>
          <div style={{ flexBasis: "50%" }}>
            <SideBySideHooks isChecked={isChecked} />
          </div>
        </div>
      </div>
    </div>
  )
}