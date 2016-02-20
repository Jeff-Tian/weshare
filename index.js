var express = require('express');
var app = express();

function getMode() {
    return process.env.NODE_ENV || 'dev';
}

function getStaticFolder() {
    return __dirname + (getMode() === 'dev' ? '/www' : '/dist');
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(getStaticFolder()));

app.use('/service-proxy', require('./service-proxy'));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


