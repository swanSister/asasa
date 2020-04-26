var express = require('express');
var server = express();
var cors = require('cors');

server.use(cors())

server.use('/', express.static(__dirname + '/dist'))

server.get('/privacy', function(request, response){
  response.sendFile(__dirname + '/privacy.html')
})
server.listen(8080,function(){
  console.log("8080 cors ")
})