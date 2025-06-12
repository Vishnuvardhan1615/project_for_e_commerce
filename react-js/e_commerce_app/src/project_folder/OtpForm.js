import React, { useState } from 'react';
import OtpVerify from './otp_verify';

function OtpForm() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    if(!email) {
      alert('Please enter a valid email address.');
      return;
    }
    setLoading(true); // Start loading
    const response = await fetch('http://127.0.0.1:8000/api/otp_page', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
    setLoading(false); // Stop loading
    if (response.ok) {
      setOtpSent(true);
    }
  };

  if (otpSent) {
    return <OtpVerify email={email} />;
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSendOtp}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', marginBottom: 10 }} disabled={loading} >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
      {message && <div style={{ marginTop: 20, color: 'blue' }}>{message}</div>}
    </div>
  );
}

export default OtpForm;