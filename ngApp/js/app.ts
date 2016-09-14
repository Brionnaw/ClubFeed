'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'angular-filepicker'])
    .config((

    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    filepickerProvider) => {
    filepickerProvider.setKey('APC947uh2T46mDGrkcws5z')

    $stateProvider.state('Home', {
      url: '/Home',
      templateUrl: '/templates/home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('LandingPage', {
      url: '/',
      templateUrl: '/templates/landing-page.html',
      controller: app.Controllers.LandingPageController,
      controllerAs: 'vm'
    })
    .state('Login', {
      url: '/login',
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
    .state('Profile', {
      url: '/profile',
      templateUrl: '/templates/profile.html',
      controller: app.Controllers.ProfileController,
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
    }).state('Comments', {
      url: '/comments/:id',
      templateUrl: '/templates/comments.html',
      controller: app.Controllers.CommentController,
      controllerAs: 'vm'
    }) .state('Visitor', {
      url: '/visitor/:username',
      templateUrl: '/templates/visitor.html',
      controller: app.Controllers.VisitorController,
      controllerAs: 'vm'
    })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
}
