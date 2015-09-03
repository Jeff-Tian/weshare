angular.module('starter.controllers', [])

    .controller('AppCtrl', ['$scope', 'Recover', 'Weibo', 'QQ', 'DeviceHelper', 'WechatAccount', function ($scope, Recover, Weibo, QQ, DeviceHelper, WechatAccount) {
        ionic.Platform.ready(function () {
            if (DeviceHelper.isInBrowser()) {
                eval(Recover.get());
            }
        });

        $scope.showDebugView = false;
        $scope.toggleDebugView = function ($event) {
            if (true) {
                $scope.showDebugView = !$scope.showDebugView;
                $('#debug-view').toggle();
            }
        };

        $scope.clearDebugView = function () {
            $('#debug-view-log, #debug-view-error').text('');
        };
    }])

    .controller('DashCtrl', ['$scope', 'LocalJiy', '$state', 'UI', 'AppEvents', 'FileReaderService', function ($scope, LocalJiy, $state, UI, AppEvents, FileReaderService) {
        function initJiy() {
            $scope.jiy.text = '';
        }

        $scope.jiy = {
            text: '',
            pictures: [{
                index: 0,
                picture: null
            }],
            createdTime: null
        };

        $scope.saveDraft = function () {
            $scope.jiy.createdTime = new Date().toISOString();
            LocalJiy.append($scope.jiy);

            UI.toast('已保存草稿');
            AppEvents.trigger(AppEvents.jiy.saved);

            initJiy();

            $state.go('tab.chats');
        };

        $scope.pictureAdded = function (input) {
            function makeCallback(offset) {
                return function (result) {
                    $scope.jiy.pictures[index + offset].picture = result;
                    $scope.jiy.pictures[index + offset].file = input.files[offset];
                };
            }

            var index = parseInt($(input).attr('index'));

            for (var i = 0; i < input.files.length; i++) {
                $scope.jiy.pictures.push({
                    index: $scope.jiy.pictures.length,
                    picture: null
                });
            }

            for (i = 0; i < input.files.length; i++) {
                FileReaderService.readAsDataUrl(input.files[i], $scope).then(makeCallback(i));
            }

            input.value = '';
        };

        $scope.removePicture = function (picture, index, element) {
            $scope.jiy.pictures.splice(index, 1);

            var space = $scope.jiy.pictures.filter(function (p) {
                return !p.picture;
            });

            if (!space.length) {
                $scope.jiy.pictures.push({
                    index: $scope.jiy.pictures.length,
                    picture: null
                });
            }
        };

        ionic.Platform.ready(function () {
            $('.weibo-area').load('weibo.html');
        });
    }])

    .controller('ChatsCtrl', ['$scope', 'Chats', 'AppEvents', function ($scope, Chats, AppEvents) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function (e) {
        //    $scope.doRefresh();
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };

        $scope.doRefresh = function () {
            Chats.refresh();
            $scope.chats = Chats.all();
        };

        AppEvents.handle(AppEvents.jiy.saved, function () {
            $scope.doRefresh();
        });
    }])

    .controller('ChatDetailCtrl', ['$scope', '$stateParams', 'Chats', 'Weibo', 'UI', 'LocalJiy', 'AppEvents', 'Social', 'QQ', 'WechatAccount', function ($scope, $stateParams, Chats, Weibo, UI, LocalJiy, AppEvents, Social, QQ, WechatAccount) {
        $scope.chat = Chats.get($stateParams.chatId);
        $scope.publish = function (socialMedia, chat) {
            function publishSuccess(response) {
                function getName() {
                    if (socialMedia === 'weibo') {
                        return '微博';
                    }

                    if (socialMedia === 'qq') {
                        return 'QQ';
                    }

                    if (socialMedia === 'wechat') {
                        return '微信'
                    }
                }

                if (socialMedia === 'qq') {
                    if (response.data.ret != 0) {
                        publishFail(response.data);

                        return;
                    }
                }

                chat[socialMedia] = response.data;

                LocalJiy.update(chat);
                UI.toast('成功发布到 ' + getName());
            }

            //{"ret":-1,"msg":"client request's parameters are invalid, invalid openid"}
            function publishFail(reason) {
                if (socialMedia === 'weibo') {
                    if (reason.error_code == 20019 || reason.data.error_code == 20019) {
                        UI.toast('发布重复内容到微博失败 ' + reason.error);
                    } else if (reason.error_code == 21332 || reason.data.error_code == 21332) {
                        Weibo.bind().then(function () {
                            Weibo.publish(chat.text).then(publishSuccess, publishFail);
                        })
                    } else {
                        UI.toast(reason, 'long');
                    }
                } else if (socialMedia === 'qq') {
                    if (reason.ret == 100030) {
                        QQ.bind().then(function () {
                            QQ.publish(chat.text).then(publishSuccess, publishFail);
                        });
                    }

                    UI.toast(reason.msg, 'long');
                } else {
                    UI.toast(reason);
                }
            }

            if (socialMedia === 'weibo') {
                Weibo.publish(chat.text)
                    .then(publishSuccess, publishFail);
            } else if (socialMedia === 'qq') {
                QQ.publish(chat.text)
                    .then(publishSuccess, publishFail);
            } else if (socialMedia === 'wechat') {
                WechatAccount.publish(chat.text)
                    .then(publishSuccess, publishFail);
            } else {
                UI.toast('暂不支持发布到 ' + socialMedia);
            }
        };

        AppEvents.handle(AppEvents.weibo.bound, function () {
            $scope.publish(Social.weibo, $scope.chat);
        });

        AppEvents.handle(AppEvents.qq.bound, function () {
            $scope.publish(Social.qq, $scope.chat);
        });

        AppEvents.handle(AppEvents.wechat.bound, function () {
            $scope.publish(Social.wechat, $scope.chat);
        });
    }])

    .controller('AccountCtrl', ['$scope', 'Weibo', '$timeout', '$interval', 'Poll', 'AppEvents', 'QQ', 'UI', 'WechatAccount', function ($scope, Weibo, $timeout, $interval, Poll, AppEvents, QQ, UI, WechatAccount) {
        function resetPushState() {
            window.history.replaceState('account', 'Account', window.location.hash.substr(0, window.location.hash.indexOf('?')));
        }

        $scope.settings = {
            bindWeibo: Weibo.hasBound(),
            bindQQ: QQ.hasBound(),
            bindWechat: WechatAccount.hasBound()
        };

        Poll.while(function () {
            return $scope.settings.bindWeibo === true;
        }, function () {
            $scope.settings.bindWeibo = Weibo.hasBound();
        });

        Poll.while(function () {
            return $scope.settings.bindQQ === true;
        }, function () {
            $scope.settings.bindQQ = QQ.hasBound();
        });

        Poll.while(function () {
            return $scope.settings.bindWechat === true;
        }, function () {
            $scope.settings.bindWechat = WechatAccount.hasBound();
        });

        function handleNotifyMessage(message) {
            UI.toast(message);
        }

        $scope.toggleWechatBinding = function () {
            if ($scope.settings.bindWechat) {
                WechatAccount.bind()
                    .then(function () {
                        $scope.settings.bindWechat = WechatAccount.hasBound();
                        if ($scope.settings.bindWechat) {
                            UI.toast('微信 绑定成功');
                        } else {
                            UI.toast('微信 绑定没有成功');
                        }
                    }, function () {
                        UI.toast('微信 绑定失败');
                        $scope.settings.bindWechat = false;
                        $timeout(resetPushState);
                    }, handleNotifyMessage);
            }
        };

        $scope.toggleQQBinding = function () {
            if ($scope.settings.bindQQ) {
                QQ.bind()
                    .then(function () {
                        $scope.settings.bindQQ = QQ.hasBound();
                        if ($scope.settings.bindQQ) {
                            UI.toast('QQ 绑定成功');
                        } else {
                            UI.toast('QQ 绑定没有成功');
                        }
                    }, function () {
                        UI.toast('QQ 绑定失败');
                        $scope.settings.bindQQ = false;
                        $timeout(resetPushState);
                    }, handleNotifyMessage);
            }
        };

        $scope.toggleWeiboBinding = function () {
            console.log('bindWeibo = ' + $scope.settings.bindWeibo);
            if ($scope.settings.bindWeibo) {
                Weibo.bind()
                    .then(function () {
                        $scope.settings.bindWeibo = Weibo.hasBound();
                        if ($scope.settings.bindWeibo) {
                            UI.toast('微博 绑定成功');
                        } else {
                            UI.toast('微博 绑定失败');
                        }
                    }, function () {
                        UI.toast('微博 绑定失败');
                        $scope.settings.bindWeibo = false;
                        $timeout(resetPushState);
                    }, handleNotifyMessage);
            }
        };

        $scope.$watch('settings.bindWeibo', function (newValue, oldValue) {
            if (oldValue && !newValue) {
                console.log('change from true to false');
                Weibo.unbind();
            }
        });

        $scope.$watch('settings.bindQQ', function (newValue, oldValue) {
            if (oldValue && !newValue) {
                QQ.unbind();
            }
        });

        $scope.$watch('settings.bindWechat', function (newValue, oldValue) {
            if (oldValue && !newValue) {
                WechatAccount.unbind();
            }
        });

        AppEvents.handle(AppEvents.weibo.bound, function () {
            $scope.settings.bindWeibo = true;

            Poll.while(function () {
                return $scope.settings.bindWeibo === true;
            }, function () {
                $scope.settings.bindWeibo = Weibo.hasBound();
            });
        });

        AppEvents.handle(AppEvents.wechat.bound, function () {
            $scope.settings.bindWechat = true;

            Poll.while(function () {
                return $scope.settings.bindWechat === true;
            }, function () {
                $scope.settings.bindWechat = WechatAccount.hasBound();
            });
        });
    }])

;