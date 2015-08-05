angular.module('starter.controllers', [])

    .controller('AppCtrl', ['Recover', 'Weibo', function (Recover, Weibo) {
        eval(Recover.get());
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

    .controller('AccountCtrl', ['$scope', 'Weibo', '$timeout', '$interval', 'Poll', 'AppEvents', function ($scope, Weibo, $timeout, $interval, Poll, AppEvents) {
        $scope.settings = {
            bindWeibo: Weibo.hasBound()
        };

        Poll.while($scope.settings.bindWeibo === true, function () {
            $scope.settings.bindWeibo = Weibo.hasBound();
        });

        $scope.$watch('settings.bindWeibo', function (newValue, oldValue) {
            if (!oldValue && newValue) {
                Weibo.bind()
                    .then(function () {
                        $scope.settings.bindWeibo = Weibo.hasBound();
                    }, function () {
                        $timeout(function () {
                            $scope.settings.bindWeibo = false;
                        })
                    });
            }

            if (!newValue && oldValue) {
                Weibo.unbind();
            }
        });

        AppEvents.handle(AppEvents.weibo.bound, function () {
            $scope.settings.bindWeibo = true;
            
            Poll.while($scope.settings.bindWeibo === true, function () {
                $scope.settings.bindWeibo = Weibo.hasBound();
            });
        });
    }])

;
