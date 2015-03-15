'use strict';
/*global Trianglify:false */
/*jshint camelcase: false */
/* global $:false */
/**
 * @ngdoc function
 * @name collectionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the collectionApp
 */

// Make a pattern

angular.module('collectionApp').controller('MainCtrl', ['$scope', '$window', '$http', '$routeParams',
	function ($scope, $window, $http, $routeParams) {
	// Splash background
		$scope.width= $window.innerWidth;
		
		var getHeight = function(){

			var winH = $window.innerHeight - 60;

			if(winH > 500){
				$scope.height= $window.innerHeight - 60;
				return($scope.height);
			}
			else{
				$scope.height= 500;
				return($scope.height);
			}
		};
	    
	    $scope.triangles = function(){
	    	var t = new Trianglify({x_gradient: ['#5dbe8f', '#3aaf76', '#8acfae'], y_gradient: ['#5dbe8f', '#3aaf76', '#8acfae']}),
	    	pattern = t.generate($scope.width, getHeight()); // svg width, height
	    	return (pattern.dataUrl);
	    };

	    $scope.svg = {'height' : getHeight(),  'background' :  $scope.triangles()};

	    angular.element($window).bind('resize', function() {
		    $scope.$apply(function() {
		        $scope.height= $window.innerHeight - 60;
		        $scope.width= $window.innerWidth;
		        $scope.svg = {'height' : getHeight(),  'background' :  $scope.triangles()};
		    });
		});

	// Retrive data
		var collection = this;
		collection.items = [];
		$http.get('scripts/data.json').success(function(data){
			collection.items = data;
		});

		collection.listing = [];
		$http.get('scripts/links.json').success(function(data){
			collection.listing = data;
		});

	// Scroll if route params say scroll
		collection.routing = '#' + $routeParams.scrollTo;
		if(collection.routing.length){
			setTimeout(function(){
				$('html,body').animate({
		          scrollTop: $(collection.routing).offset().top
		        }, 600);
			},500);
		}
}])
.directive('collectionTeaser', function(){
	return{
		restrict: 'E',
		templateUrl: 'views/templates/collection-teaser.html'
	};
})
.directive('link', function(){
	return{
		restrict: 'A',
		templateUrl: 'views/templates/link.html'
	};
});



