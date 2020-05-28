require("module-alias/register");
const ws = require("./app/websocket");

const WebSocket = require("ws");
const http = require("http"),
  API = require("@API"),
  Server = http.Server(API),
  PORT = process.env.PORT || 3001,
  LOCAL = "0.0.0.0";

const WSServer = new WebSocket.Server({
  server: Server,
});

ws(WSServer);

Server.listen(PORT, LOCAL, () =>
  console.log(`EatSchoolSystemAPI running on ${PORT}`)
);
