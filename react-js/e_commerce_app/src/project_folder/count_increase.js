import React, { useState } from "react";

function CountIncrease() {
  const [count, setCount] = useState(0);


  let styleObj={}
  if(count > 0)
  {
    styleObj = { color : 'green' }
  }
  else if( count < 0)
  {
    styleObj = {color : 'red'}
  }
  else
  {
    styleObj = { color : ''}
  }
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <p style={styleObj}>You clicked {count} times</p>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default CountIncrease;