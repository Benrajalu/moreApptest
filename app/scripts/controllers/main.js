'use strict';
/*global Trianglify:false */
/*jshint camelcase: false */
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
		$scope.height= $window.innerHeight - 60;
		$scope.width= $window.innerWidth;
	    
	    $scope.triangles = function(){
	    	var t = new Trianglify({x_gradient: ['#5dbe8f', '#3aaf76', '#8acfae'], y_gradient: ['#5dbe8f', '#3aaf76', '#8acfae']}),
	    	pattern = t.generate($scope.width, $scope.height); // svg width, height
	    	return (pattern.dataUrl);
	    };

	    $scope.svg = {'height' : $scope.height,  'background' :  $scope.triangles()};

	    angular.element($window).bind('resize', function() {
		    $scope.$apply(function() {
		        $scope.height= $window.innerHeight - 60;
		        $scope.width= $window.innerWidth;
		        $scope.svg = {'height' : $scope.height,  'background' :  $scope.triangles()};
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
			},300);
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



