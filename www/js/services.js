angular.module('starter.services', [])

    .factory('Chats', ['LocalJiy', function (LocalJiy) {
        function refresh(callback) {
            LocalJiy.getAll(function (data) {
                // .unique(false).reverse();
                callback(data);
            });
        }

        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [];

        refresh(function (data) {
            chats = data;
        });

        return {
            refresh: refresh,

            all: function (callback) {
                LocalJiy.getAll(callback);
            },
            remove: function (chat, callback) {
                LocalJiy.remove(chat, callback);
            },
            removeAll: function (callback) {
                LocalJiy.removeAll(callback);
            },
            get: function (chatId, callback) {
                LocalJiy.getByGuid(chatId, callback);
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
            } else {
                return url;
            }
        };

        this.encodeCurrentState = function () {
            return encodeURIComponent(this.extractStateUrl(this.getCurrentUrl()));
        };

        this.base64EncodeCurrentState = function () {
            return window.btoa(this.extractStateUrl(this.getCurrentUrl()));
        };

        this.getCurrentUrlWithoutHash = function () {
            var url = this.getCurrentUrl();
            var indexOfHash = url.indexOf('#');
            if (indexOfHash >= 0) {
                url = url.substr(0, indexOfHash);
            }

            return url;
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

    .factory('getIndexedDBReference', function () {
        return {
            getIndexedDBReference: function () {
                return window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
            }
        };
    })

    .factory('LocalJiyIndexedDB', ['getIndexedDBReference', function (getIndexedDBReference) {
        var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

        var db = {
            version: 1,
            objectStoreName: 'LocalJiy',
            instance: {},

            errorHandler: function (error) {
                window.alert('error: ' + error.target.code);
                console.error(error);
            },

            upgrade: function (e) {
                var _db = e.target.result;
                var names = _db.objectStoreNames;
                var name = db.objectStoreName;

                if (!names.contains(name)) {
                    _db.createObjectStore(name, {keyPath: 'id', autoIncrement: true});
                }
            },

            open: function (callback) {
                var request = getIndexedDBReference.getIndexedDBReference().open(db.objectStoreName, db.version);
                request.onerror = db.errorHandler;
                request.onupgradeneeded = db.upgrade;
                request.onsuccess = function (e) {
                    db.instance = request.result;
                    db.instance.onerror = db.errorHandler;

                    callback();
                };
            },

            getObjectStore: function (mode) {
                var txn, store;

                mode = mode || 'readonly';
                txn = db.instance.transaction([db.objectStoreName], mode);
                store = txn.objectStore(db.objectStoreName);

                return store;
            },

            get: function (id, callback) {
                db.open(function () {
                    var
                        store = db.getObjectStore(),
                        request = store.get(id);

                    request.onsuccess = function (e) {
                        callback(e.target.result);
                    };
                });
            },

            getAll: function (callback) {
                db.open(function () {
                    var
                        store = db.getObjectStore(),
                        cursor = store.openCursor(),
                        data = [];

                    cursor.onsuccess = function (e) {
                        var result = e.target.result;

                        if (result &&
                            result !== null) {

                            data.push(result.value);
                            result.continue();
                        } else {
                            if (typeof callback === 'function') {
                                callback(data);
                            }
                        }
                    };
                });
            },

            save: function (data, callback) {
                db.open(function () {

                    var store, request,
                        mode = 'readwrite';

                    store = db.getObjectStore(mode);

                    request = data.id ?
                        store.put(data) :
                        store.add(data);

                    request.onsuccess = callback;
                });
            },

            'delete': function (id, callback) {
                id = parseInt(id);
                db.open(function () {
                    var
                        mode = 'readwrite',
                        store, request;

                    store = db.getObjectStore(mode);
                    request = store.delete(id);
                    request.onsuccess = callback;
                });
            },

            deleteAll: function (callback) {
                db.open(function () {
                    var mode, store, request;

                    mode = 'readwrite';
                    store = db.getObjectStore(mode);
                    request = store.clear();

                    request.onsuccess = callback;
                });

            }
        };

        return db;
    }])

    .factory('IndexedDBService', ['LocalJiyIndexedDB', function (IndexedDB) {
        return {
            getFromStorage: function (key, callback) {
                return IndexedDB.get(key, callback);
            },

            saveToStorage: function (key, value, callback) {
                if (!value) {
                    return IndexedDB.delete(key, callback);
                }

                return IndexedDB.save({id: key, data: value}, callback);
            }
        };
    }])

    .factory('StorageService', function () {
        return {
            getFromStorage: function (key) {
                return JSON.parse(localStorage.getItem(key));
            },

            saveToStorage: function (key, value) {
                if (!value) {
                    localStorage.removeItem(key);
                    return;
                }

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

                fetch: function (key) {
                    var me = this.get() || {};

                    if (!key) {
                        return me;
                    } else {
                        return me[key] || {};
                    }
                },

                fetchAsArray: function (key) {
                    var me = this.get() || [];

                    if (!key) {
                        return me;
                    } else {
                        return me[key] || [];
                    }
                },

                save: function (key, value) {
                    var me = this.fetch();
                    if (!(value instanceof Array)) {
                        me[key] = angular.extend({}, me[key], value);
                    } else {
                        me[key] = value;
                    }

                    this.set(me);
                },

                delete: function (key) {
                    var me = this.fetch();
                    delete me[key];

                    this.set(me);
                }
            };
        }

        return {
            create: createService
        };
    }])

    .factory('IndexedDBStorageFactoryService', ['IndexedDBService', function (IndexedDBService) {
        function getAs(me, defaultType, key, callback) {
            me.get(function (data) {
                data = data || defaultType;

                if (!key) {
                    callback(data);
                } else {
                    callback(data[key] || defaultType);
                }
            });
        }

        function createService(key) {
            return {
                get: function (callback) {
                    return IndexedDBService.getFromStorage(key, callback);
                },

                set: function (value, callback) {
                    return IndexedDBService.saveToStorage(key, value, callback);
                },

                fetch: function (key, callback) {
                    getAs(this, {}, key, callback);
                },

                fetchAsArray: function (key, callback) {
                    getAs(this, [], key, callback);
                },

                save: function (key, value, callback) {
                    this.fetch(null, function (data) {
                        if (!(value instanceof Array)) {
                            data[key] = angular.extend({}, data[key], value);
                        } else {
                            data[key] = value;
                        }

                        this.set(data, callback);
                    });
                },

                delete: function (key, callback) {
                    this.fetch(null, function (data) {
                        delete data[key];

                        this.set(data, callback);
                    });
                }
            };
        }

        return {
            create: createService
        };
    }])

    .factory('Setting', ['StorageFactoryService', function (StorageFactoryService) {
        return StorageFactoryService.create('jiy_setting');
    }])

    .factory('SavedSocialAccounts', ['StorageFactoryService', function (StorageFactoryService) {
        return StorageFactoryService.create('jiy_saved_social_accounts');
    }])

    .factory('Guid', [function () {
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        return {
            guid: guid
        };
    }])

    .factory('LocalJiy', ['StorageFactoryService', "Guid", 'LocalJiyIndexedDB', function (StorageFactoryService, Guid, LocalJiyIndexedDB) {
        var guid = Guid.guid;
        var jiyList = LocalJiyIndexedDB;

        jiyList.append = function (jiy, callback) {
            if (!jiy.guid) {
                jiy.guid = guid();
            }

            var self = this;
            self.getByGuid(jiy.guid, function (data) {
                if (data) {
                    self.update(jiy, callback);
                } else {
                    jiyList.save({id: jiy.guid, data: jiy}, callback);
                }
            });
        };

        jiyList.remove = function (jiy, callback) {
            jiyList.delete(jiy.guid, callback);
        };

        jiyList.removeAll = function (callback) {
            jiyList.deleteAll(callback);
        };

        jiyList.update = function (jiy, callback) {
            jiyList.get(jiy.guid, function (data) {
                jiyList.save(jiy.guid, data, callback);
            });
        };

        jiyList.getByGuid = function (guid, callback) {
            jiyList.get(guid, callback);
        };

        return jiyList;
    }])

    .factory('Recover', ['StorageFactoryService', function (StorageFactoryService) {
        var recoverStore = StorageFactoryService.create('jiy_recover');

        return {
            save: function (statement) {
                recoverStore.set(statement);
            },

            get: function (deleteAfterGet) {
                var recoverState = recoverStore.get();

                if (deleteAfterGet !== false) {
                    recoverStore.set(null);
                }

                return recoverState;
            },

            recover: function () {
                eval(this.get()); // jshint ignore:line
            }
        };
    }])

    .service('Proxy', ['DeviceHelper', function (DeviceHelper) {
        this.proxyNative = function (url) {
            return '{0}?url={1}'.format('https://proxy-php.herokuapp.com/proxy2.php', encodeURIComponent(url)) + '&mode=native&send_cookies=true';
        };

        var self = this;
        this.proxyNativeIfBrowser = function (url) {
            if (DeviceHelper.isInBrowser()) {
                return self.proxyNative(url);
            }

            return url;
        };
    }])

    .factory('Social', ['Setting', 'Recover', 'UI', 'AppEvents', '$q', 'DeviceHelper', function (Setting, Recover, UI, AppEvents, $q, DeviceHelper) {
        return {
            qq: 'qq',
            weibo: 'weibo',
            wechat: 'wechat',

            create: function (socialMedia) {
                var self = this;

                return {
                    hasBound: function () {
                        return self.hasBound(socialMedia);
                    },

                    unbind: function () {
                        self.unbind(socialMedia);
                    },

                    getAccessToken: function () {
                        var dfd = $q.defer();

                        var access_token = Setting.fetch(socialMedia).access_token;

                        if (access_token && this.hasBound()) {
                            dfd.resolve(access_token);
                        } else {
                            this.bind().then(dfd.resolve, dfd.reject, dfd.notify);
                        }

                        return dfd.promise;
                    },

                    getAuthData: function () {
                        var dfd = $q.defer();

                        var d = Setting.fetch(socialMedia);

                        if (d && this.hasBound()) {
                            dfd.resolve(d);
                        } else {
                            this.bind().then(dfd.resolve, dfd.reject, dfd.notify);
                        }

                        return dfd.promise;
                    }
                };
            },

            unbind: function (socialMedia) {
                Setting.delete(socialMedia);
            },

            hasBound: function (socialMedia) {
                var social = Setting.fetch(socialMedia);

                if (!social || !social.access_token) {
                    return false;
                }

                var now = new Date().getTime() / 1000;

                return parseFloat(social.expires_in) > now;
            },

            authorize: function (authorizeUrl, redirectUrl, successCallback, errorCallback, getInterestInfo) {
                var target = '_self';

                if (DeviceHelper.isIOS() || DeviceHelper.isAndroid()) {
                    target = '_blank';
                }

                var ref = window.open(authorizeUrl, target);

                if (!ref) {
                    errorCallback('弹出窗口被拦截');

                    return;
                }

                var interestInfo;

                ref.addEventListener('loadstart', function (event) {
                    var url = event.url;

                    if (url.startsWith(redirectUrl)) {
                        ref.close();

                        interestInfo = getInterestInfo(url);
                        successCallback(interestInfo);
                    }
                });

                ref.addEventListener('exit', function (event) {
                    if (!interestInfo) {
                        errorCallback('操作已取消');
                    }
                });
            }
        };
    }])

    .service('WechatApp', ['UI', 'DeviceHelper', function (UI, DeviceHelper) {
        var wechatApp = null;
        var defaultMessage = '没有安装 Wechat Cordova 插件';

        function noop(message) {
            UI.toast(message || defaultMessage);
        }

        var isWechatDefined = (typeof Wechat !== 'undefined');

        if (!isWechatDefined) {
            if (DeviceHelper.isWechatBrowser()) {
                wechatApp = {
                    Scene: {
                        SESSION: 0, // 聊天界面
                        TIMELINE: 1, // 朋友圈
                        FAVORITE: 2  // 收藏
                    },

                    Type: {
                        APP: 1,
                        EMOTION: 2,
                        FILE: 3,
                        IMAGE: 4,
                        MUSIC: 5,
                        VIDEO: 6,
                        WEBPAGE: 7,
                        MINI: 8
                    },

                    Mini: {
                        RELEASE: 0, // 正式版
                        TEST: 1, // 测试版
                        PREVIEW: 2  // 体验版
                    },

                    share: function (msg, scene) {
                        alert('sharing...');
                        wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
                            wx.updateTimelineShareData({
                                title: '纟', // 分享标题
                                link: 'https://www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg', // 分享图标
                                success: function () {
                                    // 设置成功
                                    alert('分享成功');
                                }
                            });
                        });
                    },
                };
            } else {
                wechatApp = {
                    isInstalled: function (installed, notInstalled) {
                        notInstalled(defaultMessage);
                    },

                    auth: noop,

                    share: function () {
                        noop('请在微信浏览器中操作或者下载 "叽歪" APP操作');
                    },

                    Type: {},

                    Scene: {}
                };
            }
        } else {
            wechatApp = Wechat;
        }

        ionic.Platform.ready(function () {
            if (typeof Wechat !== 'undefined') {
                for (var key in Wechat) {
                    wechatApp[key] = Wechat[key];
                }
            }
        });

        return wechatApp;
    }])

    .factory('ChatCourier', [function () {
        var c = {
            ChatType: {
                text: 'text',
                image: 'image',
                link: 'link',
                shareLink: 'shareLink'
            },

            mainWordpress: {
                main: true,
                url: 'http://blog.pa-ca.me',
                username: '',
                password: '',
                info: '未连接'
            },

            getChatValidPictures: function (chat) {
                if (!chat.pictures || !(chat.pictures instanceof Array)) {
                    return [];
                }

                return chat.pictures.filter(function (p) {
                    return p.picture;
                });
            },

            getChatType: function (chat) {
                var validPictures = c.getChatValidPictures(chat).length;

                var urlPattern = /^(?:http[s]?):\/\/.+$/gi;

                if (validPictures === 0) {
                    if (!urlPattern.test(chat.text)) {
                        return c.ChatType.text;
                    } else {
                        return c.ChatType.shareLink;
                    }
                } else {
                    if (!chat.text && validPictures === 1) {
                        return c.ChatType.image;
                    }
                }

                return c.ChatType.link;
            },

            getMainWordpressLink: function (chat) {
                if (!chat[c.mainWordpress.url]) {
                    return '';
                }

                return chat[c.mainWordpress.url].link;
            }
        };

        return c;
    }])

    .factory('WechatAccount', ['AppUrlHelper', 'DeviceHelper', 'Recover', 'Proxy', '$http', '$q', 'Setting', 'UI', 'AppEvents', 'Social', 'WechatApp', 'Guid', 'ChatCourier', function (AppUrlHelper, DeviceHelper, Recover, Proxy, $http, $q, Setting, UI, AppEvents, Social, WechatApp, Guid, ChatCourier) {
        var appId = 'wx19e1dfb500a973ab';
        var appSecret = '5884a99c7724917a8f16e17cd681256f';
        var redirectUrl = 'http://uat2.bridgeplus.cn/wechat/logon';

        var nativeRedirectUri = 'http://jiy.coding.io';
        var nativeAppId = 'wx532519f71243a768';
        var nativeAppSecret = '528dade6fff1cd37cbe9d4771a00f009';

        var officialAccountAppId = 'wx252ae943a24222ae';
        var officialAccountKey = '';
        var officialAccountAppSecret = '57b04361b34a6c9d92a1559bd0759465';

        var WechatAccount = Social.create(Social.wechat);

        function sharedSuccess(dfd) {
            return function () {
                var m = '已分享到朋友圈';
                UI.toast(m);

                dfd.resolve(m);
            };
        }

        function sharingFailed(dfd) {
            return function (reason) {
                if (reason === '用户点击取消并返回') {
                    var m = '分享取消';
                    UI.toast(m);
                    dfd.reject(m);
                } else {
                    UI.toast(reason);
                    dfd.reject(reason);
                }
            };
        }

        WechatAccount = angular.extend({}, WechatAccount, {
            tryGetCodeFromWebCallback: function (successCallback, errorCallback, noCodePresentCallback) {
                var hash = window.location.hash;

                var index = hash.indexOf('?');
                if (index >= 0) {
                    var queries = getUrlParams(hash.substr(index + 1));

                    if (queries.code && hash.indexOf('?code') >= 0) {
                        successCallback(queries.code);
                    } else {
                        //errorCallback('得到的 code 为空');
                        noCodePresentCallback();
                    }
                } else {
                    noCodePresentCallback();
                }
            },

            getAccessTokenAndUidVia: function (url) {
                var deferred = $q.defer();

                var method = 'POST';

                if (DeviceHelper.isInBrowser()) {
                    url = Proxy.proxyNative(url);
                }

                $http({
                    method: method,
                    url: url
                })
                    .success(function (data) {
                        if (data.errcode) {
                            console.log('getting wechat access_token fail. data = ');
                            console.log(JSON.stringify(data));
                            deferred.reject(data);
                            return;
                        }

                        console.log('getting wechat access token success. data =');
                        console.log(JSON.stringify(data));

                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        console.log('getting wechat access_token fail. data = ');
                        console.log(JSON.stringify(data));

                        deferred.reject(data);
                    });

                return deferred.promise;
            },

            authorize: function (successCallback, errorCallback) {
                Social.authorize('https://open.weixin.qq.com/connect/qrconnect?appid={0}&scope=snsapi_login&redirect_uri={1}&state={2}'
                    .format(appId, encodeURIComponent(redirectUrl), AppUrlHelper.base64EncodeCurrentState()), redirectUrl, successCallback, errorCallback, function (url) {
                    return getUrlParams(url).code;
                });
            },

            inAppAuthorize: function (success, error) {
                Social.authorize('https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}&response_type=code&scope=snsapi_login&state={2}#wechat_redirect'.format(appId, encodeURIComponent(redirectUrl), AppUrlHelper.encodeCurrentState()), redirectUrl, success, error, function (url) {
                    return getUrlParams(url).code;
                });
            },

            bind: function () {
                var self = this;
                var deferred = $q.defer();

                if (DeviceHelper.isWechatBrowser()) {
                    self.inAppBind().then(deferred.resolve, deferred.reject, deferred.notify);
                } else {
                    WechatApp.isInstalled(function (installed) {
                        if (installed) {
                            self.nativeBind().then(deferred.resolve, deferred.reject, deferred.notify);
                        } else {
                            deferred.reject('没有检测到 微信 应用');
                        }
                    }, function (reason) {
                        self.webBind().then(deferred.resolve, deferred.reject, deferred.notify);
                    });
                }

                return deferred.promise;
            },

            inAppBind: function () {
                function success(code) {
                    self.getAccessTokenAndUidVia('https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&grant_type=authorization_code&redirect_uri={2}&code={3}'.format(appId, appSecret, redirectUrl, code))
                        .then(function (data) {
                            //alert(JSON.stringify(data));
                            data.expires_in = (new Date().getTime() / 1000) + parseFloat(data.expires_in);

                            Setting.save('wechat', data);
                            dfd.resolve(data);
                            AppEvents.trigger(AppEvents.wechat.bound);
                        }, function (reason) {
                            UI.toast('绑定失败');
                            dfd.reject(reason);
                        });
                }

                function error(message) {
                    UI.toast(message);
                    dfd.reject(message);
                }

                var dfd = $q.defer();

                this.tryGetCodeFromWebCallback(success, error, function () {
                    Recover.save('WechatAccount.bind();');

                    self.inAppAuthorize(success, error);

                    dfd.notify('跳转中...');
                });

                return dfd.promise;
            },

            webBind: function () {
                function success(code) {
                    self.getAccessTokenAndUidVia('https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&grant_type=authorization_code&redirect_uri={2}&code={3}'.format(appId, appSecret, redirectUrl, code))
                        .then(function (data) {
                            //alert(JSON.stringify(data));
                            data.expires_in = (new Date().getTime() / 1000) + parseFloat(data.expires_in);

                            Setting.save('wechat', data);
                            deferred.resolve(data);
                            AppEvents.trigger(AppEvents.wechat.bound);
                        }, function (reason) {
                            UI.toast('绑定失败');
                            deferred.reject(reason);
                        });
                }

                function error(message) {
                    UI.toast(message);
                    deferred.reject(message);
                }

                var self = this;
                var deferred = $q.defer();

                this.tryGetCodeFromWebCallback(success, error, function () {
                    Recover.save('WechatAccount.bind();');

                    self.authorize(success, error);

                    deferred.notify('跳转中...');
                });

                return deferred.promise;
            },

            nativeBind: function () {
                var deferred = $q.defer();
                var scope = "snsapi_userinfo";
                var self = this;

                WechatApp.auth(scope, function (response) {
                    alert(JSON.stringify(response));
                    if (response && response.code) {
                        self.getAccessTokenAndUidVia('https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&grant_type=authorization_code&redirect_uri={2}&code={3}'.format(nativeAppId, nativeAppSecret, nativeRedirectUri, response.code))
                            .then(function (data) {
                                //alert(JSON.stringify(data));
                                data.expires_in = (new Date().getTime() / 1000) + parseFloat(data.expires_in);

                                Setting.save(Social.wechat, data);
                                deferred.resolve(data);
                                AppEvents.trigger(AppEvents.wechat.bound);
                            }, function (reason) {
                                UI.toast('绑定失败');
                                deferred.reject(reason);
                            });
                    } else {
                        deferred.reject('获取微信授权代码失败。' + JSON.stringify(response));
                    }
                }, function (reason) {
                    console.error(reason);
                    console.error('微信认证失败');
                    deferred.reject(reason);
                });

                return deferred.promise;
            },

            publishChat: function (chat) {
                var dfd = $q.defer();

                var mainWordpressLink = ChatCourier.getMainWordpressLink(chat);
                var text = chat.text;

                if (mainWordpressLink) {
                    text += '\r\n' + mainWordpressLink;
                }

                var validPictures = ChatCourier.getChatValidPictures(chat);
                var chatType = ChatCourier.getChatType(chat);

                if (chatType === ChatCourier.ChatType.text) {
                    WechatApp.share({
                        text: text,
                        scene: WechatApp.Scene.TIMELINE
                    }, sharedSuccess(dfd), sharingFailed(dfd));
                } else if (chatType === ChatCourier.ChatType.image) {
                    WechatApp.share({
                        message: {
                            title: text,
                            description: text,
                            thumb: 'www/img/ionic.png',
                            mediaTagName: '叽-歪',
                            messageExt: '有事叽歪, 没事叽歪',
                            messageAction: '<action>jiy</action>',
                            media: {
                                type: WechatApp.Type.IMAGE,
                                image: validPictures[0].picture
                            }
                        },
                        scene: WechatApp.Scene.TIMELINE
                    }, sharedSuccess(dfd), sharingFailed(dfd));
                } else if (chatType === ChatCourier.ChatType.shareLink) {
                    var title = '叽歪 - 有事叽歪, 没事叽歪';
                    var desc = '叽歪 - 有事叽歪, 没事叽歪';
                    var thumb = 'www/img/Logo108x108.png';

                    $http.get(chat.text)
                        .success(function (response) {
                            var $html = $(response);
                            title = $html.find('.rich_media_title').text() || response.match(/<title>(.+?)<\/title>/)[1] || title;
                            desc = title;
                            // thumb = $html.find('img.rich_media_thumb').src || thumb;
                        })
                        .finally(function () {

                            WechatApp.share({
                                message: {
                                    title: title,
                                    description: desc,
                                    thumb: thumb,
                                    mediaTagName: '叽-歪',
                                    messageExt: '有事叽歪, 没事叽歪',
                                    messageAction: '<action>jiy</action>',
                                    media: {
                                        type: WechatApp.Type.LINK,
                                        webpageUrl: chat.text
                                    }
                                },
                                scene: WechatApp.Scene.TIMELINE
                            }, sharedSuccess(dfd), sharingFailed(dfd));
                        });

                } else {
                    WechatApp.share({
                        message: {
                            title: text,
                            description: text,
                            thumb: 'www/img/ionic.png',
                            mediaTagName: '叽-歪',
                            messageExt: '有事叽歪, 没事叽歪',
                            messageAction: '<action>jiy</action>',
                            media: {
                                type: WechatApp.Type.LINK,
                                webpageUrl: mainWordpressLink
                            }
                        },
                        scene: WechatApp.Scene.TIMELINE
                    }, sharedSuccess(dfd), sharingFailed(dfd));
                }

                return dfd.promise;
            },

            publish: function (text, pictures) {
                var dfd = $q.defer();

                if (DeviceHelper.isWechatBrowser()) {
                    WechatAccount.execute(function () {
                        wx.onMenuShareTimeline({
                            title: text,
                            link: 'http://blog.pa-ca.me',
                            imgUrl: 'https://avatars0.githubusercontent.com/u/171665?v=3&s=48',
                            success: function () {
                                alert('success');
                                UI.toast('分享成功');
                                // Callback function executed after a user confirms sharing
                            },
                            cancel: function (reason) {
                                alert('失败' + reason);
                                UI.toast('分享失败 ' + reason);
                                // Callback function executed after a user cancels sharing
                            }
                        });
                    });
                } else {
                    WechatApp.share({
                        text: text,
                        message: {
                            title: text,
                            description: text,
                            thumb: '',
                            mediaTagName: "Jiy",
                            messageExt: "叽歪",
                            messageAction: "<action>dotalist</action>",
                            media: {
                                type: WechatApp.Type.LINK,
                                webpageUrl: 'http://blog.pa-ca.me'
                            }
                        },
                        scene: WechatApp.Scene.TIMELINE   // share to Timeline
                    }, sharedSuccess(dfd), sharingFailed(dfd));
                }

                return dfd.promise;
            }
        });

        var wechatPayAccessTokenKey = 'wechatPayAccessToken';
        var wechatPayJsApiTicketKey = 'wechatPayJsApiTicket';

        WechatAccount.getCachedAccessToken = function () {
            var wechatPayAccessToken = Setting.fetch(wechatPayAccessTokenKey);

            if (!wechatPayAccessToken.access_token) {
                return undefined;
            }

            if (hasExpired(wechatPayAccessToken.expires_in)) {
                return undefined;
            }

            return wechatPayAccessToken.access_token;
        };

        function hasExpired(seconds) {
            var now = new Date().getTime() / 1000;

            return now > parseFloat(seconds);
        }

        WechatAccount.getCachedJsApiTicket = function () {
            var wechatPayJsApiTicket = Setting.fetch(wechatPayJsApiTicketKey);

            if (!wechatPayJsApiTicket.ticket) {
                return undefined;
            }

            if (hasExpired(wechatPayJsApiTicket.expires_in)) {
                return undefined;
            }

            return wechatPayJsApiTicket.ticket;
        };

        WechatAccount.getAccessToken = function () {
            var deferred = $q.defer();

            var cachedAccessToken = WechatAccount.getCachedAccessToken();

            if (cachedAccessToken) {
                deferred.resolve(cachedAccessToken);
            } else {
                var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}'.format(officialAccountAppId, officialAccountAppSecret);

                if (DeviceHelper.isInBrowser()) {
                    url = Proxy.proxyNative(url);
                }

                $http({
                    method: 'GET',
                    url: url
                }).success(function (data) {
                    data.expires_in = parseFloat(data.expires_in) + (new Date().getTime() / 1000);

                    Setting.save(wechatPayAccessTokenKey, data);

                    deferred.resolve(data.access_token);
                }).error(function (reason) {
                    deferred.reject(reason);
                });
            }

            return deferred.promise;
        };

        WechatAccount.getJsApiTicket = function () {
            var deferred = $q.defer();

            var cache = WechatAccount.getCachedJsApiTicket();

            if (cache) {
                deferred.resolve(cache);
            } else {
                WechatAccount.getAccessToken()
                    .then(function (token) {
                        return token;
                    }, function (reason) {
                        deferred.reject(reason);
                    }).then(function (token) {
                    var url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={0}&type=jsapi'.format(token);

                    if (DeviceHelper.isInBrowser()) {
                        url = Proxy.proxyNative(url);
                    }

                    $http({
                        method: 'GET',
                        url: url
                    }).success(function (data) {
                        if (data.errcode === 0) {
                            data.expires_in = parseFloat(data.expires_in) + (new Date().getTime() / 1000);
                            Setting.save(wechatPayJsApiTicketKey, data);
                            deferred.resolve(data.ticket);
                        } else {
                            deferred.reject(data.errmsg);
                        }
                    }).error(function (reason) {
                        deferred.reject(reason);
                    });
                }, function (reason) {
                    deferred.reject(reason);
                });
            }

            return deferred.promise;
        };

        WechatAccount.sha1 = function (s) {
            var shaObj = new jsSHA('SHA-1', 'TEXT');
            shaObj.update(s);
            return shaObj.getHash('HEX');
        };

        WechatAccount.sha1Sign = function (config, ticket) {
            var s = 'jsapi_ticket=' + ticket + '&noncestr=' + config.nonceStr + '&timestamp=' + config.timestamp + '&url=' + AppUrlHelper.getCurrentUrlWithoutHash();

            config.signature = WechatAccount.sha1(s);

            return config.signature;
        };

        var configured = false;
        WechatAccount.execute = function (method) {
            if (configured) {
                method();

                return;
            }

            WechatAccount.getJsApiTicket().then(function (ticket) {
                var config = {
                    debug: false,
                    appId: officialAccountAppId,
                    timestamp: Math.floor(new Date().getTime() / 1000),
                    nonceStr: Guid.guid().replace('-', ''),
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                    ]
                };

                WechatAccount.sha1Sign(config, ticket);

                wx.config(config);

                AppEvents.triggerLoading();

                wx.ready(function () {
                    AppEvents.triggerLoadingHide();
                    configured = true;
                    method();
                });

                //if (typeof WeixinJSBridge == 'undefined') {
                //    if (document.addEventListener) {
                //        document.addEventListener('WeixinJSBridgeReady', method, false);
                //    } else if (document.attachEvent) {
                //        document.attachEvent('WeixinJSBridgeReady', method);
                //        document.attachEvent('onWeixinJSBridgeReady', method);
                //    } else {
                //        console.error('不能执行指定方法：' + method);
                //    }
                //} else {
                //    method();
                //}
            }, function (reason) {
                UI.toast('调用微信接口失败：' + reason);
            });
        };

        return WechatAccount;
    }])

    .factory('QQ', ['AppUrlHelper', 'DeviceHelper', 'Recover', 'Proxy', '$http', '$q', 'Setting', 'UI', 'AppEvents', 'Social', function (AppUrlHelper, DeviceHelper, Recover, Proxy, $http, $q, Setting, UI, AppEvents, Social) {
        var appId = '101202914';
        var redirectUri = 'http://www.meiyanruhua.com';

        var qq = Social.create(Social.qq);

        qq = angular.extend({}, qq, {
            bind: function () {
                function success(access_token) {
                    self.getUidHandler(access_token, function (openId) {
                        Setting.save('qq', {openid: openId});

                        deferred.resolve(Setting.fetch('qq'));
                        AppEvents.trigger(AppEvents.qq.bound);
                    }, function () {
                        deferred.reject('没有得到 QQ openid, 绑定 QQ 失败');
                    });
                }

                function error(message) {
                    UI.toast(message);
                    deferred.reject(message);
                }

                var url = 'https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id={0}&redirect_uri={1}&state={2}&scope={3}'
                    .format(appId, encodeURIComponent(redirectUri), AppUrlHelper.encodeCurrentState(), encodeURIComponent('get_user_info,add_t'));
                var self = this;

                var deferred = $q.defer();

                this.webCallbackHandler(success, error, function () {
                    Recover.save('QQ.bind();');

                    Social.authorize(url, redirectUri, success, error, function (url) {
                        var info = getUrlParams(url);
                        info.expires_in = (new Date().getTime() / 1000) + parseFloat(info.expires_in);
                        Setting.save('qq', info);

                        return info.access_token;
                    });

                    deferred.notify('跳转中...');
                });

                return deferred.promise;
            },

            getUidHandler: function (access_token, successCallback, errorCallback) {
                var isHttpRequestSuccess = false;
                var httpResponseData = null;

                // QQ OAuth Open ID response always return callback({...})
                function captureOAuthOpenIdCallback() {
                    var oldCallback = window.callback;

                    window.callback = function (data) {
                        isHttpRequestSuccess = true;
                        httpResponseData = data;

                        window.callback = oldCallback;
                    };
                }

                var url = 'https://graph.qq.com/oauth2.0/me?access_token={0}'.format(access_token);

                if (DeviceHelper.isInBrowser()) {
                    url = Proxy.proxyNative(url);
                }

                // QQ OAuth Open ID response always return callback({...})
                captureOAuthOpenIdCallback();

                $http({
                    method: 'JSONP',
                    url: url
                })
                    .success(function (data) {
                        var openid = data.openid;
                        Setting.save('qq', data);
                        successCallback(openid);
                    })
                    .error(function (data) {
                        if (isHttpRequestSuccess) {
                            var openid = httpResponseData.openid;
                            Setting.save('qq', data);
                            successCallback(openid);
                        } else {
                            errorCallback(data);
                        }
                    });
            },

            webCallbackHandler: function (successCallback, errorCallback, noCodePresentCallback) {
                var hash = window.location.hash;

                var index = hash.indexOf('?');
                if (index >= 0) {
                    var queries = getUrlParams(hash.substr(index + 1));

                    if (queries.access_token && hash.indexOf('?access_token') >= 0) {
                        Setting.save('qq', {
                            access_token: queries.access_token,
                            expires_in: (new Date().getTime() / 1000) + parseFloat(queries.expires_in)
                        });

                        successCallback(queries.access_token);
                    } else {
                        //errorCallback('得到的 access_token 为空');
                        noCodePresentCallback();
                    }
                } else {
                    noCodePresentCallback();
                }
            },

            publish: function (text, pictures) {
                var self = this;

                return this.getAuthData()
                    .then(function (authData) {
                        var url = Proxy.proxyNativeIfBrowser('https://graph.qq.com/t/add_t');

                        var data = {
                            access_token: authData.access_token,
                            format: 'json',
                            content: encodeURIComponent(text),
                            clientip: encodeURIComponent('120.26.216.41'),
                            longitude: '0',
                            latitude: '0',
                            syncflag: 0,
                            compatibleflag: 0,
                            openid: authData.openid,
                            appid: appId,
                            oauth_consumer_key: appId
                        };

                        var res = $http({
                            method: 'POST',
                            url: url,
                            data: urlParams(data),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        });

                        return res;
                    });
            }
        });

        return qq;
    }])

    .factory('Weibo', ['AppUrlHelper', 'DeviceHelper', 'Recover', 'Proxy', '$http', '$q', 'Setting', 'UI', 'AppEvents', 'Social', function (AppUrlHelper, DeviceHelper, Recover, Proxy, $http, $q, Setting, UI, AppEvents, Social) {
        var redirectUrl = 'http://www.meiyanruhua.com';
        var appId = '1882668017';
        var clientSecret = '60611efdfb1af9a8bf51694b9dcbe7b3';

        var weibo = Social.create(Social.weibo);

        weibo = angular.extend({}, weibo, {
            authorize: function (successCallback, errorCallback) {
                return Social.authorize('https://api.weibo.com/oauth2/authorize?client_id={0}&response_type=code&redirect_uri={1}&state={2}'
                    .format(appId, encodeURIComponent(redirectUrl), AppUrlHelper.encodeCurrentState()), redirectUrl, successCallback, errorCallback, function (url) {
                    return getUrlParams(url).code;
                });
            },

            tryGetCodeFromWebCallback: function (successCallback, errorCallback, noCodePresentCallback) {
                var hash = window.location.hash;

                var index = hash.indexOf('?');
                if (index >= 0) {
                    var queries = getUrlParams(hash.substr(index + 1));

                    if (queries.code && hash.indexOf('&code') >= 0) {
                        successCallback(queries.code);
                    } else {
                        //errorCallback('得到的 code 为空');
                        noCodePresentCallback();
                    }
                } else {
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
                function success(code) {
                    self.getAccessTokenAndUidByCode(code)
                        .then(function (data) {
                            //alert(JSON.stringify(data));
                            data.expires_in = (new Date().getTime() / 1000) + parseFloat(data.expires_in);

                            Setting.save('weibo', data);
                            deferred.resolve(data);
                            AppEvents.trigger(AppEvents.weibo.bound);
                        }, function (reason) {
                            UI.toast('绑定失败');
                            deferred.reject(reason);
                        });
                }

                function error(message) {
                    UI.toast(message);
                    deferred.reject(message);
                }

                var self = this;
                var deferred = $q.defer();

                this.tryGetCodeFromWebCallback(success, error, function () {
                    Recover.save('Weibo.bind();');

                    self.authorize(success, error);

                    deferred.notify('跳转中...');
                });

                return deferred.promise;
            },

            unbind: function () {
                var accessToken = Setting.fetch('weibo').access_token;

                if (!accessToken) {
                    return;
                }

                var url = '{0}?access_token={1}'.format('https://api.weibo.com/oauth2/revokeoauth2', accessToken);

                if (DeviceHelper.isInBrowser()) {
                    url = Proxy.proxyNative(url);
                }

                $http({
                    method: 'GET',
                    url: url
                }).success(function () {
                    Setting.delete('weibo');
                });
            },

            getAccessToken: function () {
                var dfd = $q.defer();

                var access_token = Setting.fetch(Social.weibo).access_token;

                if (access_token && this.hasBound()) {
                    dfd.resolve(access_token);
                } else {
                    this.bind().then(dfd.resolve, dfd.reject, dfd.notify);
                }

                return dfd.promise;
            },

            publish: function (text) {
                var self = this;

                return this.getAccessToken()
                    .then(function (access_token) {
                        var url = Proxy.proxyNativeIfBrowser('https://api.weibo.com/2/statuses/upload_url_text.json');

                        var data = {
                            access_token: access_token,
                            status: text,
                            visible: 0,
                            lat: 0,
                            long: 0,
                            rip: '127.0.0.1',
                            url: 'http://zizhujy.com',
                            // important to add 10 spaces for pic_id
                            pic_id: '          '
                        };

                        var res = $http({
                            method: 'POST',
                            url: url,
                            data: urlParams(data),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        });

                        return res;
                    });
            }
        });

        return weibo;
    }])

    .service('UI', ['$http', '$window', '$q', '$ionicLoading', '$timeout', function ($http, $window, $q, $ionicLoading, $timeout) {
        var self = this;

        this.toast = function (msg, duration, position) {
            if (typeof msg === 'object') {
                msg = JSON.stringify(msg);
            }

            if (!duration)
                duration = 'short';
            if (!position)
                position = 'center';

            // PhoneGap? Use native:
            if ($window.plugins) {
                if ($window.plugins.toast)
                    $window.plugins.toast.show(msg, duration, position,
                        function (a) {
                        }, function (err) {
                        });
                return;
            }

            // … fallback / customized $ionicLoading:
            $ionicLoading.show({
                template: '<div class="toast-fallback">' + msg + '</div>',
                noBackdrop: true,
                hideOnStateChange: false,
                duration: (duration == 'short' ? 2000 : 5000)
            });
        };

        this.toastLater = function (msg, duration, position) {
            $timeout(function () {
                self.toast(msg, duration, position);
            }, 500);
        };
    }])

    .service('Poll', ['$timeout', function ($timeout) {
        var defaultInterval = 5000;
        var self = this;

        var next = function (poll, interval) {
            var int = interval || defaultInterval;

            console.log('poll after ' + int);

            $timeout(poll, int);
        };

        this.until = function (endPollCondition, poll, interval) {
            var res = poll();

            if (!endPollCondition()) {
                next(function () {
                    self.until(endPollCondition, poll, interval);
                }, interval);
            }

            return res;
        };

        this.while = function (condition, poll, interval) {
            var res;

            console.log('condition = ' + condition());

            if (condition()) {
                res = poll();

                next(function () {
                    self.while(condition, poll, interval);
                }, interval);

                return res;
            }
        };
    }])

    .factory('AppEvents', ['$rootScope', function ($rootScope) {
        return {
            loading: {
                show: 'loading:show',
                hide: 'loading:hide'
            },

            weibo: {
                bound: 'weibo:bound',
                unbound: 'weibo:unbound'
            },

            wechat: {
                bound: 'wechat:bound',
                unbound: 'wechat:unbound'
            },

            qq: {
                bound: 'qq:bound',
                unbound: 'qq:unbound'
            },

            jiy: {
                saved: 'jiy:saved'
            },

            trigger: function (name) {
                $rootScope.$broadcast(name);
            },

            handle: function (name, callback) {
                return $rootScope.$on(name, callback);
            },

            triggerLoading: function () {
                return this.trigger(this.loading.show);
            },

            triggerLoadingHide: function () {
                return this.trigger(this.loading.hide);
            }
        };
    }])

    .directive('imageSelector', [function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/image-selector.html',
            link: function ($scope, $element, attrs) {
                if (typeof attrs.multiple !== 'undefined') {
                    $($element).find('input[type="file"]').prop('multiple', true);
                }
            }
        };
    }])

    .factory('FileReaderService', ['$q', '$log',
        function ($q, $log) {
            var onLoad = function (reader, deferred, scope) {
                return function () {
                    scope.$apply(function () {
                        deferred.resolve(reader.result);
                    });
                };
            };

            var onError = function (reader, deferred, scope) {
                return function () {
                    scope.$apply(function () {
                        deferred.reject(reader.result);
                    });
                };
            };

            var onProgress = function (reader, scope) {
                return function (event) {
                    scope.$broadcast("fileProgress", {
                        total: event.total,
                        loaded: event.loaded
                    });
                };
            };

            var getReader = function (deferred, scope) {
                var reader = new FileReader();
                reader.onload = onLoad(reader, deferred, scope);
                reader.onerror = onError(reader, deferred, scope);
                reader.onprogress = onProgress(reader, scope);
                return reader;
            };

            var readAsDataURL = function (file, scope) {
                var deferred = $q.defer();

                var reader = getReader(deferred, scope);
                reader.readAsDataURL(file);

                return deferred.promise;
            };

            return {
                readAsDataUrl: readAsDataURL,

                dataUriToBlob: function (dataURI) {
                    // convert base64/URLEncoded data component to raw binary data held in a string
                    var byteString = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                    var ab = new ArrayBuffer(byteString.length);
                    var ia = new Uint8Array(ab);
                    for (var i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }

                    var bb = new Blob([ab], {
                        "type": mimeString
                    });
                    return bb;
                }
            };
        }
    ])
    .value('SocialAccounts', {
        wordpress: 'wordpress'
    })
;
