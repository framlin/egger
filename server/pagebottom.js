var fs = require('fs'),
    content = fs.readFileSync(__dirname + '/../site/partletts/bottom.html', {encoding: 'utf-8'});

module.exports = content;