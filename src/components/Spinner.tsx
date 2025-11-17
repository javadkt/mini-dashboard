import React, { useEffect, useState } from 'react';
import { onLoading } from '../utils/events';
import './styles.css';

export const GlobalSpinner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    return onLoading(((e: any) => setVisible(!!e.detail?.isLoading)) as any);
  }, []);

  if (!visible) return null;
  return (
    <div className="global-spinner">
      <div className="spinner-dot" />
      <div className="spinner-dot" />
      <div className="spinner-dot" />
    </div>
  );
};

export default GlobalSpinner;
