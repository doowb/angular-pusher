/**
@toc
1. setup - whitelist, appPath, html5Mode
*/

'use strict';

angular.module('myApp', [
'ngRoute', 'ngSanitize', 'ngTouch',		//additional angular modules
'doowb.angular-pusher'
]).
config(['$routeProvider', '$locationProvider', '$compileProvider', 'PusherServiceProvider',
	function($routeProvider, $locationProvider, $compileProvider, PusherServiceProvider) {

		$locationProvider.html5Mode(false);
		
		var staticPath;
		// staticPath ='/';		//nodejs (local)
		staticPath ='/angular-pusher/';		//gh-pages
		var appPathRoute ='/';
		var pagesPath =staticPath+'pages/';
		
		$routeProvider.when(appPathRoute+'home', {templateUrl: pagesPath+'home/home.html'});
		$routeProvider.when(appPathRoute+'items', {templateUrl: pagesPath+'items/items.html'});
		$routeProvider.otherwise({redirectTo: appPathRoute+'home'});

		PusherServiceProvider
			.setToken('d420162e600c57b0e60f')
			.setOptions({});
				
	}
]);