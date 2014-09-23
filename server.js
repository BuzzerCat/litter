var http = require("http");
var fs = require('fs');
var index = fs.readFileSync('cat.html');

var answer = function(request, response) {
  console.log(request.method );
  if ( request.method === "POST"){
     console.log("postal")
  }
  else if(request.method === "GET"){
    console.log("ghetto");
   }

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(index);
  response.end();
}

var server = http.createServer(answer);

server.listen(8888);
