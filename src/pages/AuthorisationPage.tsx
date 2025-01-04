import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NeedAuthorizationPage: React.FC = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
      <Result
        status="warning"
        title="You need to be authorized to access this page."
        subTitle="Please log in to continue."
        extra={[
          <Button type="primary" key="login" onClick={goToLogin}>
            Go to Login
          </Button>,
        ]}
      />
    </div>
  );
};

export default NeedAuthorizationPage;
