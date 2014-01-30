/**
*/

'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', 'Pusher', function($scope, Pusher) {

	$scope.callbackNotifications = 0;
	$scope.callbackNotification = '';

	$scope.eventNotifications = 0;
	$scope.eventNotification = '';

	Pusher.subscribe('notifications', 'new', function (notification) {
		console.log('callback notification', notification);
		$scope.callbackNotifications++;
		$scope.callbackNotification = notification.message;
	});

	$scope.$on('notifications:new', function (event, notification) {
		console.log('event notification', notification);
		$scope.eventNotifications++;
		$scope.eventNotification = notification.message;
	});

}]);