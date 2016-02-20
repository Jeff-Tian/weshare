module.exports = require('express').Router()
    .use(function (req, res, next) {
        next();
    })
    .get('/wordpress/ping', function (req, res, next) {
        res.send('pong');
    })
    .post('/wordpress/add-post', function (req, res, next) {
        var wordpress = require('wordpress');
        var client = wordpress.createClient({
            url: 'http://ec2-54-191-128-78.us-west-2.compute.amazonaws.com/jiy',
            username: 'jiy',
            password: 'JIYjiy@123'
        });

        client.newPost({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status
        }, function (err, data) {
            if (err) {
                res.status(500).send(err);
            }

            res.send(data);
        });
    })

;
