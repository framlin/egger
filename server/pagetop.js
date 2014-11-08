var fs = require('fs'),
    content = fs.readFileSync(__dirname + '/../site/partletts/top.html', {encoding: 'utf-8'});

module.exports = content;