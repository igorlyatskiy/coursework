import React from "react";
import { useSelector } from "react-redux";
import { Layout } from 'antd';

import { RootReducer } from "../../redux";
import { State } from "../../redux/main/type";
import GameField from "./GameField/GameField";

export default function GamePage() {
  const { game }: State = useSelector((root: RootReducer) => root.mainReducer);

  const { board } = game;

  return <Layout>
    <GameField board={board}/>
  </Layout>
}