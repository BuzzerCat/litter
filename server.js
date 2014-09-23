var http = require("http");
var fs = require('fs');
var querystring = require('querystring');
var header = fs.readFileSync('header');
var footer  = fs.readFileSync('footer')

var answer = function(request, response) {
  console.log(request.method );
  var fullbody = "";

  if ( request.method === "POST"){
     console.log("postal")
      request.on('data', function(chunk) {
        console.log("Received body data:");
        fullbody += chunk.toString();
      });
    
    request.on('end', function() {
      // empty 200 OK response for now
      //response.writeHead(200, "OK", {'Content-Type': 'text/html'});
      //response.end();
      var decodedbody = querystring.parse(fullbody);
      console.log(decodedbody.scratch);
      fs.appendFile('scratches.txt', decodedbody.scratch+"\n", function (err) {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
    });

  }
  else if(request.method === "GET"){
    console.log("ghetto");
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
