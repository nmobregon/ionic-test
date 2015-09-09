angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
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
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ScannerCtrl', function($scope, $cordovaBarcodeScanner, $cordovaGeolocation, $cordovaToast, $ionicLoading) {
 
     // $cordovaBarcodeScanner
       // .scan()
       // .then(function(barcodeData) { 
					
			var posOptions = {timeout: 10000, enableHighAccuracy: true};
			
			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function (position) {
					
					var lat  = position.coords.latitude;
					var lon = position.coords.longitude;
					
					$scope.map = { center: { latitude: lat, longitude: lon }, zoom: 12 };
					$scope.marker = {idKey: 1, coords:{ latitude: lat, longitude: lon }};
									  
				}, function(err) {
					$cordovaToast.show('errorr', 'long', 'center');
				});
	 		
       // }, function(error) {
			// console.log("no pude escanear", error);
      // });  
});
