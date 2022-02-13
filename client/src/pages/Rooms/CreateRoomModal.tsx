import React from "react";
import { Button, Form, Input, message, Modal } from "antd";
import api from "../../api/api";

interface CreateRoomModalProps {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  setRooms: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function CreateRoomModal({ isModalVisible, handleOk, handleCancel, setRooms }: CreateRoomModalProps) {
  const [ form ] = Form.useForm();

  const handleFormSubmit = async (event: { name: string }) => {
    handleOk();
    form.resetFields();
    try {
      const { data } = await api.createRoom(event.name);
      setRooms(data);
      message.success('Room has been created');
    } catch (error) {
      message.error('An error occurred');
    }
  }

  return <Modal visible={isModalVisible} onCancel={handleCancel} title='Create a room'
                footer={[
                  <Button form="createRoom" key="resetCreateRoom" htmlType="reset" danger={true}>
                    Reset
                  </Button>,
                  <Button form="createRoom" type='primary' key="submitCreateRoom" htmlType="submit">
                    Submit
                  </Button>
                ]}>
    <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 14, offset: 1 }} name="createRoom"
          onFinish={handleFormSubmit}
          initialValues={{
            remember: false,
          }}>
      <Form.Item
        name={[ 'name' ]}
        label="Room name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>
    </Form>
  </Modal>
}