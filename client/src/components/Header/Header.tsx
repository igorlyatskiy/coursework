import React from "react";
import { Layout, Typography } from "antd";
import { useNavigate } from 'react-router-dom';


function HeaderComponent() {
  const { Header } = Layout;
  const { Title } = Typography;

  const navigate = useNavigate();

  const handleMainPageLoading = () => {
    navigate('/', { replace: true })
  }

  return (
    <Header style={{ margin: '30px 0', borderBottom: '1px solid #ccc', background: '#fff', paddingLeft: '30px' }}>
      <Title style={{ userSelect: 'none', cursor: 'pointer', display: 'inline' }} onClick={() => handleMainPageLoading()}>CodeJam chess</Title>
    </Header>
  );
}

export default HeaderComponent;
