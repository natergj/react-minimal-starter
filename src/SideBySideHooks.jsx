import React from "react";

const SideBySideHooks = props => {
  const [renderCount, setRenderCount] = React.useState(0);

  React.useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [props.isChecked]);

  return (
    <div>
      isChecked: {`${props.isChecked}`}
      <br />
      renderCount: {renderCount}
    </div>
  );
};

export default SideBySideHooks;
