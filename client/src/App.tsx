import React from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import HeaderComponent from "./components/Header/Header";

import './App.css'
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import GamePage from "./pages/Game/GamePage";

export default function App() {
  const { Content } = Layout

  return (
    <Layout style={{ background: '#fff', padding: '0 40px' }}>
      <HeaderComponent/>
      <Content style={{ margin: '30px 30px 20px' }}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/game' element={<GamePage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Content>
    </Layout>
  );
}
