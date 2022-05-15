import React from "react";
import { Col, List, Row, Layout, Typography } from "antd";
import {
  FireTwoTone,
  PlaySquareTwoTone,
  SettingTwoTone,
  StarTwoTone,
  ThunderboltTwoTone,
  ToolFilled
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import withSession from "../../components/WithSession";
import { State } from "../../redux/main/type";
import { RootReducer } from "../../redux";
import { isAdmin } from "../../roles/isRole";

function HomePage() {
  const { app }: State = useSelector((root: RootReducer) => root.mainReducer);

  const isAdminUser = isAdmin(app.session?.roles);

  const userData = [
    {
      icon: <FireTwoTone twoToneColor="orange"/>,
      text: 'Game.',
      path: '/offline',
    },
    // {
    //   icon: <PlaySquareTwoTone twoToneColor='red'/>,
    //   text: 'Replays.',
    //   path: '/replays'
    // },
    {
      icon: <ThunderboltTwoTone twoToneColor='red'/>,
      text: 'Online.',
      path: '/online'
    },
    {
      icon: <StarTwoTone twoToneColor='#FFBF00	'/>,
      text: 'Top.',
      path: '/top',
    },
    {
      icon: <SettingTwoTone twoToneColor='gray'/>,
      text: 'Settings.',
      path: '/settings'
    }
  ];

  const adminData = [
    {
      icon: null,
      text: "Users.",
      path: '/admin/users',
    },
  ];

  return <Row gutter={24}>
    <Col xs={24} sm={12} md={10} lg={8} style={{ marginBottom: 16 }}>
      <List
        size="small"
        bordered
        dataSource={userData}
        renderItem={(item) => (
          <List.Item>
            <Link to={item.path}>
              {item.icon}
              <span style={{ marginLeft: '6px' }}>{item.text}</span>
            </Link>
          </List.Item>
        )}
        style={{ marginBottom: 32 }}
      />
      {
        isAdminUser && <List
          size="small"
          header={<b><ToolFilled/> App management </b>}
          bordered
          dataSource={adminData}
          renderItem={(item) => (
            <List.Item>
              <Link to={item.path}>
                {!!item.icon && item.icon}
                <span style={{ marginLeft: !!item.icon ? '6px' : 0 }}>{item.text}</span>
              </Link>
            </List.Item>
          )}
        />
      }

    </Col>
  </Row>
}

export default withSession(HomePage)