var http = require("http");
var fs = require('fs');
var index = fs.readFileSync('cat.html');

var answer = function(request, response) {
  console.log(request.method );
   var fullbody = "";

  if ( request.method === "POST"){
     console.log("postal")

      request.on('data', function(chunk) {
         console.log("Received body data:");
         fullbody += chunk.toString()
         console.log(fullbody);
         
      });
    
    request.on('end', function() {
      // empty 200 OK response for now
      response.writeHead(200, "OK", {'Content-Type': 'text/html'});
      response.end();
    });

  }
  else if(request.method === "GET"){
    console.log("ghetto");
    response.writeHead(200, {"Content-Type": "tex/html"});
    response.write(index);
    response.end();
   }

  
}

var server = http.createServer(answer);

server.listen(8888);
