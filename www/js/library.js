(function (exports) {
    if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (str) {
            return this.indexOf(str) === 0;
        };
    }

    if (typeof String.prototype.startsWithOneOf !== 'function') {
        Object.defineProperty(String.prototype, 'startsWithOneOf', {
            enumerable: false,
            value: function (dic) {
                for (var key in dic) {
                    if (this.indexOf(dic[key]) === 0) {
                        return true;
                    }
                }

                return false;
            }
        });
    }

    if (typeof String.prototype.endsWith !== 'function') {
        Object.defineProperty(String.prototype, 'endsWith', {
            enumerable: false,
            value: function (str) {
                return this.substr(this.length - str.length, str.length) === str;
            }
        });
    }

    if (typeof String.prototype.format !== 'function') {
        String.prototype.format = function () {
            if (arguments.length <= 0) {
                return this;
            } else {
                var format = this;
                var args = arguments;

                var s = format.replace(/(?:[^{]|^|\b|)(?:{{)*(?:{(\d+)}){1}(?:}})*(?=[^}]|$|\b)/g, function (match, number) {
                    number = parseInt(number);

                    return typeof args[number] != "undefined" ? match.replace(/{\d+}/g, args[number]) : match;
                });

                return s.replace(/{{/g, "{").replace(/}}/g, "}");
            }
        };
    }

    if (typeof String.prototype.trimSplit !== 'function') {
        String.prototype.trimSplit = function () {
            var res = String.prototype.split.apply(this, Array.prototype.slice.call(arguments));

            return res.filter(function (i) {
                return i;
            });
        };
    }
})(this);

(function (exports) {

    function serialize(o) {
        var a = [];

        for (var i in o) {
            a.push('"' + i + '":' + o[i]);
        }

        return '{' + a.join(',') + '}';
    }

    function getUrlParams(url) {
        var queryString = url.substr(url.indexOf('?') + 1);

        if (queryString.startsWith('#')) {
            queryString = queryString.substr(1);
        }

        return deserializeUrlParams(queryString);


        //
        // let object refer to value
        // Usage: object = zizhujy.com.set(object, value);
        //
        function set(object, value) {
            if (object == null) { // jshint ignore : line
                object = value;
            } else {
                if (object instanceof Array) {
                    object.push(value);
                } else {
                    var o = object;
                    object = [];
                    object.push(o);
                    object.push(value);
                }
            }

            return object;
        }

        //
        // Usage: deserializeUrlParams("a=2&b=3") --> {a:2, b:3}
        //          deserializeUrlParams("a=2&a=3&a=4") --> {a: [2, 3, 4]}
        //          deserializeUrlParams() <==> deserializeUrlParams(window.location.search.substring(1))
        //
        function deserializeUrlParams(queryString) {
            var urlParams = null;
            var expression;
            // Regex for replacing addition symbol with a space
            var a = /\+/g;
            var reg = /([^&=]+)=?([^&]*)/g;
            var d = function (s) {
                return decodeURIComponent(s.replace(a, " "));
            };

            var q = "";
            if (arguments.length > 0) q = arguments[0];
            else q = window.location.search.substring(1);

            while ((expression = reg.exec(q))) {
                if (urlParams == null) urlParams = {}; // jshint ignore: line
                urlParams[d(expression[1])] = set(urlParams[d(expression[1])], d(expression[2]));
            }

            return urlParams;
        }
    }

    exports.serialize = serialize;
    exports.getUrlParams = getUrlParams;
})(this);

(function (exports) {
    var valueEquals = function (self, other) {
        return serialize(self) === serialize(other);
    };

    Object.defineProperty(Array.prototype, 'indexOfByValue', {
        enumerable: false,
        value: function (element) {
            var index = this.indexOf(element);

            if (index >= 0) {
                return index;
            }

            for (var i = 0; i < this.length; i++) {
                if (valueEquals(this[i], element)) {
                    return i;
                }
            }

            return -1;
        }
    });

    if (!Array.prototype.indexOf) {
        // IE 8 and below don't support array.indexOf(item, start), so we implement it
        Array.prototype.indexOf = function (item, start) {
            var index = -1;

            start = +start || 0;

            if (Math.abs(start) === Infinity) {
                start = 0;
            }

            if (start < 0) {
                start += this.length;
                if (start < 0) {
                    start = 0;
                }
            }

            for (var i = start; i < this.length; i++) {
                if (this[i] === item) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    var indexOf = Array.prototype.indexOf;
    Object.defineProperty(Array.prototype, 'indexOf', {
        enumerable: false,
        value: function (item, start, equalityComparer) {
            if (typeof start === "function") {
                equalityComparer = start;
                start = 0;
            } else if (typeof equalityComparer !== "function") {
                return indexOf.call(this, item, start);
            }

            var index = -1;

            start = +start || 0;

            if (Math.abs(start) === Infinity) {
                start = 0;
            }

            if (start < 0) {
                start += this.length;
                if (start < 0) {
                    start = 0;
                }
            }

            for (var i = start; i < this.length; i++) {
                if (equalityComparer(this[i], item)) {
                    index = i;
                    break;
                }
            }

            return index;
        }
    });

    if (!Array.prototype.unique) {
        var areEqual = function areEqual(o1, o2, byRef, ignoreFields) {
            ignoreFields = ignoreFields || [];

            if (typeof  ignoreFields === 'string') {
                ignoreFields = [ignoreFields];
            }

            if (byRef === true || o1 === null || o2 === null || typeof o1 === 'undefined' || typeof o2 === 'undefined') {
                return o2 === o1;
            }

            if (typeof o1 === 'object') {
                if (typeof o2 === 'object') {
                    for (var key in o1) {
                        if (ignoreFields.indexOf(key) >= 0) {
                            continue;
                        }

                        if (!areEqual(o2[key], o1[key], byRef, ignoreFields)) {
                            return false;
                        }
                    }

                    for (key in o2) {
                        if (ignoreFields.indexOf(key) >= 0) {
                            continue;
                        }

                        if (!areEqual(o1[key], o2[key], byRef, ignoreFields)) {
                            return false;
                        }
                    }

                    return true;
                } else {
                    return false;
                }
            }

            if (o1 instanceof Array) {
                if (o2 instanceof  Array) {
                    if (o1.length === o2.length) {
                        for (var i = 0; i < o1.length; i++) {
                            if (areEqual(o1[i], o2[i], false)) {
                                return false;
                            }
                        }

                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            return o1 === o2;
        };

        Object.defineProperty(Array.prototype, 'unique', {
            enumerable: false,
            value: function (byRef, ignoreFields) {
                ignoreFields = ignoreFields || [];
                if (typeof  ignoreFields === 'string') {
                    ignoreFields = [ignoreFields];
                }

                var a = [];
                var l = this.length;
                for (var i = 0; i < l; i++) {
                    for (var j = i + 1; j < l; j++) {
                        // If this[i] is found later in the array
                        //if(strict === true){
                        if (areEqual(this[i], this[j], byRef, ignoreFields))
                            j = ++i;
                    }

                    a.push(this[i]);
                }

                for (var k = 0; k < a.length; k++) {
                    for (var theIndex = 0; theIndex < ignoreFields.length; theIndex++) {
                        if (typeof a[k] === 'object' && a[k] !== null) {
                            delete a[k][ignoreFields[theIndex]];
                        }
                    }
                }

                return a;
            }
        });

        Object.defineProperty(Array.prototype, 'upsert', {
            enumerable: false,
            value: function (a, equalityComparer) {
                var res = this;

                for (var i = 0; i < a.length; i++) {
                    var update = false;

                    for (var j = 0; j < this.length; j++) {
                        if (equalityComparer(this[j], a[i])) {
                            this[j] = a[i];
                            update = true;
                        }
                    }

                    if (!update) {
                        res.push(a[i]);
                    }
                }

                return res;
            }
        });
    }

    if (!Array.prototype.firstOrDefault) {
        Object.defineProperty(Array.prototype, 'firstOrDefault', {
            enumerable: false,
            value: function (equalityComparer, defaultValue) {
                if (typeof equalityComparer !== 'function') {
                    var val = equalityComparer;

                    equalityComparer = function (x) {
                        return x == val;
                    };
                }

                for (var i = 0; i < this.length; i++) {
                    if (equalityComparer(this[i])) {
                        return this[i];
                    }
                }

                return defaultValue || null;
            }
        });
    }

    exports.valueEquals = valueEquals;
})(this);