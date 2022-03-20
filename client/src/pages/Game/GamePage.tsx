import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, message } from 'antd';
import { useParams } from "react-router-dom";

import { RootReducer } from "../../redux";
import { State } from "../../redux/main/type";
import GameField from "./GameField/GameField";
import LoadingPage from "../Helpers/Loading/Loading";
import { joinOnlineGame, leaveGame } from "../../redux/main/actions";
import withSession from "../../components/WithSession";

function GamePage() {
  const { game }: State = useSelector((root: RootReducer) => root.mainReducer);
  const { gameId } = useParams()
  const dispatch = useDispatch();

  const { isGameActive } = game;

  useEffect(() => {
    if (gameId) {
      dispatch(joinOnlineGame(gameId))
    }

    return () => {
      if (gameId && !game.isGameFinished) {
        dispatch(leaveGame(gameId));
      }
    }
  }, [ gameId ])

  return <>
    {
      isGameActive
        ? <Layout>
          <GameField board={game.board}/>
        </Layout>
        : <LoadingPage text='Waiting for the opponent'/>
    }
  </>
}

export default withSession(GamePage)