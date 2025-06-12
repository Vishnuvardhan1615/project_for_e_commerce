// import React from 'react'

// function AttributesAndProps() 
// {

//     return (
//         <div>Hello Vishnu</div>
//     )

// }


// export default AttributesAndProps;



import React from 'react';

function AttributesAndProps({ handleClick }) {
  return (
    <div>
      <img src="logo.png" alt="Logo" />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default AttributesAndProps;