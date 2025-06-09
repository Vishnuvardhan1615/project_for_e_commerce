import React, { useState } from 'react';

function OTPForm() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const sendOtp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/otp_page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMsg(`${data.status}: ${data.message}`);
      } else {
        setMsg(data.error);
      }
    } catch (err) {
      setMsg('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Send OTP to Email</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      <p>{msg}</p>
    </div>
  );
}

export default OTPForm;
