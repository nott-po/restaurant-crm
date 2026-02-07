import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApi';
import Logo from '../../shared/ui/Logo';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');

    try {
      const result = await login({
        username: formData.username,
        password: formData.password,
      }).unwrap();

      navigate('/');
    } catch (error) {
      setError(error.data?.message || 'Invalid username or password. Please try again.');
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      username: 'emilys',
      password: 'emilyspass',
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Logo />

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-section">
          <p>Demo credentials:</p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="demo-button"
            disabled={isLoading}
          >
            Use Demo Account (emilys)
          </button>
        </div>

        <div className="login-info">
          <p>
            This is a demo using <a href="https://dummyjson.com" target="_blank" rel="noopener noreferrer">DummyJSON</a>
          </p>
          <p>
            Other test accounts: kminchelle, michaelw, etc.
          </p>
        </div>
      </div>
    </div>
  );
}
