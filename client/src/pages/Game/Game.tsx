import React, { useState } from 'react'
import withSession from "../../components/WithSession";
import { Button, Cascader } from "antd";

const options = [
  {
    value: "pvp-offline",
    label: "Player vs player (one computer)"
  },
  {
    value: "ai",
    label: "Player vs computer"
  }
];

function Game() {
  const [ activeGameType, setActiveGameType ] = useState<string | null>(null);

  const onGameTypeChange = (type: string[] | undefined) => {
    setActiveGameType(type ? type[0] : null);
  }

  return <div>
    <Cascader
      style={{ width: 280, marginBottom: 30 }}
      options={options}
      onChange={(data: any) => onGameTypeChange(data)}
      placeholder="Please select the game type..."
    />
    <Button style={{ display: "block" }} type='primary' disabled={!activeGameType}>Game! </Button>
  </div>
}

export default withSession(Game);