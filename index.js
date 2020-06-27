const path = require("path")
const Server = require("http").Server;
const express = require("express");
const app = express();
const server = new Server(app);

app.use(express.static(path.join(__dirname, "app")));
app.post("/", function (req, res) {
  console.log("CLAP");// req data
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
