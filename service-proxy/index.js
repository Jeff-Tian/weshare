module.exports = require('express').Router()
    .use(function (req, res, next) {
        next();
    })
    .get('/wordpress/ping', function (req, res, next) {
        res.send('pong');
    })

    .post('/wordpress/add-post', function (req, res, next) {
        req.files = {};

        req.busboy.on('file', function (fieldName, file, fileName, encoding, mimeType) {
            if (!fileName) {
                return;
            }

            file.fileRead = [];

            console.log('uploading: ', fileName);
            console.log(file);
            file.on('data', function (data) {
                console.log('File [' + fieldName + '] got ' + data.length + ' bytes');
                file.fileRead.push(data);
            });

            file.on('end', function () {
                var finalBuffer = Buffer.concat(this.fileRead);

                req.files[fieldName] = {
                    buffer: finalBuffer,
                    size: finalBuffer.length,
                    filename: fileName,
                    mimetype: mimeType
                };

                console.log('File [' + fieldName + '] Finished');
            });
        });

        req.busboy.on('field', function (key, value, keyTruncated, valueTruncated) {
            console.log(key, '=', value);
            req.body[key] = value;
        });

        req.busboy.on('finish', function () {
            console.log('busboy finish');
            next();
        });

        return req.pipe(req.busboy);
    }, function (req, res, next) {
        var wordpress = require('wordpress');
        var client = wordpress.createClient({
            url: 'http://ec2-54-191-128-78.us-west-2.compute.amazonaws.com/jiy',
            username: 'jiy',
            password: 'JIYjiy@123'
        });

        client.uploadFile({
            name: req.files.bits.filename,
            type: req.files.bits.mimetype,
            bits: req.files.bits.buffer
        }, function (error, file) {
            if (error) {
                res.status(500).send(error);
                return;
            }

            // {"attachment_id":"25","date_created_gmt":"2016-02-22T23:54:18.000Z","parent":0,"link":"http://ec2-54-191-128-78.us-west-2.compute.amazonaws.com/jiy/wp-content/uploads/2016/02/test.png","title":"test.png","caption":"","description":"","metadata":"","type":"image/*","thumbnail":"http://ec2-54-191-128-78.us-west-2.compute.amazonaws.com/jiy/wp-content/uploads/2016/02/test.png","id":"25","file":"test.png","url":"http://ec2-54-191-128-78.us-west-2.compute.amazonaws.com/jiy/wp-content/uploads/2016/02/test.png"}

            var images =
                '<div>' +
                '<a title="' + file.title + '" href="' + file.link + '" target="_blank">' +
                '<img src="' + file.thumbnail + '" alt="' + file.title + '" >' +
                '</a>' +
                '</div>';

            client.newPost({
                title: req.body.title,
                content: req.body.content + images,
                status: req.body.status
            }, function (err, data) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                res.send(data);
            });
        });
    })

;
