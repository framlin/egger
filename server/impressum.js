var fs = require('fs'),
    content = fs.readFileSync(__dirname + '/../site/partletts/impressum.html', {encoding: 'utf-8'});

module.exports = content;