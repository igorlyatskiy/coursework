import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Layout, message, Typography } from "antd";
import { State } from "../../../redux/main/type";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../redux";
import api from "../../../api/api";
import withSession, { getSession } from "../../../components/WithSession";
import { IdcardOutlined } from "@ant-design/icons";

function SettingsPage() {
  const { app }: State = useSelector((root: RootReducer) => root.mainReducer);
  const [ username, setUsername ] = useState<string | null>(null);
  const dispatch = useDispatch();

  const isSessionActive = app.session?.firstName && app.session.lastName;

  useEffect(() => {
    setUsername(null);
    if (app.session?.username) {
      setUsername(app.session.username);
    }
  }, [])

  const handleSettingsSubmit = async () => {
    try {
      await api.updateMe(username as string)
      getSession(dispatch)
      message.success('Settings were updated');
    } catch (error) {
      message.error("Can't update settings")
    }
  }

  return <>
    {isSessionActive &&
    <>
      <Card title={
        <><IdcardOutlined/> <b>Username</b></>
      } style={{ width: 300 }}>
        <Typography.Text
          editable={{ onChange: setUsername }}>{username || `${app.session?.firstName} ${app.session?.lastName}`}</Typography.Text>
      </Card>
    </>

    }

    <Button type='primary' style={{ marginTop: 20 }} onClick={handleSettingsSubmit}>Save</Button>
  </>
}

export default withSession(SettingsPage)