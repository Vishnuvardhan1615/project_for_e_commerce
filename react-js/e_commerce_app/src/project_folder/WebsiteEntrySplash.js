import React, { useEffect } from "react";

function WebsiteEntrySplash({ onFinish }) {
  // Show splash for 2 seconds, then call onFinish
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(120deg, #007bff 0%, #00c6ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: '#fff',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          marginBottom: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <div style={{
              width: 18,
              height: 18,
              border: '3px solid #fff',
              borderTop: '3px solid #00c6ff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginRight: 8,
            }} />
            <span style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: 1 }}>Loading</span>
          </div>
          <div style={{ marginTop: 18, color: '#e3f2fd', fontSize: '1.1rem', fontWeight: 500, letterSpacing: 1 }}>
            Please wait while we prepare your experience...
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
        <h1 style={{ fontWeight: 700, fontSize: '2.2rem', marginBottom: 12, textShadow: '0 2px 8px #005fa3' }}>Welcome to My E-Commerce</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, color: '#e3f2fd', textShadow: '0 1px 4px #005fa3' }}>Loading your experience...</p>
      </div>
    </div>
  );
}

export default WebsiteEntrySplash;
