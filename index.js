var http = require('http');

http.createServer(function (req, res)
{
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello les P3A2 Dimitri!');
}).listen(8080);
