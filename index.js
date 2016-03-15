var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');

function getMode() {
    return process.env.NODE_ENV || 'dev';
}

function getStaticFolder() {
    return __dirname + (getMode() === 'dev' ? '/www' : '/dist');
}

var config = require('./www/js/config.js');

app.set('port', (process.env.PORT || config.port.replace(':', '')));

app.all('*', function (req, res, next) {
    if (req.query.code && req.query.state) {
        // Redirected from Wechat?
        return res.redirect(new Buffer(req.query.state, 'base64').toString());
    }

    next();
});

app.use(express.static(getStaticFolder()))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(busboy())
;

app.use('/service-proxy', require('./service-proxy'));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


