import React, { useState } from 'react'
import { Button, Select } from "antd";

import withSession from "../../../components/WithSession";
import { GAME_TYPES } from "../../../Constants";
import { useDispatch } from "react-redux";
import { startAiGame, startOfflineGame } from "../../../redux/main/actions";

const options = [
  {
    value: GAME_TYPES.offline,
    label: "Player vs player (one device)"
  },
  {
    value: GAME_TYPES.ai,
    label: "Player vs computer"
  }
];

function Game() {
  const [ activeGameType, setActiveGameType ] = useState<string | null>(null);
  const dispatch = useDispatch();

  const onGameTypeChange = (type: string | undefined) => {
    setActiveGameType(type || null);
  }

  const onSubmit = () => {
    switch (activeGameType) {
      case GAME_TYPES.offline:
        setActiveGameType(null);
        return dispatch(startOfflineGame(activeGameType));
      case GAME_TYPES.ai:
        setActiveGameType(null);
        return dispatch(startAiGame(activeGameType));
    }
  }

  return <div>
    <Select
      showSearch
      optionFilterProp="children"
      placeholder="Select game type"
      style={{ width: 250, marginBottom: 16 }}
      onChange={onGameTypeChange}
    >
      {options.map(gameType => (
        <Select.Option key={gameType.value} value={gameType.value}>
          {gameType.label}
        </Select.Option>
      ))}
    </Select>
    <Button style={{ display: "block" }} type='primary' disabled={!activeGameType} onClick={onSubmit}>Game! </Button>
  </div>
}

export default withSession(Game);