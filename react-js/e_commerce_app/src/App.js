import React, { useState, useEffect } from 'react';
import ProductProjectApi from './project_folder/product_project_api';
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
      <ProductProjectApi />
    </div>
  );
}

export default App;


