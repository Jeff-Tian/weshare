angular.module('starter.controllers', [])

    .controller('AppCtrl', ['Recover', 'Weibo', 'QQ', 'DeviceHelper', 'WechatAccount', function (Recover, Weibo, QQ, DeviceHelper, WechatAccount) {
        ionic.Platform.ready(function () {
            if (DeviceHelper.isInBrowser()) {
                eval(Recover.get());
            }
        });
    }])

    .controller('DashCtrl', ['$scope', 'LocalJiy', '$state', 'UI', 'AppEvents', function ($scope, LocalJiy, $state, UI, AppEvents) {
        function initJiy() {
            $scope.jiy.text = '';
        }

        $scope.jiy = {
            text: '',
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

    .controller('ChatDetailCtrl', ['$scope', '$stateParams', 'Chats', 'Weibo', 'UI', 'LocalJiy', 'AppEvents', 'Social', function ($scope, $stateParams, Chats, Weibo, UI, LocalJiy, AppEvents, Social) {
        $scope.chat = Chats.get($stateParams.chatId);
        $scope.publish = function (socialMedia, chat) {
            Weibo.publish(chat.text)
                .then(function (response) {
                    chat.weibo = {
                        publishTime: new Date().toISOString()
                    };

                    LocalJiy.update(chat);

                    UI.toast('成功发布到微博');
                }, function (reason) {
                    if (reason.error_code == 20019) {
                        UI.toast('发布重复内容到微博失败 ' + reason.error);
                    } else {
                        UI.toast(reason);
                    }
                });
        };

        AppEvents.handle(AppEvents.weibo.bound, function () {
            $scope.publish(Social.weibo, $scope.chat);
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
