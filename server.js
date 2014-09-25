var http = require("http");
var fs = require('fs');
var querystring = require('querystring');
var header = fs.readFileSync('header');
var footer  = fs.readFileSync('footer')

var answer = function(request, response) {
  console.log(request.method );
  var fullbody = "";

  if ( request.method === "POST"){
      request.on('data', function(chunk) {
        fullbody += chunk.toString();
      });
    
    request.on('end', function() {
      var decodedbody = querystring.parse(fullbody);
      fs.appendFile('scratches.txt', decodedbody.scratch+"\n", function (err) {
  if (err) throw err;
    });
    });

  }
  else if(request.method === "GET"){
    response.writeHead(200, {"Content-Type": "text/html"});
     response.write(header);
     var scratches_array = require('fs').readFileSync('scratches.txt').toString().split('\n')
     for(var i = scratches_array.length - 1; i > scratches_array.length - 20; i--)
       { 
         response.write("<p>" + scratches_array[i] + "</p>");
       }
    response.write(footer);
    response.end();
   }

  
}

var server = http.createServer(answer);

server.listen(8888);
