var http = require('http');

function trata_requisicao(req, res) {
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK\n');

}

http.Server(trata_requisicao).listen(4242);

