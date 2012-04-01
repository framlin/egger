var union = require('union');
var flatiron = require('flatiron');
var ecstatic = require('ecstatic');

app = new flatiron.App();
app.use(flatiron.plugins.http);

app.http.before = [
  ecstatic(__dirname + '/../site')
];

app.start(8081);

