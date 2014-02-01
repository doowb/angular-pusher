
'use strict';

angular.module('myApp').controller('ItemListController', ['$scope', '$http', 'Pusher', function($scope, $http, Pusher) {

	$scope.items = [];
  $scope.activities = [];

	Pusher.subscribe('items', 'updated', function (item) {
		console.log('item changed', item);
		for (var i = 0; i < $scope.items.length; i++) {
			if ($scope.items[i].id === item.id) {
				$scope.items[i] = item;
				break;
			}
		}
	});

  Pusher.subscribe('activities', 'new', function (activity) {
    console.log('new activity', activity);
    $scope.activities.unshift(activity);
  });

  var retrieveItems = function () {
    // get a list of items from the api located at '/api/items'
    console.log('getting items');
    $http.get('/api/items')
    	.success(function (items) {
	      $scope.items = items;
      });
  };

  $scope.updateItem = function (item) {
  	console.log('updating item');
    $http.post('/api/items', item);
  };

  // load the items
  retrieveItems();


}]);