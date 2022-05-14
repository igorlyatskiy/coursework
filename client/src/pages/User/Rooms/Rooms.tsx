import React, { useEffect, useState } from "react";
import { Button,  Table, Tag, Typography } from 'antd';

import CreateRoomModal from "./CreateRoomModal";
import api from "../../../api/api";
import withSession from "../../../components/WithSession";
import { getLevelColor } from "../../../Constants";

const { Link } = Typography;

let searchInput: any;
function RoomsPage() {
  const [ isCreateRoomModalVisible, setCreateRoomModalVisibility ] = useState(false);
  const [ rooms, setRooms ] = useState([]);

  useEffect(() => {
    api.getRooms().then((roomsData) => {
      setRooms(roomsData);
    })
  }, []);

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
          {levels.map((item) => <Tag key={item} color={getLevelColor(item)}>{item}</Tag>)}
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

export default withSession(RoomsPage)