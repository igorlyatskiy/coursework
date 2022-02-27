import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from 'antd';
import { useParams } from "react-router-dom";

import { RootReducer } from "../../redux";
import { State } from "../../redux/main/type";
import GameField from "./GameField/GameField";
import LoadingPage from "../Helpers/Loading/Loading";
import { startGame } from "../../redux/main/actions";
import withSession from "../../components/WithSession";

function GamePage() {
  const { game }: State = useSelector((root: RootReducer) => root.mainReducer);
  const { gameId } = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameId) {
      dispatch(startGame(gameId))
    }
  }, [])

  return <>
    {
      game.isGameActive
        ? <Layout>
          <GameField board={game.board}/>
        </Layout>
        : <LoadingPage text='Checking all settings'/>
    }
  </>
}

export default withSession(GamePage)