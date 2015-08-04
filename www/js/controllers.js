angular.module('starter.controllers', [])

.controller('AppCtrl', ['Recover', 'Weibo', function(Recover, Weibo) {
  eval(Recover.get());
}])

.controller('DashCtrl', [function($scope) {}])

.controller('ChatsCtrl', ['$scope', 'Chats', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
}])

.controller('ChatDetailCtrl', ['$scope', '$stateParams', 'Chats', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}])

.controller('AccountCtrl', ['$scope', 'Weibo', function($scope, Weibo) {
  $scope.settings = {
    bindWeibo: false
  };

  $scope.bindWeibo = function() {
    Weibo.authorize(function(code) {
      alert(code);
    }, function(message, reason) {
      alert(message);
    });
  };

  $scope.$watch('settings.bindWeibo', function(newValue, oldValue) {
    if (!oldValue && newValue) {
      Weibo.bind();
    }
  });
}]);
