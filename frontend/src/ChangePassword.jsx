import React, { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css';
import Navbar from './Navbar';
import Footer from './Footer';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleChangePassword = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;

    if (!email) {
      setMessage('User email not found in local storage.');
      setIsSuccess(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      setIsSuccess(false);
      return;
    }

    if (oldPassword === newPassword) {
      setMessage('New password must be different from old password.');
      setIsSuccess(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage(
        'Password must be at least 6 characters long and include at least one letter and one number.'
      );
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/change-password/', {
        email,
        old_password: oldPassword,
        new_password: newPassword
      });

      if (response.data.success) {
        setMessage('Password changed successfully!');
        setIsSuccess(true);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage(response.data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
      setIsSuccess(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="change-password-container">
        <h2 className="change-password-title">Change Password</h2>

        <div className="change-password-field">
          <input
            type={showOld ? 'text' : 'password'}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="change-password-input"
          />
          <button
            className="change-password-toggle-btn"
            onClick={() => setShowOld(!showOld)}
          >
            {showOld ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="change-password-field">
          <input
            type={showNew ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="change-password-input"
          />
          <button
            className="change-password-toggle-btn"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="change-password-field">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="change-password-input"
          />
          <button
            className="change-password-toggle-btn"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          onClick={handleChangePassword}
          className="change-password-submit-btn"
        >
          Change Password
        </button>

        {message && (
          <p
            className={`change-password-message ${
              isSuccess ? 'success' : 'error'
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
  