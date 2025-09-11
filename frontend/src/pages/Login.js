
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


function Login() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      {showRegister ? (
        <>
          <RegisterForm onRegister={() => setShowRegister(false)} />
          <p>
            Already have an account?{' '}
            <button type="button" onClick={() => setShowRegister(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <LoginForm />
          <p>
            Don't have an account?{' '}
            <button type="button" onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
