
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

const User = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [colour, setColour] = useState('red');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setUsername('');
    setPassword('');
    setMessage({ type: '', text: '' });
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username) => /^[a-zA-Z0-9_]{4,20}$/.test(username);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!isLogin) {
      if (!validateUsername(username)) {
        setUsernameError('Username should be 4-20 characters long and can contain letters, numbers, and underscores.');
        isValid = false;
      } else {
        setUsernameError('');
      }
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long and contain at least one letter and one number.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) return;

    const url = isLogin
      ? 'http://localhost:8000/api/login/'
      : 'http://localhost:8000/api/register/';

    const payload = isLogin
      ? { email, password }
      : { email, username, password };

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: isLogin ? 'Login successful!' : 'Registration successful!',
        });
        setColour('rgb(21, 92, 22)');

        // In case of login — if API doesn’t send username, use local username input
        const userData = {
          email: payload.email,
          username: isLogin ? (data.username || username) : payload.username,
        };
        localStorage.setItem('user', JSON.stringify(userData));

        if (isLogin) navigate('/home');
      } else {
        if (data.error) {
          setMessage({ type: 'error', text: data.error });
        } else {
          const errorMessages = Object.values(data).flat().join('\n');
          setMessage({ type: 'error', text: errorMessages });
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="signin-box">
        <h2>Welcome🌳</h2>

        <div style={{ color: colour, marginBottom: '10px' }}>
          {message.text}
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {usernameError && (
                <div style={{ color: 'red', marginBottom: '8px', fontSize: '14px' }}>
                  {usernameError}
                </div>
              )}
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && (
            <div style={{ color: 'red', marginBottom: '8px', fontSize: '14px' }}>
              {emailError}
            </div>
          )}

          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          {passwordError && (
            <div style={{ color: 'red', marginBottom: '8px', fontSize: '14px' }}>
              {passwordError}
            </div>
          )}

          <button type="submit">
            {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="sub-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <a href="#" onClick={handleSwitch}>
            {isLogin ? 'Sign up' : 'Log in'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default User;
