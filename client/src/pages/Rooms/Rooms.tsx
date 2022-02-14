import React, { useEffect, useState } from "react";
import { Button,  Table, Tag, Typography } from 'antd';


import CreateRoomModal from "./CreateRoomModal";
import api from "../../api/api";

const { Link } = Typography;

let searchInput: any;
export default function RoomsPage() {
  const [ isCreateRoomModalVisible, setCreateRoomModalVisibility ] = useState(false);
  const [ rooms, setRooms ] = useState([]);

  useEffect(() => {
    api.getRooms().then((roomsData) => {
      setRooms(roomsData);
    })
  }, []);

  const getColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'green';
      case 'Champion':
        return 'purple';
      case 'Hero':
        return 'orange';
      case 'Admin':
        return 'black';
      default:
        return 'gray'
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Opponent',
      dataIndex: 'playerName',
      key: 'playerName',
    },
    {
      title: 'Level',
      dataIndex: 'levels',
      key: 'level',
      render: (levels: string[]) => {
        return <>
          {levels.map((item) => <Tag color={getColor(item)}>{item}</Tag>)}
        </>
      }
    },
    {
      title: 'Action',
      dataIndex: 'roomId',
      key: 'action',
      render: (roomId: string) => <Link href={`/game/${roomId}`}>Join game!</Link>
    },
  ];
  return <>
    <Button
      onClick={() => setCreateRoomModalVisibility(true)}
      type="primary"
      style={{
        marginBottom: 16,
      }}
    >
      Add a game
    </Button>
    <Table dataSource={rooms} columns={columns} bordered/>
    <CreateRoomModal handleCancel={() => setCreateRoomModalVisibility(false)}
                     handleOk={() => setCreateRoomModalVisibility(false)} isModalVisible={isCreateRoomModalVisible}
                     setRooms={setRooms}/>
  </>
}