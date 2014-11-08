var union = require('union'),
    restify = require('restify'),
    url = require('url'),
    director = require('director'),
    flatiron = require('flatiron'),
    ecstatic = require('ecstatic'),
    webserver = new flatiron.App(),
    client = restify.createClient({
        url: 'http://127.0.0.1:8089'
    }),
    router = new director.http.Router(),//.configure({ async: true }),
    pageTop = require('./pagetop'),
    impressumHTML = require('./impressum'),
    homeHTML = require('./home'),
    pageBottom = require('./pagebottom');

function getServiceRequestHandler(me) {
    return function serviceRequest(err, req ) {
        req.on('result', function(err, res) {
            //assert.ifError(err); // HTTP status code >= 400

            me.res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                me.res.write(chunk);
            });

            res.on('end', function() {
                me.res.end();
            });
        });
    };
}

function gePageRequestHandler(me) {
    return function serviceRequest(err, req ) {
        req.on('result', function(err, res) {
            //assert.ifError(err); // HTTP status code >= 400

            me.res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            me.res.write(pageTop);
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                me.res.write(chunk);
            });

            res.on('end', function() {
                me.res.write(pageBottom);
                me.res.end();
            });
        });
    };
}

function home() {
    this.res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    this.res.write(pageTop);
    this.res.write(homeHTML);
    this.res.write(pageBottom);
    this.res.end();
}

function cv() {
    client.get('/cv/list', gePageRequestHandler(this));
}

router.get('/cv', cv);

router.get('/cv/:cvid', function cv_elem(cvid) {
    client.get('/cv/'+cvid, gePageRequestHandler(this));
});


router.get('/impressum', function impressum() {
    this.res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    this.res.write(pageTop);
    this.res.write(impressumHTML);
    this.res.write(pageBottom);
    this.res.end();
});

router.get('/', home);

//---- LEGACY Routes ----------------------
router.get('/index.html', home);
router.get('/anstellungen.html', cv);
router.get('/ausbildung.html', cv);
router.get('/freelancer.html', cv);
router.get('/mbaaba.html', cv);
//------------------------------------------

function RESTDispatcher(req, res) {
    if (!router.dispatch(req, res)) {
        res.emit('next');
    }
}

webserver.use(flatiron.plugins.http);
webserver.http.before = [
    RESTDispatcher,
    ecstatic(__dirname + '/../site')
];
webserver.start(8081);







