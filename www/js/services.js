angular.module('starter.services', [])

    .factory('Chats', [function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    }])
    .service('AppUrlHelper', [function () {
        this.getCurrentUrl = function () {
            return window.location.href;
        };

        this.extractStateUrl = function (url) {
            var index = url.indexOf('?');

            if (index >= 0) {
                return url.substr(0, index);
            }
            else {
                return url;
            }
        };

        this.encodeCurrentState = function () {
            return encodeURIComponent(this.extractStateUrl(this.getCurrentUrl()));
        };
    }])
    .factory('DeviceHelper', [function () {
        return {
            isIOS: function () {
                if (ionic && ionic.Platform && ionic.Platform.platforms) {
                    return ionic.Platform.isIOS() && ionic.Platform.platforms[0] !== 'browser';
                }

                return false;
            },

            isAndroid: function () {
                if (ionic && ionic.Platform && ionic.Platform.platforms) {
                    return ionic.Platform.isAndroid() && ionic.Platform.platforms[0] !== 'browser';
                }

                return false;
            },

            isWechatBrowser: function () {
                return /MicroMessenger/i.test(this.getUserAgent());
            },

            getUserAgent: function () {
                return navigator.userAgent || navigator.vendor || window.opera;
            },

            getWechatBrowserVersion: function () {
                if (!this.isWechatBrowser()) {
                    return -1;
                }

                var userAgent = this.getUserAgent();
                var version = userAgent.replace(/.+MicroMessenger\/(\d+(?:\.\d+)*)/i, '$1');

                return version;
            },

            isInBrowser: function () {
                return !this.isAndroid() && !this.isIOS();
            },

            isInMobileBrowser: function () {
                var check = false;

                (function (a) {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                        check = true;
                })(navigator.userAgent || navigator.vendor || window.opera);

                return check;
            }
        };
    }])

    .factory('StorageService', function () {
        return {
            getFromStorage: function (key) {
                return JSON.parse(localStorage.getItem(key));
            },

            saveToStorage: function (key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        };
    })

    .factory('StorageFactoryService', ['StorageService', function (StorageService) {
        function createService(key) {
            return {
                get: function () {
                    return StorageService.getFromStorage(key);
                },

                set: function (value) {
                    StorageService.saveToStorage(key, value);
                },

                fetch: function () {
                    return this.get() || {};
                }
            };
        }

        return {
            create: createService
        };
    }])

    .factory('Setting', ['StorageFactoryService', function (StorageFactoryService) {
        var s = StorageFactoryService.create('jiy_setting');

        s.save = function (key, value) {
            var me = s.fetch();
            me[key] = value;

            s.set(me);
        };

        return s;
    }])

    .factory('Recover', ['StorageFactoryService', function (StorageFactoryService) {
        var recoverStore = StorageFactoryService.create('jiy_recover');

        return {
            save: function (statement) {
                recoverStore.set(statement);
            },

            get: function (deleteAfterGet) {
                var recoverState = recoverStore.get();

                if (!(deleteAfterGet === false)) {
                    recoverStore.set(null);
                }

                return recoverState;
            }
        };
    }])

    .service('Proxy', [function () {
        this.proxyNative = function (url) {
            return '{0}?url={1}'.format('http://meiyanruhua.tao3w.com/proxy.php', encodeURIComponent(url)) + '&mode=native&send_cookies=true';
        };
    }])

    .factory('Weibo', ['AppUrlHelper', 'DeviceHelper', 'Recover', 'Proxy', '$http', '$q', 'Setting', function (AppUrlHelper, DeviceHelper, Recover, Proxy, $http, $q, Setting) {
        var redirectUrl = 'http://www.meiyanruhua.com';
        var appId = '1882668017';
        var clientSecret = '60611efdfb1af9a8bf51694b9dcbe7b3';

        return {
            authorize: function (successCallback, errorCallback) {
                var target = '_self';

                if (DeviceHelper.isIOS() || DeviceHelper.isAndroid()) {
                    target = '_blank';
                }

                var ref = window.open('https://api.weibo.com/oauth2/authorize?client_id={0}&response_type=code&redirect_uri={1}&state={2}'
                    .format(appId, encodeURIComponent(redirectUrl), AppUrlHelper.encodeCurrentState()), target);

                if (!ref) {
                    errorCallback('弹出窗口被拦截');

                    return;
                }

                var code;

                ref.addEventListener('loadstart', function (event) {
                    var url = event.url;
                    if (url.startsWith(redirectUrl)) {
                        ref.close();

                        code = getUrlParams(url).code;
                        successCallback(code);
                    }
                });

                ref.addEventListener('exit', function (event) {
                    if (!code) {
                        errorCallback('获取 微博 code 失败!', {
                            userCancel: true
                        });
                    }
                });
            },

            tryGetCodeFromWebCallback: function (successCallback, errorCallback, noCodePresentCallback) {
                var hash = window.location.hash;

                var index = hash.indexOf('?');
                if (index >= 0) {
                    var queries = getUrlParams(hash.substr(index + 1));

                    if (queries.code && hash.indexOf('&code') >= 0) {
                        successCallback(queries.code);
                    }
                    else {
                        errorCallback('得到的 code 为空');
                    }
                }
                else {
                    noCodePresentCallback();
                }
            },

            getAccessTokenAndUidByCode: function (code) {
                var deferred = $q.defer();

                var url = 'https://api.weibo.com/oauth2/access_token?client_id={0}&client_secret={1}&grant_type=authorization_code&redirect_uri={2}&code={3}'.format(appId, clientSecret, redirectUrl, code);
                var method = 'POST';

                if (DeviceHelper.isInBrowser()) {
                    url = Proxy.proxyNative(url);
                }

                $http({
                    method: method,
                    url: url
                })
                    .success(function (data) {
                        if (data.error) {
                            console.log('getting weibo access_token fail. data = ');
                            console.log(JSON.stringify(data));
                            deferred.reject(data);
                            return;
                        }

                        console.log('getting weibo access token success. data =');
                        console.log(JSON.stringify(data));

                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        console.log('getting weibo access_token fail. data = ');
                        console.log(JSON.stringify(data));

                        deferred.reject(data);
                    });

                return deferred.promise;
            },

            bind: function () {
                var self = this;
                var deferred = $q.defer();

                this.tryGetCodeFromWebCallback(function (code) {
                    self.getAccessTokenAndUidByCode(code)
                        .then(function (data) {
                            alert(JSON.stringify(data));
                            Setting.save('weibo', data);
                            deferred.resolve(data);
                        }, function (reason) {
                            alert('绑定失败');
                            deferred.reject(reason);
                        });
                }, function (message) {
                    alert(message);
                    deferred.reject(message);
                }, function () {
                    Recover.save('Weibo.bind();');
                    self.authorize();
                    deferred.reject('跳转中');
                });

                return deferred.promise;
            },

            hasBound: function () {
                var weibo = Setting.fetch().weibo;

                if (!weibo || !weibo.access_token) {
                    return false;
                }

                var now = new Date().getTime / 1000;

                if (parseFloat(weibo.expires_in) < now) {
                    return false;
                }

                return true;
            }
        };
    }]);