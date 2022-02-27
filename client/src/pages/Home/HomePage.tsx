import React from "react";
import { Col, List, Row, Layout } from "antd";
import { FireTwoTone, PlaySquareTwoTone, SettingTwoTone, ThunderboltTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startGame } from "../../redux/main/actions";
import withSession from "../../components/WithSession";

function HomePage() {
  const dispatch = useDispatch();
  const data = [
    {
      icon: <FireTwoTone twoToneColor="orange"/>,
      text: 'Game.',
      path: '/rooms',
      action: () => {

      },
    },
    {
      icon: <PlaySquareTwoTone twoToneColor='red'/>,
      text: 'Replays.',
      path: '/replays'
    },
    {
      icon: <ThunderboltTwoTone twoToneColor='blue'/>,
      text: 'Online.',
      path: '/online'
    },
    {
      icon: <SettingTwoTone twoToneColor='gray'/>,
      text: 'Settings.',
      path: '/settings'
    }
  ];

  // TODO REMOVE IT
  const handleMenuClickAction = (action: any) => action ? action() : null

  return <Row gutter={24}>
    <Col xs={24} sm={12} md={10} lg={8} style={{ marginBottom: 16 }}>
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Link to={item.path} onClick={() => handleMenuClickAction(item.action)}>
              {item.icon}
              <span style={{ marginLeft: '6px' }}>{item.text}</span>
            </Link>
          </List.Item>
        )}
      />
    </Col>
  </Row>
}

export default withSession(HomePage)