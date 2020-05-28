const Chat = require("@root/app/setup").Chat; //models.City

module.exports = (WSServer) => {
  WSServer.on("connection", (ws) => {
    console.log("CONNECTION");
    ws.on("message", async (message) => {
      let inputMessage = JSON.parse(message);
      switch (inputMessage.messageType) {
        case "getMessage":
          ws.send(
            JSON.stringify({
              messageType: "getMessage",
              message: getMessage(inputMessage),
            })
          );
          break;
        case "saveMessage":
          saveMessage(inputMessage);
          break;
        default:
      }
    });
  });
};

function getMessage(inputMessage) {
  return new Promise((resolve) => {
    // Chat.find({ from: inputMessage.userId });
    return [];
  });
}
function saveMessage(inputMessage) {
  // let message = new Chat({
  //
  // })
}
function refreshMessage(inputMessage) {}
