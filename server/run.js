var union = require('union');
var flatiron = require('flatiron');
var ecstatic = require('ecstatic');

app = new flatiron.App();
app.use(flatiron.plugins.http);

app.http.before = [
   function (req, res) {
	   app.log.info("REQ - " + new Date() + ' :: ' + req.connection.remoteAddress );
	   res.emit('next');
   },
   ecstatic(__dirname + '/../site')
];

app.start(8081);
