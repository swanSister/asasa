var express = require('express');
var server = express();
var bodyParser = require('body-parser')
server.use(bodyParser.json());
var cors = require('cors');
const request = require('request');
const iconv = require('iconv-lite');
const charset = require('charset') //해당 사이트의 charset값을 알 수 있게 해준다.
const ADDRESS_URL = "https://www.juso.go.kr/addrlink/addrMobileLinkUrl.do"

server.use(cors())


server.use('/', express.static(__dirname + '/dist'))

// server.get('/privacy', function(request, response){
//   response.sendFile(__dirname + '/privacy.html')
// })
server.post('/address', function(req, res){
  console.log("params",req.body)
  request.post({
    url:ADDRESS_URL,
    body: req.body,
    json: true,
    encoding:null,
    }, function (error, response, body) {
      const enc = charset(response.headers, body) // 해당 사이트의 charset값을 획득
			const html = iconv.decode(body, enc) // 획득한 charset값으로 body를 디코딩
      console.log(html)
      res.send(html);
  }, function(){
      res.send('fail');
  })
})
server.listen(3001,function(){
  console.log("3001 cors ")
})