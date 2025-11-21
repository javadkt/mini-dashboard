import React from 'react';
import Button from './Button';
import './styles.css';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const path = location.pathname;
  const isLogin = path === '/login';
  const isRegister = path === '/register';

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
              <Link to="/login"><Button variant={isLogin ? 'primary' : 'ghost'}>Login</Button></Link>
              <Link to="/register"><Button variant={isRegister ? 'primary' : 'ghost'}>Register</Button></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
