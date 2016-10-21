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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxJQUFVLEdBQUcsQ0ErVFo7QUEvVEQsV0FBVSxHQUFHO0lBQUMsSUFBQSxXQUFXLENBK1R4QjtJQS9UYSxXQUFBLFdBQVcsRUFBQyxDQUFDO1FBRXZCO1lBOENJLHdCQUVVLFNBQTZDLEVBQzdDLFdBQXFDLEVBQ3JDLFdBQXFDLEVBQ3JDLGlCQUFpQixFQUNqQixNQUFpQixFQUNsQixZQUF1QyxFQUN2QyxNQUEwQjtnQkFOekIsY0FBUyxHQUFULFNBQVMsQ0FBb0M7Z0JBQzdDLGdCQUFXLEdBQVgsV0FBVyxDQUEwQjtnQkFDckMsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO2dCQUNyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQUE7Z0JBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVc7Z0JBQ2xCLGlCQUFZLEdBQVosWUFBWSxDQUEyQjtnQkFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7Z0JBSWpDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUU5RCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFD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