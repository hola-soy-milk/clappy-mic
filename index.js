const path = require("path")
const Server = require("http").Server;
const express = require("express");
const app = express();
const server = new Server(app);
const opn = require('opn');
const robot = require("robotjs");
const os = require('os');

app.use(express.static(path.join(__dirname, "app")));
app.post("/", function (req, res) {
  console.log("👏");
  if (os.platform() === 'win32') {
	  robot.typeString(":clap:");
  }
	else {
	  robot.typeString("👏");
  }
  robot.keyTap('enter')
  res.send("POST request!!!");
});


const port = process.env.PORT || 8080;
const listen = new Promise(resolve => {
  server.listen(port, resolve);
});

listen.then(() => {
  console.log(`http://localhost:${port}`);
  opn(`http://localhost:${port}`);
  process.on("SIGINT", () => {
    server.close();
    process.exit();
  });
});
