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
                this.file = file;
                this.$scope.$apply();
                var fileInfo = {
                    id: this.bioInfo[0]._id,
                    url: this.file.url
                };
                console.log(fileInfo);
                this.userService.updateUserImage(fileInfo).then(function (res) {
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
                this.payload = JSON.parse(window.atob(token.split('.')[1]));
                if ($stateParams) {
                    this.username = $stateParams["username"];
                    this.posts = this.feedService.getAllProfilePosts(this.username);
                }
            }
            VisitorController.prototype.follow = function () {
                var userInfo = {
                    follower: this.payload.username,
                    profile: this.username
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxJQUFVLEdBQUcsQ0E4VFo7QUE5VEQsV0FBVSxHQUFHO0lBQUMsSUFBQSxXQUFXLENBOFR4QjtJQTlUYSxXQUFBLFdBQVcsRUFBQyxDQUFDO1FBRXZCO1lBNkNJLHdCQUVVLFNBQTZDLEVBQzdDLFdBQXFDLEVBQ3JDLFdBQXFDLEVBQ3JDLGlCQUFpQixFQUNqQixNQUFpQixFQUNsQixZQUF1QyxFQUN2QyxNQUEwQjtnQkFOekIsY0FBUyxHQUFULFNBQVMsQ0FBb0M7Z0JBQzdDLGdCQUFXLEdBQVgsV0FBVyxDQUEwQjtnQkFDckMsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO2dCQUNyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQUE7Z0JBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVc7Z0JBQ2xCLGlCQUFZLEdBQVosWUFBWSxDQUEyQjtnQkFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7Z0JBSWpDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUU5RCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFD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