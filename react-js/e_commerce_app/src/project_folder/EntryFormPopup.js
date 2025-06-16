import React, { useState, useEffect } from 'react';

function EntryFormPopup({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 1500); // Auto-close after submit
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.35)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.4s',
    }}>
      <div style={{
        background: 'linear-gradient(120deg, #fff 60%, #e3f2fd 100%)',
        borderRadius: 18,
        boxShadow: '0 8px 32px #007bff44',
        padding: '38px 48px',
        minWidth: 340,
        textAlign: 'center',
        transform: 'scale(1)',
        animation: 'popIn 0.5s cubic-bezier(.68,-0.55,.27,1.55)',
      }}>
        <h2 style={{ margin: 0, fontWeight: 700, color: '#007bff', fontSize: '1.5rem', textShadow: '0 2px 8px #e3f2fd' }}>Quick Entry</h2>
        <p style={{ margin: '12px 0 18px', color: '#333', fontSize: '1.1rem' }}>Enter your details to get started!</p>
        {submitted ? (
          <div style={{ color: '#007bff', fontWeight: 600, fontSize: '1.1rem', margin: '18px 0' }}>Thank you! 🎉</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #bbb' }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 6, border: '1px solid #bbb' }}
            />
            <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 6, background: '#007bff', color: '#fff', fontWeight: 600, border: 'none', fontSize: '1rem', cursor: 'pointer' }}>Submit</button>
          </form>
        )}
        <button onClick={onClose} style={{ marginTop: 18, background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>Close</button>
        <style>{`
          @keyframes popIn {
            0% { transform: scale(0.7); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default EntryFormPopup;
