import React, { useState, useEffect } from 'react';
import AnimatedHeader from './project_folder/AnimatedHeader';
import HomePage from './project_folder/HomePage';
import WebsiteEntrySplash from './project_folder/WebsiteEntrySplash';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Optionally, you can move splash logic here if you want to control it globally
  }, []);

  if (showSplash) {
    return <WebsiteEntrySplash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div>
      <AnimatedHeader />
      <HomePage />
    </div>
  );
}

export default App;


