var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var express = require('express');
var app = express();

app.use(express.static('www'));

app.get('/', function (req, res) {
    res.send('Hello Word');
});
app.listen(port, host, () => console.log(`WeShare app listening on port ${port}!`));