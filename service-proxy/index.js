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
            password: 'Love1050709'
        });

        client.newPost({
            title: 'test',
            content: 'test'
        }, function (err, data) {
            res.send('done');
        });
    })

;
