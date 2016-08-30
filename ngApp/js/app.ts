'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap'])
    .config((
    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state('Home', {
      url: '/Home',
      templateUrl: '/templates/Home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('landing-page', {
      url: '/',
      templateUrl: '/templates/landing-page.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/templates/signup.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: '/templates/profile.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('edit-profile', {
      url: '/edit-profile',
      templateUrl: '/templates/edit-profile.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
}
