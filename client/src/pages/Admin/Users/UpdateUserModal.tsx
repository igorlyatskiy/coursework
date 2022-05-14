import React, { useCallback, useEffect } from "react";
import { Button, Form, Input, message, Modal, Select, Tag } from "antd";

import { User } from "./Users";
import { PLAYERS_LEVELS, USERS_ROLES } from "../../../Constants";
import api from "../../../api/api";

interface UpdateUserModal {
  handleOk?: () => void;
  handleCancel?: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  user: User | null;
}

interface UpdateUserData {
  firstName: string;
  lastName: string;
  levels: PLAYERS_LEVELS[];
  roles: USERS_ROLES[];
  username: string | null;
}

export default function UpdateUserModal({ handleOk, handleCancel, setUsers, user }: UpdateUserModal) {
  const [ form ] = Form.useForm();

  const isModalVisible = !!user;

  useEffect(() => {
    form.resetFields();
  }, [ isModalVisible ])

  const handleFormSubmit = async (eventData: UpdateUserData) => {
    try {
      const data = Object.assign(user, eventData);
      const updatedUsers = await api.updateUser(data);
      setUsers(updatedUsers);
      if (handleOk) {
        handleOk()
      }
      message.success('User was updated');
    } catch (error) {
      message.error("Can't update a User");
    }
  }

  const handleFormCancel = () => {
    if (handleCancel) {
      handleCancel();
    }
  }

  return <Modal
    visible={isModalVisible} onCancel={handleFormCancel} title='Update a user'
    footer={[
      <Button form="editUser" key="resetCreateRoom" htmlType="reset" danger={true}>
        Reset
      </Button>,
      <Button form="editUser" type='primary' key="submitCreateRoom" htmlType="submit">
        Submit
      </Button>
    ]}>
    <Form
      form={form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 14, offset: 1 }}
      name="editUser"
      onFinish={handleFormSubmit}
    >
      <Form.Item
        name={[ 'firstName' ]}
        label="First name"
        initialValue={user?.firstName}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name={[ 'lastName' ]}
        label="Last name"
        rules={[
          {
            required: true,
          },
        ]}
        initialValue={user?.lastName}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name={[ 'username' ]}
        label="Username"
        rules={[
          {
            required: false,
          },
        ]}
        initialValue={user?.username}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name={[ 'levels' ]}
        label="Levels"
        rules={[
          {
            required: false,
          },
        ]}
        initialValue={user?.levels}
      >
        <Select mode="multiple" placeholder="Select levels">
          {
            Object.values(PLAYERS_LEVELS).map((level: string) =>
              <Select.Option value={level}>{level}</Select.Option>
            )
          }
        </Select>
      </Form.Item>
      <Form.Item
        name={[ 'roles' ]}
        label="Roles"
        rules={[
          {
            required: false,
          },
        ]}
        initialValue={user?.roles}
      >
        <Select mode="multiple" placeholder="Select roles">
          {
            Object.values(USERS_ROLES).map((role: string) =>
              <Select.Option value={role}>{role}</Select.Option>
            )
          }
        </Select>
      </Form.Item>
    </Form>
  </Modal>
}