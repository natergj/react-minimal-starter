import React from "react";
import useClickCount from "./sharedHook";

const SharedHooks = () => {
  const { clickCount, incrementCount, decrementCount } = useClickCount();

  return (
    <div>
      <button onClick={incrementCount}>Increment</button>
      <br />
      <button onClick={decrementCount}>Decrement</button>
      <br />
      Click count: {clickCount}
    </div>
  )
}

export default SharedHooks;
