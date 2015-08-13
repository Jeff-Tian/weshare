var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var http = require('express');
var app = http.createServer();

app.use(http.static('www'));

app.get('/', function (req, res) {
    res.send('Hello Word');
});
app.listen(port, host);