var http = require("http");
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');

var header = fs.readFileSync('header');
var footer  = fs.readFileSync('footer')

var answer = function(request, response) {
  console.log(request.method );
  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");
  
  if (pathname === '/'){
    if ( request.method === "POST"){
        var fullbody = "";
        request.on('data', function(chunk) {
          fullbody += chunk.toString();
        });
    
      request.on('end', function() {
        var decodedbody = querystring.parse(fullbody);
        console.log(decodedbody.scratch);
        fs.appendFile('scratches.txt', decodedbody.scratch+"\n", function (err) {
         if (err) throw err;
        });
      });

    }
    else if(request.method === "GET"){
      response.writeHead(200, {"Content-Type": "text/html"});
       response.write(fs.readFileSync("header"));
       var scratches_array = fs.readFileSync('scratches.txt').toString().split('\n').reverse()
       for(var i = 0; i<20; i++)
         { 
           response.write("<p>" + scratches_array[i] + "</p>");
         }
      response.write(fs.readFileSync("footer"));
      response.end();
     }
   }
   else if ( pathname === "/login"){
    if(request.method === "GET"){
     var login =fs.readFileSync("login");
     response.writeHead(200, {"Content-Type": "text/html"});
     response.write(login);
     response.end();
    }
    else if ( request.method === "POST"){
       console.log("form submitted.");
    }
   }

  
}

var server = http.createServer(answer);

server.listen(8888);
