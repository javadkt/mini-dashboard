import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import '../components/styles.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validate = () => {
    let valid = true;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    } else {
      setEmailError(null);
    }
    const hasMinLen = password.length >= 4;
    const hasNumber = /\d/.test(password);
    if (!hasMinLen || !hasNumber) {
      setPasswordError('Password must be at least 4 characters and include a number.');
      valid = false;
    } else {
      setPasswordError(null);
    }
    return valid;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const ok = await register(email, password);
    if (ok) navigate('/login');
  };

  return (
    <div className="container auth-card">
      <div className="card">
        <h2 className="page-title">Create account</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              required
            />
            {emailError && (
              <div style={{ color: 'var(--danger)', marginTop: 6, fontSize: '0.9rem' }}>{emailError}</div>
            )}
          </div>
          <div className="form-field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(null);
              }}
              required
            />
            {passwordError && (
              <div style={{ color: 'var(--danger)', marginTop: 6, fontSize: '0.9rem' }}>{passwordError}</div>
            )}
          </div>
          <Button type="submit" fullWidth>Register</Button>
        </form>
        <div style={{ marginTop: 12, color: '#9aa4ad' }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
