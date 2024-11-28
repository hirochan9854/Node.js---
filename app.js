const fs = require("fs");
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const index = fs.readFileSync("index.html", "utf-8");
const about = fs.readFileSync("about.html", "utf-8");
const style = fs.readFileSync("./style.css", "utf-8");
const takagi = fs.readFileSync("./takagi.png");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(index);
  } else if (pathName === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(about);
  } else if (pathName === "/style.css") {
    res.writeHead(200, { "Content-type": "text/css" });
    res.end(style);
  } else if (pathName === "/takagi.png") {
    res.writeHead(200, { "Content-type": "image/png" });
    res.end(takagi);
  } else {
    res.writeHead(404);
    res.end("Not Found...");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    socket.on("message", (recive) => {
      io.emit("re_message", recive);
    });
  });
});
