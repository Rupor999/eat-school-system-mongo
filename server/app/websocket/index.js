const Chat = require("@root/app/setup").Chat; //models.City

module.exports = (WSServer) => {
  WSServer.on("connection", (ws) => {
    console.log("CONNECTION");
    ws.on("message", async (message) => {
      let inputMessage = JSON.parse(message);
      switch (inputMessage.messageType) {
        case "getMessage":
          // getMessage();
          break;
        case "saveMessage":
          // saveMessage(inputMessage);
          break;
        default:
      }
    });
  });
};

function getMessage(inputMessage) {
  return new Promise((resolve) => {
    Chat.find({ from: inputMessage.userId }, (err, chat) => {
      resolve(chat);
    });
    return [];
  });
}

function saveMessage(inputMessage) {
  return new Promise((resolve) => {
    Chat.save({ from: inputMessage.userId }, (err) => {
      resolve();
    });
  });
}
