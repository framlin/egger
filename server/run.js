var union = require('union');
var flatiron = require('flatiron');
var ecstatic = require('ecstatic');

app = new flatiron.App();
app.use(flatiron.plugins.http);

app.http.before = [
   function (req, res) {
	   //this logs >> info: REQ - hello clientundefined
	   app.log.info("REQ - hello client" + req.socket);
	   res.emit('next');
   },
   ecstatic(__dirname + '/../site')
];

app.start(8081);
