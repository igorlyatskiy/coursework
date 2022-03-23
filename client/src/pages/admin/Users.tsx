import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Table, Tag } from "antd";
import { useSelector } from "react-redux";

import withSession from "../../components/WithSession";
import { State } from "../../redux/main/type";
import { RootReducer } from "../../redux";
import { isAdmin } from "../../roles/isRole";
import api from "../../api/api";
import { getLevelColor, getRoleColor, USERS_ROLES } from "../../Constants";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  avatar: string;
  email: string;
  isActive: boolean;
  roles: USERS_ROLES[];
  levels: string[];
  score: number;
  name?: string;
}

function AdminUsersPage() {
  const { app }: State = useSelector((root: RootReducer) => root.mainReducer);
  const isAdminUser = isAdmin(app.session?.roles);

  const [ users, setUsers ] = useState<User[]>([]);

  useEffect(() => {
    api.getAllUsers().then((data) => {
      setUsers(data);
    })
  }, [])

  if (!isAdminUser) {
    return <div>Forbidden</div>
  }

  const toggleUserStatus = async (user: User) => {
    try {
      const data = await api.updateUserStatus(user.id, !user.isActive);
      console.log(data);
      setUsers(data);
      message.success("User was updated!")
    } catch (error) {
      message.error("An error occurred");
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, user: User) => user.username ? `${user.username} (${user.firstName} ${user.lastName})` : `${user.firstName} ${user.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => {
        return <>
          {roles.map((item) => <Tag key={item} color={getRoleColor(item)}>{item}</Tag>)}
        </>
      }
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
      title: 'isActive',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, user: User) => <Popconfirm
        title="Toggle the user status?"
        okText="Yes"
        onConfirm={() => toggleUserStatus(user)}
        cancelText="No"
      >
        {isActive ? <CheckCircleTwoTone twoToneColor='#00FF00'/> : <StopTwoTone twoToneColor='red'/>}
      </Popconfirm>
    }
  ];
  return <>
    <Table dataSource={users} columns={columns} bordered/>
  </>
}

export default withSession(AdminUsersPage);