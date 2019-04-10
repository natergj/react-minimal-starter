import React from "react";

export default () => {
  const [clickCount, setClickCount] = React.useState(0);

  const incrementCount = () => {
    setClickCount(clickCount + 1);
  }

  const decrementCount = () => {
    setClickCount(clickCount - 1);
  }

  return {
    clickCount,
    setClickCount,
    incrementCount,
    decrementCount,
  }
}