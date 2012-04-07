var union = require('union'),
	url = require('url'),
	flatiron = require('flatiron'),
	ecstatic = require('ecstatic'),
	couchdb = require('nano')('http://localhost:5984'),
	logDB = couchdb.use('egger'); 


app = new flatiron.App();
app.use(flatiron.plugins.http);

function getIP(req) {
	return {
		ip: ( req.headers["X-Forwarded-For"]
		|| req.headers["x-forwarded-for"]
		|| req.connection.remoteAddress )
	};
}

function logRequest(req, res) {
	logDB.insert({
		type: "requestLog",
		date: new Date(),
		ip: getIP(req).ip,
		url: url.parse(req.url).pathname
	}, function(e,b,h){
		if(e) { throw e; }
	});
	res.emit('next');
}


app.http.before = [
    logRequest,
    ecstatic(__dirname + '/../site')
];

app.start(8081);
