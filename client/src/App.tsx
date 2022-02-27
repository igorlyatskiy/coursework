import React, { useEffect } from "react";
import { Layout, message } from "antd";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import HeaderComponent from "./components/Header/Header";

import './App.css'
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/Helpers/NotFound/NotFoundPage";
import GamePage from "./pages/Game/GamePage";
import { wsIo } from "./redux/main/reducer";
import { State } from "./redux/main/type";
import { RootReducer } from "./redux";
import LoadingPage from "./pages/Helpers/Loading/Loading";
import { approveStartGame, connectApp, startGame } from "./redux/main/actions";
import RoomsPage from "./pages/Rooms/Rooms";
import SettingsPage from "./pages/Settings/Settings";

const { Content } = Layout;


export default function App() {
  const dispatch = useDispatch();
  const { app }: State = useSelector((root: RootReducer) => root.mainReducer);
  const navigate = useNavigate();

  const { isServerConnected } = app;

  useEffect(() => {
    wsIo.on('connect', () => {
      dispatch(connectApp())
    });

    wsIo.on('approveGameJoin', () => {
      dispatch(approveStartGame())
    })

    wsIo.on('denyGameJoin', () => {
      navigate('/rooms');
      message.warning('Somebody has already joined this room');
    })
  }, [])

  return (
    <Layout style={{ background: '#fff', padding: '0 40px' }}>
      <HeaderComponent/>
      <Content style={{ margin: '30px 30px 20px' }}>
        {isServerConnected
          ? <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/rooms' element={<RoomsPage/>}/>
            <Route path='/game/:gameId' element={<GamePage/>}/>
            <Route path='/settings' element={<SettingsPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
          : <LoadingPage text="Connecting to the app"/>
        }
      </Content>
    </Layout>
  );
}
