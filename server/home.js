var fs = require('fs'),
    content = fs.readFileSync(__dirname + '/../site/partletts/home.html', {encoding: 'utf-8'});

module.exports = content;