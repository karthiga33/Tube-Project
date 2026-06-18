import React, { useState } from 'react';
import { signIn, signUp, confirmSignUp } from '../auth';
import './AuthPage.css';

export default function AuthPage({ onLogin }) {
  const [mode, setMode]         = useState('signin');  // signin | signup | confirm
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [code, setCode]         = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await signIn(email, password);
      onLogin();
    } catch (err) {
      const msg = err.code === 'UserNotFoundException' ? 'User not found. Please sign up first.'
        : err.code === 'NotAuthorizedException' ? 'Incorrect email or password.'
        : err.code === 'UserNotConfirmedException' ? 'Email not verified. Please check your inbox.'
        : err.message || 'Sign in failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await signUp(email, password, name);
      setMode('confirm');
    } catch (err) {
      const msg = err.code === 'UsernameExistsException' ? 'An account with this email already exists.'
        : err.code === 'InvalidPasswordException' ? 'Password must be at least 8 characters with uppercase, lowercase, and numbers.'
        : err.message || 'Sign up failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await confirmSignUp(email, code);
      // Auto sign in after confirmation
      await signIn(email, password);
      onLogin();
    } catch (err) {
      setError(err.message || 'Confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">AR Automation</div>
        <p className="auth-subtitle">AR Document Validation Platform</p>

        {/* ── Sign In ── */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="auth-form">
            <h2>Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            {error && <p className="auth-error">{error}</p>}
            <p className="auth-switch">
              Don't have an account?{' '}
              <button type="button" onClick={() => { setMode('signup'); setError(''); }}>Sign Up</button>
            </p>
          </form>
        )}

        {/* ── Sign Up ── */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="auth-form">
            <h2>Create Account</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password (min 8 chars)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
            {error && <p className="auth-error">{error}</p>}
            <p className="auth-switch">
              Already have an account?{' '}
              <button type="button" onClick={() => { setMode('signin'); setError(''); }}>Sign In</button>
            </p>
          </form>
        )}

        {/* ── Confirm Code ── */}
        {mode === 'confirm' && (
          <form onSubmit={handleConfirm} className="auth-form">
            <h2>Verify Email</h2>
            <p className="auth-hint">A verification code was sent to <strong>{email}</strong></p>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
              maxLength={6}
            />
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            {error && <p className="auth-error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
