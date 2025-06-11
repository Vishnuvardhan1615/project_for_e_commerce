import React, { useState } from 'react';

function OtpForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    const response = await fetch('http://localhost:8000/otp_page/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    const response = await fetch('http://localhost:8000/verify/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSendOtp}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%' }}>Send OTP</button>
      </form>
      <form onSubmit={handleVerifyOtp} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%' }}>Verify OTP</button>
      </form>
      {message && <div style={{ marginTop: 20, color: 'blue' }}>{message}</div>}
    </div>
  );
}

export default OtpForm;
