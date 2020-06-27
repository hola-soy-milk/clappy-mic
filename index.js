const path = require("path")
const Server = require("http").Server;
const express = require("express");
const app = express();
const server = new Server(app);
var robot = require("robotjs");

app.use(express.static(path.join(__dirname, "app")));
app.post("/", function (req, res) {
  robot.typeString("👏");
  robot.keyTap('enter')
  res.send("POST request!!!");
});


const port = process.env.PORT || 8080;
const listen = new Promise(resolve => {
  server.listen(port, resolve);
});

listen.then(() => {
  console.log(`localhost:${port}`);
  process.on("SIGINT", () => {
    server.close();
    process.exit();
  });
});
