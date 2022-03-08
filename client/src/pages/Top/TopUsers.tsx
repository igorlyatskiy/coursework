import React, { useEffect, useState } from 'react';
import { Tag, Typography } from "antd";

import withSession from "../../components/WithSession";
import api from "../../api/api";
import { getColor } from "../../Constants";
import TopUsersTable from './styled/TopUsers'

function TopUsers() {
  const [ topUsers, setTopUsers ] = useState([]);

  useEffect(() => {
    api.getTopUsers().then((topUsersData) => {
      setTopUsers(topUsersData);
    })
  }, []);

  const columns = [
    {
      title: 'Player',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Level',
      dataIndex: 'levels',
      key: 'level',
      render: (levels: string[]) => {
        return <>
          {levels.map((item) => <Tag key={item} color={getColor(item)}>{item}</Tag>)}
        </>
      }
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
  ];
  return <>
    <Typography.Title level={2}> Top players </Typography.Title>
    <TopUsersTable dataSource={topUsers} columns={columns} bordered/>
  </>
}

export default withSession(TopUsers)