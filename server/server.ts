import * as http from 'http';
import firebase from 'firebase/app';
import 'firebase/database';
import {
  AI_NAME, fireBaseConfig, GameRoom, PlayerData, TimerInfo,
} from './Constants';

const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const WebSocket = require("ws");

firebase.initializeApp(fireBaseConfig);
const db = firebase.database();
const SERVER_PORT = process.env.PORT || 3002;

const app = express();
app.set('port', SERVER_PORT);

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// server part

app.get('/rooms', (req, res) => {
  const { id } = req.query;
  db.ref('rooms/').once('value', (item) => {
    if (id !== undefined) {
      const value = item.val();
      const room = value ? Object.values(value).find((e: any) => e.id === id) : {};
      res.send(JSON.stringify(
        room,
      ));
    }
    if (JSON.stringify(req.query) === JSON.stringify({})) {
      res.send(JSON.stringify({
        rooms: item.val(),
      }));
    }
  });
});

app.get('/history', (req, res) => {
  const { id } = req.query;
  if (id !== undefined) {
    db.ref(`rooms/${id}`).once('value', (responce) => {
      const room = responce.val() as GameRoom;
      const data = {
        history: Object.values(room.game.history),
        winner: room.game.winnerId,
        names: room.players,
        id,
        headstart: room.game.headstart ? Object.values(room.game.headstart) : [],
      };
      res.send(data);
    });
  } else {
    db.ref('rooms/').once('value', (responce) => {
      let rooms = Object.values(responce.val()) as GameRoom[];
      rooms = (rooms.filter((e) => e.players !== undefined
        && e.game.isGameProcessActive === false && e.game.history !== undefined));
      const history = (rooms.map((e) => e.game.history))
        .filter((e) => e !== undefined && e !== null)
        .map((e) => Object.values(e));
      const names = Object.values(rooms.map((e) => Object.values(e.players)));
      const roomsIdArray = rooms.map((e) => e.id);
      const resultArray: any = [];
      const winnerIdArray = rooms.map((e) => e.game.winnerId);
      names.forEach((currentNames, index) => {
        resultArray.push({
          history: history[index],
          winner: winnerIdArray[index],
          names: currentNames,
          id: roomsIdArray[index],
        });
      });
      res.send(resultArray);
    });
  }
});

app.put('/room', (req, res) => {
  const gameType = req.query.type;
  const id = uuidv4();
  const ref = db.ref(`rooms/${id}`);
  const players = req.body.players !== undefined ? req.body.players : [{}];
  const whitePlayer = players.find((e: PlayerData) => e.color === 'w');
  const defaultState = {
    id,
    name: 'Game',
    players,
    activePlayerId: whitePlayer !== undefined ? whitePlayer.id : 0,
    game: {
      history: [null],
      AILevel: 1,
      gameType,
      draw: false,
      winnerId: 0,
      isGameProcessActive: true,
      selectedPlayerId: gameType === AI_NAME ? 1 : 0,
    },
  };
  ref.set({
    ...defaultState,
  }).then(() => {
    res.send(JSON.stringify({ status: true, roomId: id }));
  }).catch(() => res.send(JSON.stringify({ status: false, roomId: null })));
});

app.post('/move', (req, res) => {
  const { id, time, promotion } = req.query;
  const { history } = req.body;
  if (history !== undefined && id !== undefined && time !== undefined) {
    const ref = db.ref(`rooms/${id}/game/history`);
    const move = history[history.length - 1];
    let setMoveIntoHistory;
    if (move !== undefined && time !== undefined && promotion !== undefined) {
      setMoveIntoHistory = ref.push({
        move,
        time,
        promotion,
      });
    }
    const setActivePlayer = db.ref(`rooms/${id}/activePlayerId`).once('value', (item) => {
      const activePlayerId = item.val();
      db.ref(`rooms/${id}/activePlayerId`).set(activePlayerId === 2 ? 1 : 2);
    });
    Promise.all([setMoveIntoHistory, setActivePlayer]).then(() => res.send({ status: true }));
  }
});

app.post('/room/winner', (req, res) => {
  const { id, winnerId } = req.query;
  if (id !== undefined && winnerId !== undefined) {
    const ref = db.ref(`rooms/${id}/game`);
    ref.update({
      winnerId: +winnerId,
      isGameProcessActive: false,
    }).then(() => {
      res.send({ status: true });
    });
  }
});

app.post('/room/draw', (req, res) => {
  const { id } = req.query;
  if (id !== undefined) {
    const ref = db.ref(`rooms/${id}/game`);
    ref.update({
      winnerId: 0,
      isGameProcessActive: false,
      draw: true,
    }).then(() => {
      res.send({ status: true });
    });
  }
});

app.post('/game/headstart', (req, res) => {
  const { id } = req.query;
  const { color, square } = req.body;
  if (id !== undefined) {
    const ref = db.ref(`rooms/${id}/game/headstart`);
    ref.push({
      color, square,
    }).then(() => {
      res.send({ status: true });
    });
  }
});

app.post('/game/break', (req, res) => {
  const { id } = req.query;
  if (id !== undefined) {
    const ref = db.ref(`rooms/${id}/game`);
    ref.update({
      winnerId: 0,
      isGameProcessActive: false,
      draw: false,
    }).then(() => {
      res.send({ status: true });
    });
  }
});

app.post('/game/clean', (req, res) => {
  const { id } = req.query;
  if (id !== undefined) {
    const ref = db.ref(`rooms/${id}/players`);
    ref.set([]).then(() => {
      res.send({ status: true });
    });
  }
});

const webSocketServer = new WebSocket.Server({ server });
const timers: TimerInfo[] = [];

webSocketServer.on('connection', (ws) => {
  ws.on('message', (data: string) => {
    const message = JSON.parse(data);
    switch (message.event) {
      case 'join-room': {
        const { roomId, name, image } = message.payload;
        const url = 'rooms/';
        db.ref(url).once('value', (item) => {
          const rooms = item.val();
          const activeRoom = Object.values(rooms).find((e: any) => e.id === roomId) as GameRoom;
          if (activeRoom !== undefined) {
            const players = activeRoom.players ? Object.values(activeRoom.players) : [];
            const MAX_PLAYERS_AT_ONE_ROOM = 2;
            let color = Math.random() - 0.5 > 0 ? 'w' : 'b';
            if (players.length + 1 === MAX_PLAYERS_AT_ONE_ROOM) {
              color = Object.values(activeRoom.players)[0].color === 'w' ? 'b' : 'w';
            }
            const playerId = players.length + 1;
            db.ref(`${url}${roomId}/players`).push({
              id: playerId,
              name,
              color,
              image,
            });
            if (color === 'w') {
              db.ref(`${url}${roomId}/activePlayerId`).set(playerId);
            }
            const selectPlayerMessage = {
              selectedPlayerId: playerId,
              event: 'set-selected-player',
              id: roomId,
            };
            webSocketServer.clients.forEach((client) => {
              client.send(JSON.stringify(selectPlayerMessage));
            });
            if (players.length + 1 === MAX_PLAYERS_AT_ONE_ROOM) {
              const startGameMessage = {
                event: 'start-game',
                id: roomId,
              };
              webSocketServer.clients.forEach((client) => {
                client.send(JSON.stringify(startGameMessage));
              });
              const timerMessage = {
                event: 'timer',
                id: roomId,
              };
              const timerInterval = setInterval(() => {
                webSocketServer.clients.forEach((client) => {
                  client.send(JSON.stringify(timerMessage));
                });
              }, 1000);
              timers.forEach((timer) => {
                if (timer.roomId === roomId) {
                  clearInterval(timer.timerInterval);
                }
              });
              timers.push({ roomId, timerInterval });
            }
          }
        });
        break;
      }
      case 'move': {
        const {
          to, from, time, color, piece, promotion,
        } = message.payload;
        const activeRoomId = message.payload.roomId;
        const moveAction = {
          event: 'move-figure',
          id: activeRoomId,
        };
        const ref = db.ref(`rooms/${activeRoomId}/game/history/${time}`);
        const moveFigure = ref.set({
          time,
          move: {
            from, to, color, piece, promotion,
          },
        });
        db.ref(`rooms/${activeRoomId}/activePlayerId`).once('value', (item) => {
          const activePlayerId = item.val();
          const changeActivePlayer = db.ref(`rooms/${activeRoomId}/activePlayerId`).set(activePlayerId === 2 ? 1 : 2);
          Promise.all([moveFigure, changeActivePlayer]).then(() => {
            webSocketServer.clients.forEach((client) => {
              client.send(JSON.stringify(moveAction));
            });
          });
        });
        break;
      }

      case 'stop-timer': {
        const selectedTimer = timers.find((e) => e.roomId === message.payload);
        if (selectedTimer) {
          clearInterval(selectedTimer.timerInterval);
        }
        break;
      }

      case 'finish-game': {
        const { winnerId, draw, roomId } = message.payload;
        const ref = db.ref(`rooms/${roomId}/game`);
        ref.update({
          winnerId,
          isGameProcessActive: false,
          draw,
        });
        const finishGameAction = {
          event: 'finish-game',
          id: roomId,
        };

        timers.forEach((timer) => {
          if (timer.roomId === roomId) {
            clearInterval(timer.timerInterval);
          }
        });
        webSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify(finishGameAction));
        });
        break;
      }

      case 'give-headstart': {
        const { roomId, square } = message.payload;
        const giveHeadStartMessage = {
          event: 'give-headstart',
          square,
          id: roomId,
        };
        webSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify(giveHeadStartMessage));
        });
        break;
      }

      default: ws.send((new Error('Wrong query')).message);
    }
  });

  ws.once('error', (e) => ws.send(e));
});

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`)
});