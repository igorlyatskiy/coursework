"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var http = require("http");
var app_1 = require("firebase/app");
require("firebase/database");
var Constants_1 = require("./Constants");
var uuidv4 = require('uuid').v4;
require('dotenv').config();
var cors = require('cors');
var express = require('express');
var WebSocket = require("ws");
app_1["default"].initializeApp(Constants_1.fireBaseConfig);
var db = app_1["default"].database();
var SERVER_PORT = process.env.PORT || 3002;
var app = express();
app.set('port', SERVER_PORT);
var server = http.createServer(app);
app.use(cors());
app.use(express.json());
// server part
app.get('/rooms', function (req, res) {
    var id = req.query.id;
    db.ref('rooms/').once('value', function (item) {
        if (id !== undefined) {
            var value = item.val();
            var room = value ? Object.values(value).find(function (e) { return e.id === id; }) : {};
            res.send(JSON.stringify(room));
        }
        if (JSON.stringify(req.query) === JSON.stringify({})) {
            res.send(JSON.stringify({
                rooms: item.val()
            }));
        }
    });
});
app.get('/history', function (req, res) {
    var id = req.query.id;
    if (id !== undefined) {
        db.ref("rooms/" + id).once('value', function (responce) {
            var room = responce.val();
            var data = {
                history: Object.values(room.game.history),
                winner: room.game.winnerId,
                names: room.players,
                id: id,
                headstart: room.game.headstart ? Object.values(room.game.headstart) : []
            };
            res.send(data);
        });
    }
    else {
        db.ref('rooms/').once('value', function (responce) {
            var rooms = Object.values(responce.val());
            rooms = (rooms.filter(function (e) { return e.players !== undefined
                && e.game.isGameProcessActive === false && e.game.history !== undefined; }));
            var history = (rooms.map(function (e) { return e.game.history; }))
                .filter(function (e) { return e !== undefined && e !== null; })
                .map(function (e) { return Object.values(e); });
            var names = Object.values(rooms.map(function (e) { return Object.values(e.players); }));
            var roomsIdArray = rooms.map(function (e) { return e.id; });
            var resultArray = [];
            var winnerIdArray = rooms.map(function (e) { return e.game.winnerId; });
            names.forEach(function (currentNames, index) {
                resultArray.push({
                    history: history[index],
                    winner: winnerIdArray[index],
                    names: currentNames,
                    id: roomsIdArray[index]
                });
            });
            res.send(resultArray);
        });
    }
});
app.put('/room', function (req, res) {
    var gameType = req.query.type;
    var id = uuidv4();
    var ref = db.ref("rooms/" + id);
    var players = req.body.players !== undefined ? req.body.players : [{}];
    var whitePlayer = players.find(function (e) { return e.color === 'w'; });
    var defaultState = {
        id: id,
        name: 'Game',
        players: players,
        activePlayerId: whitePlayer !== undefined ? whitePlayer.id : 0,
        game: {
            history: [null],
            AILevel: 1,
            gameType: gameType,
            draw: false,
            winnerId: 0,
            isGameProcessActive: true,
            selectedPlayerId: gameType === Constants_1.AI_NAME ? 1 : 0
        }
    };
    ref.set(__assign({}, defaultState)).then(function () {
        res.send(JSON.stringify({ status: true, roomId: id }));
    })["catch"](function () { return res.send(JSON.stringify({ status: false, roomId: null })); });
});
app.post('/move', function (req, res) {
    var _a = req.query, id = _a.id, time = _a.time, promotion = _a.promotion;
    var history = req.body.history;
    if (history !== undefined && id !== undefined && time !== undefined) {
        var ref = db.ref("rooms/" + id + "/game/history");
        var move = history[history.length - 1];
        var setMoveIntoHistory = void 0;
        if (move !== undefined && time !== undefined && promotion !== undefined) {
            setMoveIntoHistory = ref.push({
                move: move,
                time: time,
                promotion: promotion
            });
        }
        var setActivePlayer = db.ref("rooms/" + id + "/activePlayerId").once('value', function (item) {
            var activePlayerId = item.val();
            db.ref("rooms/" + id + "/activePlayerId").set(activePlayerId === 2 ? 1 : 2);
        });
        Promise.all([setMoveIntoHistory, setActivePlayer]).then(function () { return res.send({ status: true }); });
    }
});
app.post('/room/winner', function (req, res) {
    var _a = req.query, id = _a.id, winnerId = _a.winnerId;
    if (id !== undefined && winnerId !== undefined) {
        var ref = db.ref("rooms/" + id + "/game");
        ref.update({
            winnerId: +winnerId,
            isGameProcessActive: false
        }).then(function () {
            res.send({ status: true });
        });
    }
});
app.post('/room/draw', function (req, res) {
    var id = req.query.id;
    if (id !== undefined) {
        var ref = db.ref("rooms/" + id + "/game");
        ref.update({
            winnerId: 0,
            isGameProcessActive: false,
            draw: true
        }).then(function () {
            res.send({ status: true });
        });
    }
});
app.post('/game/headstart', function (req, res) {
    var id = req.query.id;
    var _a = req.body, color = _a.color, square = _a.square;
    if (id !== undefined) {
        var ref = db.ref("rooms/" + id + "/game/headstart");
        ref.push({
            color: color, square: square
        }).then(function () {
            res.send({ status: true });
        });
    }
});
app.post('/game/break', function (req, res) {
    var id = req.query.id;
    if (id !== undefined) {
        var ref = db.ref("rooms/" + id + "/game");
        ref.update({
            winnerId: 0,
            isGameProcessActive: false,
            draw: false
        }).then(function () {
            res.send({ status: true });
        });
    }
});
app.post('/game/clean', function (req, res) {
    var id = req.query.id;
    if (id !== undefined) {
        var ref = db.ref("rooms/" + id + "/players");
        ref.set([]).then(function () {
            res.send({ status: true });
        });
    }
});
var webSocketServer = new WebSocket.Server({ server: server });
var timers = [];
webSocketServer.on('connection', function (ws) {
    ws.on('message', function (data) {
        var message = JSON.parse(data);
        switch (message.event) {
            case 'join-room': {
                var _a = message.payload, roomId_1 = _a.roomId, name_1 = _a.name, image_1 = _a.image;
                var url_1 = 'rooms/';
                db.ref(url_1).once('value', function (item) {
                    var rooms = item.val();
                    var activeRoom = Object.values(rooms).find(function (e) { return e.id === roomId_1; });
                    if (activeRoom !== undefined) {
                        var players = activeRoom.players ? Object.values(activeRoom.players) : [];
                        var MAX_PLAYERS_AT_ONE_ROOM = 2;
                        var color = Math.random() - 0.5 > 0 ? 'w' : 'b';
                        if (players.length + 1 === MAX_PLAYERS_AT_ONE_ROOM) {
                            color = Object.values(activeRoom.players)[0].color === 'w' ? 'b' : 'w';
                        }
                        var playerId = players.length + 1;
                        db.ref("" + url_1 + roomId_1 + "/players").push({
                            id: playerId,
                            name: name_1,
                            color: color,
                            image: image_1
                        });
                        if (color === 'w') {
                            db.ref("" + url_1 + roomId_1 + "/activePlayerId").set(playerId);
                        }
                        var selectPlayerMessage_1 = {
                            selectedPlayerId: playerId,
                            event: 'set-selected-player',
                            id: roomId_1
                        };
                        webSocketServer.clients.forEach(function (client) {
                            client.send(JSON.stringify(selectPlayerMessage_1));
                        });
                        if (players.length + 1 === MAX_PLAYERS_AT_ONE_ROOM) {
                            var startGameMessage_1 = {
                                event: 'start-game',
                                id: roomId_1
                            };
                            webSocketServer.clients.forEach(function (client) {
                                client.send(JSON.stringify(startGameMessage_1));
                            });
                            var timerMessage_1 = {
                                event: 'timer',
                                id: roomId_1
                            };
                            var timerInterval = setInterval(function () {
                                webSocketServer.clients.forEach(function (client) {
                                    client.send(JSON.stringify(timerMessage_1));
                                });
                            }, 1000);
                            timers.forEach(function (timer) {
                                if (timer.roomId === roomId_1) {
                                    clearInterval(timer.timerInterval);
                                }
                            });
                            timers.push({ roomId: roomId_1, timerInterval: timerInterval });
                        }
                    }
                });
                break;
            }
            case 'move': {
                var _b = message.payload, to = _b.to, from = _b.from, time = _b.time, color = _b.color, piece = _b.piece, promotion = _b.promotion;
                var activeRoomId_1 = message.payload.roomId;
                var moveAction_1 = {
                    event: 'move-figure',
                    id: activeRoomId_1
                };
                var ref = db.ref("rooms/" + activeRoomId_1 + "/game/history/" + time);
                var moveFigure_1 = ref.set({
                    time: time,
                    move: {
                        from: from, to: to, color: color, piece: piece, promotion: promotion
                    }
                });
                db.ref("rooms/" + activeRoomId_1 + "/activePlayerId").once('value', function (item) {
                    var activePlayerId = item.val();
                    var changeActivePlayer = db.ref("rooms/" + activeRoomId_1 + "/activePlayerId").set(activePlayerId === 2 ? 1 : 2);
                    Promise.all([moveFigure_1, changeActivePlayer]).then(function () {
                        webSocketServer.clients.forEach(function (client) {
                            client.send(JSON.stringify(moveAction_1));
                        });
                    });
                });
                break;
            }
            case 'stop-timer': {
                var selectedTimer = timers.find(function (e) { return e.roomId === message.payload; });
                if (selectedTimer) {
                    clearInterval(selectedTimer.timerInterval);
                }
                break;
            }
            case 'finish-game': {
                var _c = message.payload, winnerId = _c.winnerId, draw = _c.draw, roomId_2 = _c.roomId;
                var ref = db.ref("rooms/" + roomId_2 + "/game");
                ref.update({
                    winnerId: winnerId,
                    isGameProcessActive: false,
                    draw: draw
                });
                var finishGameAction_1 = {
                    event: 'finish-game',
                    id: roomId_2
                };
                timers.forEach(function (timer) {
                    if (timer.roomId === roomId_2) {
                        clearInterval(timer.timerInterval);
                    }
                });
                webSocketServer.clients.forEach(function (client) {
                    client.send(JSON.stringify(finishGameAction_1));
                });
                break;
            }
            case 'give-headstart': {
                var _d = message.payload, roomId = _d.roomId, square = _d.square;
                var giveHeadStartMessage_1 = {
                    event: 'give-headstart',
                    square: square,
                    id: roomId
                };
                webSocketServer.clients.forEach(function (client) {
                    client.send(JSON.stringify(giveHeadStartMessage_1));
                });
                break;
            }
            default: ws.send((new Error('Wrong query')).message);
        }
    });
    ws.once('error', function (e) { return ws.send(e); });
});
server.listen(SERVER_PORT, function () {
    console.log("Server is running on port " + SERVER_PORT);
});
