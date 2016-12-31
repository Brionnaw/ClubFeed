var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($uibModal, userService, feedService, filepickerService, $scope, $stateParams, $state) {
                this.$uibModal = $uibModal;
                this.userService = userService;
                this.feedService = feedService;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.$stateParams = $stateParams;
                this.$state = $state;
                var token = window.localStorage["token"];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                var userInfo = this.userService.getUserInfo(payload.username);
                this.bioInfo = userInfo;
                console.log(this.bioInfo);
                this.posts = this.feedService.getAllPosts();
                if (token) {
                    console.log('logged in');
                }
                else {
                    this.$state.go('Login');
                }
            }
            HomeController.prototype.logout = function () {
                window.localStorage.removeItem('token');
                this.$state.go("Login");
            };
            HomeController.prototype.showModal = function (createPost) {
                this.$uibModal.open({
                    templateUrl: '/templates/createPost.html',
                    controller: 'ModalController',
                    controllerAs: 'vm',
                    resolve: {
                        createPost: function () { return createPost; }
                    },
                    size: 'md'
                });
            };
            HomeController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: 'image/*' }, this.fileUploaded.bind(this));
            };
            HomeController.prototype.fileUploaded = function (file) {
                var _this = this;
                this.file = file;
                this.$scope.$apply();
                var fileInfo = {
                    id: this.bioInfo[0]._id,
                    url: this.file.url
                };
                console.log(fileInfo);
                this.userService.updateUserImage(fileInfo).then(function (res) {
                    _this.$state.go('Home');
                });
            };
            HomeController.prototype.search = function () {
                var info = {
                    user: this.user
                };
                console.log(info);
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var ModalController = (function () {
            function ModalController($uibModalInstance, feedService) {
                this.$uibModalInstance = $uibModalInstance;
                this.feedService = feedService;
            }
            ModalController.prototype.createPost = function () {
                var _this = this;
                var token = window.localStorage["token"];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                var info = {
                    text: this.postInput,
                    username: payload.username,
                    id: undefined,
                    location: this.location,
                };
                this.feedService.createPost(info).then(function (res) {
                    _this.$uibModalInstance.close();
                    window.location.reload();
                });
            };
            return ModalController;
        }());
        Controllers.ModalController = ModalController;
        var EditController = (function () {
            function EditController($stateParams, feedService, $state) {
                this.$stateParams = $stateParams;
                this.feedService = feedService;
                this.$state = $state;
                if ($stateParams) {
                    var seperate = $stateParams["info"].split(",");
                    this.id = seperate[0];
                    this.text = seperate[1];
                }
                else {
                    console.log('Do not exist!');
                }
            }
            EditController.prototype.update = function () {
                var _this = this;
                var info = {
                    text: this.text,
                    id: this.id
                };
                this.feedService.createPost(info).then(function (res) {
                    _this.$state.go('Home');
                });
            };
            return EditController;
        }());
        Controllers.EditController = EditController;
        var RegisterController = (function () {
            function RegisterController(userService, $state) {
                this.userService = userService;
                this.$state = $state;
            }
            RegisterController.prototype.register = function () {
                var _this = this;
                this.userService.register(this.user).then(function (res) {
                    if (res.message === "username already exist") {
                        alert(res.message);
                    }
                    else {
                        _this.$state.go("Home");
                    }
                });
            };
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
        var LoginController = (function () {
            function LoginController(userService, $state) {
                this.userService = userService;
                this.$state = $state;
                var token = window.localStorage["token"];
                if (token) {
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    if (payload.exp > Date.now() / 1000) {
                        this.$state.go('Home');
                    }
                }
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.userService.login(this.user).then(function (res) {
                    if (res.message === "Correct") {
                        window.localStorage["token"] = res.jwt;
                        _this.$state.go('Home');
                    }
                    else {
                        alert(res.message);
                    }
                });
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        var CommentController = (function () {
            function CommentController(feedService, $stateParams) {
                this.feedService = feedService;
                this.$stateParams = $stateParams;
                console.log(this.comments);
                if ($stateParams) {
                    this.postId = $stateParams['id'];
                    this.comments = this.feedService.getAllComments(this.postId);
                }
            }
            CommentController.prototype.addComment = function () {
                var _this = this;
                var token = window.localStorage["token"];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                var comment = {
                    text: this.commentInput,
                    id: this.postId,
                    username: payload.username,
                };
                this.feedService.addComment(comment).then(function (res) {
                    _this.comments.push(res);
                    console.log(_this.comments);
                });
            };
            CommentController.prototype.remove = function (postId, index) {
                var _this = this;
                var answer = confirm('Are you sure you want to delete?');
                if (answer === true) {
                    this.feedService.deletePost(postId).then(function () {
                        _this.commentInput.splice(index, 1);
                    });
                }
                else {
                    console.log('not deleted');
                }
            };
            return CommentController;
        }());
        Controllers.CommentController = CommentController;
        var ProfileController = (function () {
            function ProfileController($uibModal, feedService, $stateParams, $state) {
                this.$uibModal = $uibModal;
                this.feedService = feedService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                var token = window.localStorage["token"];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                this.posts = this.feedService.getAllProfilePosts(payload.username);
                console.log(this.posts);
                if (token) {
                    console.log('logged in');
                }
                else {
                    this.$state.go('Login');
                }
            }
            ProfileController.prototype.remove = function (postId, index) {
                var _this = this;
                var answer = confirm('Are you sure you want to delete?');
                if (answer === true) {
                    this.feedService.deletePost(postId).then(function () {
                        _this.posts.splice(index, 1);
                    });
                }
                else {
                    console.log('not deleted');
                }
            };
            return ProfileController;
        }());
        Controllers.ProfileController = ProfileController;
        var VisitorController = (function () {
            function VisitorController(userService, feedService, $stateParams) {
                this.userService = userService;
                this.feedService = feedService;
                this.$stateParams = $stateParams;
                var token = window.localStorage["token"];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                var userInfo = this.userService.getUserInfo(payload.username);
                this.bioInfo = userInfo;
                this.payload = JSON.parse(window.atob(token.split('.')[1]));
                if ($stateParams) {
                    this.username = $stateParams["username"];
                    this.posts = this.feedService.getAllProfilePosts(this.username);
                }
            }
            VisitorController.prototype.follow = function () {
                var userInfo = {
                    follower: this.payload.username,
                    profile: this.username,
                };
                this.userService.followProfile(userInfo).then(function () {
                });
            };
            return VisitorController;
        }());
        Controllers.VisitorController = VisitorController;
        var LandingPageController = (function () {
            function LandingPageController() {
                var token = window.localStorage["token"];
                if (token) {
                    this.loggedIn = true;
                }
                else {
                    this.loggedIn = false;
                }
            }
            return LandingPageController;
        }());
        Controllers.LandingPageController = LandingPageController;
        angular.module('app').controller('HomeController', HomeController);
        angular.module('app').controller('EditController', EditController);
        angular.module('app').controller('ModalController', ModalController);
        angular.module('app').controller('LoginController', LoginController);
        angular.module('app').controller('RegisterController', RegisterController);
        angular.module('app').controller('CommentController', CommentController);
        angular.module('app').controller('ProfileController', ProfileController);
        angular.module('app').controller('VisitorController', VisitorController);
        angular.module('app').controller('LandingPageController', LandingPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEdBQUcsQ0EyU1o7QUEzU0QsV0FBVSxHQUFHO0lBQUMsSUFBQSxXQUFXLENBMlN4QjtJQTNTYSxXQUFBLFdBQVc7UUFFckI7WUFzREUsd0JBQ1UsU0FBNkMsRUFDN0MsV0FBcUMsRUFDckMsV0FBcUMsRUFDckMsaUJBQWlCLEVBQ2pCLE1BQWlCLEVBQ2xCLFlBQXVDLEVBQ3ZDLE1BQTBCO2dCQU56QixjQUFTLEdBQVQsU0FBUyxDQUFvQztnQkFDN0MsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO2dCQUNyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBMEI7Z0JBQ3JDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBQTtnQkFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztnQkFDbEIsaUJBQVksR0FBWixZQUFZLENBQTJCO2dCQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUFvQjtnQkFFakMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUMzQyxFQUFFLENB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