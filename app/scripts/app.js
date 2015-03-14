'use strict';
/* global $:false */
/**
 * @ngdoc overview
 * @name collectionApp
 * @description
 * # collectionApp
 *
 * Main module of the application.
 */
angular
  .module('collectionApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl', 
        controllerAs: 'collection'
      })
      .when('/:route', {
        templateUrl: 'views/about.html',
        controller: 'DetailCtrl',
        controllerAs: 'detail'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


// jQuery fun

$(window).load(function(){
  // why it doesn't work on firefox?
  var card = $('#card');
  if(card.length){
    $(document).on('mousemove',function(e) {  
      var ax = -($(window).innerWidth()/2- e.pageX)/20;
      var ay = ($(window).innerHeight()/2- e.pageY)/10;

      if(ax > 20){
        ax = 20;
      }
      else if(ax < -20){
        ax= -20;
      }

      if(ay > 20){
        ay = 20;
      }
      else if(ay < -20){
        ay = -20;
      }

      card.attr('style', 'transform: rotateY('+ax+'deg) rotateX('+ay+'deg);-webkit-transform: rotateY('+ax+'deg) rotateX('+ay+'deg);-moz-transform: rotateY('+ax+'deg) rotateX('+ay+'deg)');
    });
  }
});