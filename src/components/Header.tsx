import React from 'react';
import Button from './Button';
import './styles.css';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="header-inner container">
        <div className="brand">
          Mini Competition <span className="dot">●</span> Dashboard
        </div>
        <div>
          {isAuthenticated ? (
            <Button variant="ghost" onClick={onLogout}>Logout</Button>
          ) : (
            <div className="flex" style={{ gap: 8 }}>
              <Link to="/login"><Button variant="ghost">Login</Button></Link>
              <Link to="/register"><Button>Register</Button></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
