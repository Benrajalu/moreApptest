'use strict';
/*global Trianglify:false */
/*jshint camelcase: false */
/**
 * @ngdoc function
 * @name exo3App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exo3App
 */
angular.module('collectionApp')
  .controller('DetailCtrl', ['$scope', '$http', '$routeParams', '$window', function ($scope, $http, $routeParams, $window) {
  	var detail = this;
    detail.route = $routeParams.route;
    
    function findElement(arr, propName, propValue) {
      for (var i=0; i < arr.length; i++){
      	if (arr[i][propName] === propValue){
      		return arr[i];
      	}
      }
    }

    $http.get('scripts/data.json').success(function(data){
		detail.list = data;
		detail.current = findElement(detail.list, 'route', detail.route);
	});

	// Splash background
		$scope.height= $window.innerHeight;
		$scope.width= $window.innerWidth;
	    
	    $scope.triangles = function(){
	    	var t = new Trianglify({x_gradient: ['#5dbe8f', '#3aaf76', '#8acfae'], y_gradient: ['#5dbe8f', '#3aaf76', '#8acfae']}),
	    	pattern = t.generate($scope.width, $scope.height); // svg width, height
	    	return (pattern.dataUrl);
	    };

	    $scope.svg = {'background' :  $scope.triangles()};

	    angular.element($window).bind('resize', function() {
		    $scope.$apply(function() {
		        $scope.height= $window.innerHeight;
		        $scope.width= $window.innerWidth;
		        $scope.svg = {'background' :  $scope.triangles()};
		    });
		});
  }]);
