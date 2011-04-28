var http = require('http');
var parse_url = require('url').parse;
var users = require('./users');

function handle_request(req, res) {
    
    res.writeHead(200, {'Content-Type': 'text/plain'});

    url = parse_url(req.url, true);

    if (url.pathname == '/signup') {
	users.create(url.query, function(msg) { answer(msg, res); });
    } else if (url.pathname == '/auth') {
	users.authenticate(url.query, function(msg) { answer(msg, res); });
    } else {
	answer('Did Nothing', res);
    }
}

function answer(message, res) {
    res.end(message + '\n');
}

http.Server(handle_request).listen(4242);