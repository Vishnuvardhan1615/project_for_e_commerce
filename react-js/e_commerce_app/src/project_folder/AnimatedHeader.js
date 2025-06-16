import React from 'react';

function AnimatedHeader() {
  return (
    <header style={{
      width: '100%',
      background: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
      padding: 0,
      boxShadow: '0 2px 16px #23252622',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px #00c6ff44',
            animation: 'pulseGlow 1.8s infinite alternate',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/></svg>
          </div>
          <span style={{
            fontWeight: 900,
            fontSize: '2.1rem',
            color: '#fff',
            letterSpacing: 2,
            textShadow: '0 2px 8px #232526',
            animation: 'fadeInRight 1.2s cubic-bezier(.68,-0.55,.27,1.55)',
            fontFamily: 'Segoe UI, Arial, sans-serif',
          }}>
            ShopEase
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 32 }}>
          <a href="#products" style={navLinkStyle}>Products</a>
          <a href="#offers" style={navLinkStyle}>Offers</a>
          <a href="#about" style={navLinkStyle}>About</a>
          <a href="#contact" style={navLinkStyle}>Contact</a>
        </nav>
      </div>
      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 2px 8px #00c6ff44, 0 0 0 0 #00c6ff33; }
          100% { box-shadow: 0 2px 16px #00c6ff99, 0 0 16px 8px #00c6ff22; }
        }
        @keyframes fadeInRight {
          0% { transform: translateX(-60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .header-anim-link:hover {
          color: #00c6ff !important;
          background: #fff2;
          text-shadow: 0 2px 8px #00c6ff;
          transition: color 0.2s, text-shadow 0.2s, background 0.2s;
        }
      `}</style>
    </header>
  );
}

const navLinkStyle = {
  color: '#fff',
  fontWeight: 600,
  fontSize: '1.1rem',
  textDecoration: 'none',
  letterSpacing: 1,
  padding: '8px 18px',
  borderRadius: 8,
  transition: 'color 0.2s, background 0.2s',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 2,
  boxShadow: 'none',
  marginLeft: 0,
  marginRight: 0,
  outline: 'none',
  background: 'transparent',
  display: 'inline-block',
  className: 'header-anim-link',
};

export default AnimatedHeader;
