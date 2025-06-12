import React, { useState } from "react";

function CountIncrease() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default CountIncrease;