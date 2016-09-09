'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap'])
    .config((
    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state('Home', {
      url: '/Home',
      templateUrl: '/templates/home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('Landing-page', {
      url: '/landing-page',
      templateUrl: '/templates/landing-page.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('Login', {
      url: '/',
      templateUrl: '/templates/login.html',
      controller: app.Controllers.LoginController,
      controllerAs: 'vm'
    })
    .state('Register', {
      url: '/Register',
      templateUrl: '/templates/register.html',
      controller: app.Controllers.RegisterController,
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
    })
    .state('editPosts', {
      url: '/editPosts/:info',
      templateUrl: '/templates/editPosts.html',
      controller: app.Controllers.EditController,
      controllerAs: 'vm'
    })


    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
}
