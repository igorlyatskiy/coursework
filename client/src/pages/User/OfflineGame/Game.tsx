import React, { useState } from 'react'
import { Button, Radio, Select, Typography } from "antd";

import withSession from "../../../components/WithSession";
import { DEFAULT_AI_LEVEL, GAME_TYPES } from "../../../Constants";
import { useDispatch } from "react-redux";
import { startAiGame, startOfflineGame } from "../../../redux/main/actions";

const gameTypesOptions = [
  {
    value: GAME_TYPES.offline,
    label: "Player vs player (one device)"
  },
  {
    value: GAME_TYPES.ai,
    label: "Player vs computer"
  }
];

const aiLevelOptions = [
  {
    value: 1,
    label: "Easy"
  }, {
    value: 2,
    label: "Medium"
  }, {
    value: 3,
    label: "Hard"
  }
]

function Game() {
  const [ activeGameType, setActiveGameType ] = useState<string | null>(null);
  const [ aiLevel, setAiLevel ] = useState<number>(DEFAULT_AI_LEVEL);
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
        setAiLevel(DEFAULT_AI_LEVEL);
        return dispatch(startAiGame({ activeGameType, aiLevel }));
    }
  }

  const isDisabled = !activeGameType;

  return <div>
    <Select
      showSearch
      optionFilterProp="children"
      placeholder="Select game type"
      style={{ width: 250 }}
      onChange={onGameTypeChange}
    >
      {gameTypesOptions.map(gameType => (
        <Select.Option key={gameType.value} value={gameType.value}>
          {gameType.label}
        </Select.Option>
      ))}
    </Select>

    {
      activeGameType === GAME_TYPES.ai &&
      <div style={{ marginTop: 26 }}>
        <Typography.Title level={5}> AI level </Typography.Title>
        <Radio.Group
          options={aiLevelOptions}
          onChange={(event) => setAiLevel(event.target.value)}
          value={aiLevel}
          optionType="button"
        />
      </div>
    }

    <Button style={{ display: "block", marginTop: 26 }} type='primary' disabled={isDisabled}
            onClick={onSubmit}>Game! </Button>
  </div>
}

export default withSession(Game);