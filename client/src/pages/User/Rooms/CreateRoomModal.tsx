import React, { useCallback } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { useDispatch } from "react-redux";

import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { joinOnlineGame } from "../../../redux/main/actions";

interface CreateRoomModalProps {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  setRooms: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function CreateRoomModal({ isModalVisible, handleOk, handleCancel, setRooms }: CreateRoomModalProps) {
  const [ form ] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToGamePage = useCallback((gameId: string) => navigate(`/game/${gameId}`, { replace: true }), [ navigate ]);

  const handleFormSubmit = async (event: { name: string }) => {
    handleOk();
    form.resetFields();
    try {
      const { data } = await api.createRoom(event.name);
      const { rooms, newRoomId } = data;
      setRooms(rooms);
      if (newRoomId) {
        goToGamePage(newRoomId);
      }
      message.success('Room has been created');
      dispatch(joinOnlineGame(newRoomId));
    } catch (error) {
      message.error("Can't create a room");
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