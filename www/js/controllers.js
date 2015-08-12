angular.module('starter.controllers', [])

    .controller('AppCtrl', ['Recover', 'Weibo', 'QQ', 'DeviceHelper', function (Recover, Weibo, QQ, DeviceHelper) {
        ionic.Platform.ready(function () {
            if (DeviceHelper.isInBrowser()) {
                eval(Recover.get());
            }
        });
    }])

    .controller('DashCtrl', [function ($scope) {
    }])

    .controller('ChatsCtrl', ['$scope', 'Chats', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    }])

    .controller('ChatDetailCtrl', ['$scope', '$stateParams', 'Chats', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    }])

    .controller('AccountCtrl', ['$scope', 'Weibo', '$timeout', '$interval', 'Poll', 'AppEvents', 'QQ', 'UI', function ($scope, Weibo, $timeout, $interval, Poll, AppEvents, QQ, UI) {
        function resetPushState() {
            window.history.replaceState('account', 'Account', window.location.hash.substr(0, window.location.hash.indexOf('?')));
        }

        $scope.settings = {
            bindWeibo: Weibo.hasBound(),
            bindQQ: QQ.hasBound()
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
                    });
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
                    });
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

        AppEvents.handle(AppEvents.weibo.bound, function () {
            $scope.settings.bindWeibo = true;

            Poll.while(function () {
                return $scope.settings.bindWeibo === true;
            }, function () {
                $scope.settings.bindWeibo = Weibo.hasBound();
            });
        });
    }])

;
