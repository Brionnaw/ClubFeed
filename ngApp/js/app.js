'use strict';
var app;
(function (app) {
    angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'angular-filepicker'])
        .config(function ($stateProvider, $locationProvider, $urlRouterProvider, filepickerProvider) {
        filepickerProvider.setKey('APC947uh2T46mDGrkcws5z');
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
        }).state('Visitor', {
            url: '/visitor/:username',
            templateUrl: '/templates/visitor.html',
            controller: app.Controllers.VisitorController,
            controllerAs: 'vm'
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    });
})(app || (app = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiLElBQVUsR0FBRyxDQWtFWjtBQWxFRCxXQUFVLEdBQUcsRUFBQyxDQUFDO0lBQ2IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3JGLE1BQU0sQ0FBQyxVQUVSLGNBQW9DLEVBQ3BDLGlCQUF1QyxFQUN2QyxrQkFBNEMsRUFDNUMsa0JBQWtCO1FBQ2xCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1FBRW5ELGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzNCLEdBQUcsRUFBRSxPQUFPO1lBQ1osV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjO1lBQzFDLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUM7YUFDRCxLQUFLLENBQUMsYUFBYSxFQUFFO1lBQ3BCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUI7WUFDakQsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQzthQUNELEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDZCxHQUFHLEVBQUUsUUFBUTtZQUNiLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsZUFBZTtZQUMzQyxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUNqQixHQUFHLEVBQUUsV0FBVztZQUNoQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFVBQVUsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQjtZQUM5QyxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDO2FBQ0QsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNoQixHQUFHLEVBQUUsVUFBVTtZQUNmLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCO1lBQzdDLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUM7YUFDRCxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQ3JCLEdBQUcsRUFBRSxlQUFlO1lBQ3BCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsVUFBVSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsY0FBYztZQUMxQyxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDO2FBQ0QsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNsQixHQUFHLEVBQUUsa0JBQWtCO1lBQ3ZCLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsY0FBYztZQUMxQyxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUNuQixHQUFHLEVBQUUsZUFBZTtZQUNwQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFVBQVUsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQjtZQUM3QyxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNuQixHQUFHLEVBQUUsb0JBQW9CO1lBQ3pCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCO1lBQzdDLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQTtRQUVGLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLEVBbEVTLEdBQUcsS0FBSCxHQUFHLFFBa0VaIn0=