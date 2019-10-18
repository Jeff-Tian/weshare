var leavesTrimmer = require('../www/js/leavesTrimmer.js');
var assert = require('assert');

describe('Leaves Trimmer', function () {
    it('can prepend text to leaves', function () {
        var tree = {
            a: 'service-proxy/a',
            b: {
                c: 'service-proxy/c',
                d: 'service-proxy/d'
            },
            c: {
                d: {
                    e: 'service-proxy/e'
                }
            },
            d: 'service-proxy/dd'
        };

        var prepended = {
            a: 'http://jiy.coding.io:80/service-proxy/a',
            b: {
                c: 'http://jiy.coding.io:80/service-proxy/c',
                d: 'http://jiy.coding.io:80/service-proxy/d'
            },
            c: {
                d: {
                    e: 'http://jiy.coding.io:80/service-proxy/e'
                }
            },
            d: 'http://jiy.coding.io:80/service-proxy/dd'
        };

        assert.deepStrictEqual(prepended, leavesTrimmer.prepend(tree, 'http://jiy.coding.io:80/'));
    });

    it('should trim leaves', function () {
        var tree = {
            a: 'service-proxy/a',
            b: {
                c: 'service-proxy/c',
                d: 'service-proxy/d'
            },
            c: {
                d: {
                    e: 'service-proxy/e'
                }
            },
            d: 'service-proxy/dd'
        };

        var trimmed = {
            a: 'a',
            b: {
                c: 'c',
                d: 'd'
            },
            c: {
                d: {
                    e: 'e'
                }
            },
            d: 'dd'
        };

        assert.deepStrictEqual(trimmed, leavesTrimmer.trim(tree, 'service-proxy/'));
    });
});