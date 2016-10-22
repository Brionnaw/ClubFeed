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
                    id: undefined
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEdBQUcsQ0E2Ulo7QUE3UkQsV0FBVSxHQUFHO0lBQUMsSUFBQSxXQUFXLENBNlJ4QjtJQTdSYSxXQUFBLFdBQVcsRUFBQyxDQUFDO1FBRXZCO1lBMENFLHdCQUNVLFNBQTZDLEVBQzdDLFdBQXFDLEVBQ3JDLFdBQXFDLEVBQ3JDLGlCQUFpQixFQUNqQixNQUFpQixFQUNsQixZQUF1QyxFQUN2QyxNQUEwQjtnQkFOekIsY0FBUyxHQUFULFNBQVMsQ0FBb0M7Z0JBQzdDLGdCQUFXLEdBQVgsV0FBVyxDQUEwQjtnQkFDckMsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO2dCQUNyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQUE7Z0JBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVc7Z0JBQ2xCLGlCQUFZLEdBQVosWUFBWSxDQUEyQjtnQkFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7Z0JBRWpDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFD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