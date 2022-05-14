import React, { useEffect, useState } from "react";
import { message, Popconfirm, Table, Tag } from "antd";
import { useSelector } from "react-redux";

import withSession from "../../../components/WithSession";
import { State } from "../../../redux/main/type";
import { RootReducer } from "../../../redux";
import { isAdmin, isSuperUser } from "../../../roles/isRole";
import api from "../../../api/api";
import { getLevelColor, getRoleColor, USERS_ROLES } from "../../../Constants";
import { CheckCircleTwoTone, EditTwoTone, StopTwoTone } from "@ant-design/icons";
import UpdateUserModal from "./UpdateUserModal";

export interface User {
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
  const isSuperAdmin = isSuperUser();

  const [ users, setUsers ] = useState<User[]>([]);
  const [ editingUser, setEditingUser ] = useState<User | null>(null);

  useEffect(() => {
    api.getAllUsers().then((data) => {
      setUsers(data);
    })
  }, [])

  if (!isAdminUser && !isSuperAdmin) {
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
    },
    {
      title: '',
      dataIndex: 'edit',
      key: 'edit',
      render: (tmp: any, user: User) => <EditTwoTone color='blue' onClick={() => {
        setEditingUser(user)
      }
      }/>
    }
  ];

  if (isSuperAdmin) {
    columns.splice(2, 0, {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => {
        return <>
          {roles.map((item) => <Tag key={item} color={getRoleColor(item)}>{item}</Tag>)}
        </>
      }
    })
  }


  return <>
    <Table dataSource={users} columns={columns} bordered/>
    <UpdateUserModal
      setUsers={setUsers} user={editingUser}
      handleOk={() => {
        setEditingUser(null);
      }}
      handleCancel={() => {
        setEditingUser(null)
      }
      }
    />
  </>
}

export default withSession(AdminUsersPage);