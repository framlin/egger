var json2html = require('node-json2html'),
    restify = require('restify'),
    cvEducation = require('./../site/data/cv-education'),
    cvEmployment = require('./../site/data/cv-employment'),
    cvFreelancer = require('./../site/data/cv-freelancer'),
    cvEMbaaba = require('./../site/data/cv-mbaaba');

console.log(cvEducation);
console.log(cvEmployment);
console.log(cvFreelancer);
console.log(cvEMbaaba);

var i, size, elem,
    entry = {},
    overview = [];

function createOverviewJobEntry(elem) {
    var entry = {
        'period' : elem.job.time,
        'topic' : elem.job.firma
    };
    return entry;
}

for (i = 0; i < cvFreelancer.length; i += 1) {
    elem = cvFreelancer[i];
    overview.push(createOverviewJobEntry(elem));
}

for (i = 0; i < cvEmployment.length; i += 1) {
    elem = cvEmployment[i];
    overview.push(createOverviewJobEntry(elem));
}

for (i = 0; i < cvEMbaaba.length; i += 1) {
    elem = cvEMbaaba[i];
    overview.push(createOverviewJobEntry(elem));
}

for (i = 0; i < cvEducation.length; i += 1) {
    elem = cvEducation[i];
    entry = {
        'period' : elem.time,
        'topic' : elem.studium
    };
    overview.push(entry);
}
console.log(overview);



function respond(req, res, next) {
    var transform = {'tag':'li','html':'${period}: ${topic}', 'class' : 'summary'},
        resultHTML = "",
        pageHTML;

    //pageHTML = "<html><head></head><body>" + resultHTML + "</body></html>";
    resultHTML = json2html.transform(overview,transform);
    res.header('Content-Type', 'text/html');
    res.end(resultHTML);
    //next();
}

var server = restify.createServer();
server.get('/cv/overview', respond);

server.listen(8082, function() {
    console.log('%s listening at %s', server.name, server.url);
});
