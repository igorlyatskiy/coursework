import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from 'antd';
import { useParams } from "react-router-dom";

import { RootReducer } from "../../../redux";
import { State } from "../../../redux/main/type";
import GameField from "./GameField/GameField";
import LoadingPage from "../Helpers/Loading/Loading";
import { joinOnlineGame, leaveGame } from "../../../redux/main/actions";
import withSession from "../../../components/WithSession";
import { GAME_TYPES } from "../../../Constants";

function GamePage() {
  const { game }: State = useSelector((root: RootReducer) => root.mainReducer);
  const { gameId } = useParams()
  const dispatch = useDispatch();

  const { isGameActive } = game;

  useEffect(() => {
    if (gameId && game.currentGameType === GAME_TYPES.online) {
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