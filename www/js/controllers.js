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
 
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) { 
			 
			//$cordovaToast.show('Codigo Leido', 'short', 'center'); 
			
			var posOptions = {timeout: 10000, enableHighAccuracy: true};
			
			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function (position) {
					
					var lat  = position.coords.latitude;
					var lon = position.coords.longitude;
					
					//$cordovaToast.show(lat + ", " + lon, 'short', 'center');
					
					var myLatlng = new google.maps.LatLng(lat, lon);

					var mapOptions = {
						center: myLatlng,
						zoom: 16,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map(document.getElementById("map"), mapOptions);
					$scope.map = map;
				
					$ionicLoading.show({
					  content: 'Getting current location...',
					  showBackdrop: false
					});
					
					$scope.map.setCenter(new google.maps.LatLng(lat, lon));
					var marker = new google.maps.Marker({
						position: myLatlng,
						map: map,
						title: barcodeData.text
					});

					//Marker + infowindow + angularjs compiled ng-click
					var contentString = "<div>"+barcodeData.text+"</div>";

					var infowindow = new google.maps.InfoWindow({
						content: contentString
					});
					
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map, marker);
					});
					
					$ionicLoading.hide()	
									  
				}, function(err) {
					//$cordovaToast.show('errorr', 'long', 'center');
				});
	 		
       }, function(error) {
			console.log("no pude escanear", error);
      });  
});
