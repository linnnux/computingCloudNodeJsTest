const http = require('http');
const app = require('./app');



/*

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port)

const errorHandler = error => {
    if(error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' require elevated privileges. ');
            process.exit();
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use. ');
            process.exit();
            break;
        default:
            throw error;
    }
};
*/
/*
http.createServer(function (req, res)
{
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello les P3A2 !  Dimitri ! we are the 1st february, are you ok Dimitri?');
}).listen(8080);

*/
const server = http.createServer(app);
/*
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('listening on ' + bind)
});
*/
server.listen(8080);
