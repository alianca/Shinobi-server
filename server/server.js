var http = require('http');
var parse_url = require('url').parse;
var users = require('./controllers/users');

var actions = {
    '/signup' : users.create,
    '/auth' : users.authenticate
}

function handle_request(req, res) {
    url = parse_url(req.url, true);
    if (actions[url.pathname]) {
        actions[url.pathname](url.query, function(code, message) { 
            res.writeHead(code, {'Content-Type': 'text/plain'});
            res.end(message + '\n');
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Did Nothing\n');
    }
}

http.Server(handle_request).listen(4242);
