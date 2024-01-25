//Create a web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {}; //cache file content

//send 404 error
function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

//send file data
function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

//serve static files
function serveStatic(response, cache, absPath) {
	//check if file is cached in memory
	if (cache[absPath]) {
		//serve file from memory
		sendFile(response, absPath, cache[absPath]);
	} else {
		//check if file exists
		fs.exists(absPath, function(exists) {
			if (exists) {
				//read file from disk
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send404(response);
					} else {
						//cache file in memory
						cache[absPath] = data;
						//serve file from disk
						sendFile(response, absPath, data);
					}
				});
			} else {
				//send 404 error
				send404(response);
			}
		});
	}
}

//create http server
var server = http.createServer(function(request, response) {
	var filePath = false;
	if (request.url == '/') {
		//default html file
		filePath = 'public/index.html';
	} else {
		//translate url path to relative file path
		filePath = 'public' + request.url;
	}
	var absPath = './' + filePath;
	//serve static file
	serveStatic(response, cache, absPath);
});

//listen on port 3000
server.listen(3000, function() {
	console.log("Server listening on port 3000.");
});

//load custom node module
var chatServer = require('./lib/chat_server');
//start socket.io server
chatServer.listen(server);
