import React, { useState } from 'react';

function EntryFormPopup({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/otp_page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message || data.error);
      if (response.ok) {
        setOtpSent(true);
      }
    } catch (err) {
      setMessage('Failed to send OTP. Please try again.');
    }
    setLoading(false);
  };

  // Verify OTP (optional, if you want to add OTP verification)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      setMessage(data.message || data.error);
      if (response.ok) {
        setSubmitted(true);
        setTimeout(onClose, 1500);
      }
    } catch (err) {
      setMessage('Failed to verify OTP. Please try again.');
    }
    setLoading(false);
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
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp}>
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
            <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 6, background: '#007bff', color: '#fff', fontWeight: 600, border: 'none', fontSize: '1rem', cursor: 'pointer' }} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 6, border: '1px solid #bbb' }}
            />
            <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 6, background: '#007bff', color: '#fff', fontWeight: 600, border: 'none', fontSize: '1rem', cursor: 'pointer' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
        {message && <div style={{ marginTop: 16, color: '#007bff', fontWeight: 500 }}>{message}</div>}
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
