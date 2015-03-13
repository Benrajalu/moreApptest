'use strict';

/**
 * @ngdoc function
 * @name exo3App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exo3App
 */
angular.module('collectionApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
