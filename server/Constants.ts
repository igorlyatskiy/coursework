require('dotenv').config();

export interface TimerInfo {
  roomId: number,
  timerInterval: NodeJS.Timeout
}

export interface PlayerData extends Color {
  name: string,
  id: number,
  image: string,
}
export interface Color {
  color: 'b' | 'w'
}

export interface HistoryAction {
  move: HistoryMove,
  time: number
}

interface HistoryMove {
  from: string,
  to: string
}

export interface GameRoom {
  id: string,
  players: PlayerData[],
  isGameActive: boolean,
  name: string,
  game: StoreGame
}

interface StoreGame {
  isGameProcessActive: boolean,
  gameType: string,
  history: HistoryAction[],
  winnerId: number,
  headstart: HeadStart[]
}

interface HeadStart {
  color: string,
  square: string
}

export const AI_NAME = 'ai';

export const fireBaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_SID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MID,
};
