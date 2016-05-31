var express = require('express');
//var PeerServer = require('peer').PeerServer;
var ExpressPeerServer = require('peer').ExpressPeerServer;
var bodyParser = require('body-parser');

var app = express();
    // views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) { res.render('pages/index'); });


// parse application/json
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var server = require('http').createServer(app);
var options= {port: process.env.PORT || 9000,
  key: 'peerjs',allow_discovery: true,secure: true}
app.use('/peerjs', ExpressPeerServer(server, options));

server.listen(process.env.PORT || 9000);