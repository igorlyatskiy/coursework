import React from "react";
import { Space, Spin, Typography } from 'antd';

const { Title } = Typography;

export default function LoadingPage({ text }: { text: string }) {
  return <>
    <Space size="large">
      <Title level={3}>{text}</Title>
      <Spin size="large"/>
    </Space>
  </>
}
