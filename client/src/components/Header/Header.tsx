import React from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import { State } from "../../redux/main/type";
import { useSelector } from "react-redux";
import { RootReducer } from "../../redux";
import {
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import api from "../../api/api";


function HeaderComponent() {
  const { app }: State = useSelector((root: RootReducer) => root.mainReducer);
  const navigate = useNavigate();

  const handleMainPageLoading = () => {
    navigate('/', { replace: true })
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button type="link" href={api.baseUrl + '/auth/google/logout'} style={{ textAlign: 'left' }}>
          <LogoutOutlined/> Change account
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header
      style={{
        margin: '30px 0',
        borderBottom: '1px solid #ccc',
        background: '#fff',
        padding: '0 30px',
        display: 'flex',
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "space-between"
      }}>
      <Typography.Title style={{ userSelect: 'none', cursor: 'pointer', display: 'inline-block' }}
                        onClick={() => handleMainPageLoading()}>CodeJam chess</Typography.Title>
      {app.session &&
      <Dropdown overlay={menu} trigger={[ 'click' ]}>
        <Button type="dashed" size="large" style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={app.session.avatar} size={24} icon={<UserOutlined/>}/>
          <span style={{ marginLeft: '12px' }}>{app.session.firstName} {app.session.lastName}</span>
        </Button>
      </Dropdown>
      }
    </Layout.Header>
  );
}

export default HeaderComponent;
