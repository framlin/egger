var union = require('union');
var flatiron = require('flatiron');
var ecstatic = require('ecstatic');

app = new flatiron.App();
app.use(flatiron.plugins.http);

function getIP(req) {
	return {
		ip: ( req.headers["X-Forwarded-For"]
		|| req.headers["x-forwarded-for"]
		|| req.connection.remoteAddress )
	};
};


app.http.before = [
   function (req, res) {
	   app.log.info("REQ - " + new Date() + ' :: ' + getIP(req).ip );
	   res.emit('next');
   },
   ecstatic(__dirname + '/../site')
];

app.start(8081);
