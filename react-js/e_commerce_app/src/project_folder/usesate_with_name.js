import React, { useState } from 'react';

function UsestateWithName() {
  const [currentName, setCurrentName] = useState('');

  return (
    <div>
      <h1>Enter Your Name</h1>
      <input
        type='text'
        placeholder='Enter your name'
        onChange={e => setCurrentName(e.target.value)}
      />
      <h2>Hello {currentName} How are you</h2>
    </div>
  );
}

export default UsestateWithName;