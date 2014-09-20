var http = require("http");

var answer = function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1> You're a kitty</h1>");
  response.end();
}

var server = http.createServer(answer);

server.listen(8888);
