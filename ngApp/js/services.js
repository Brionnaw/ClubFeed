var app;
(function (app) {
    var Services;
    (function (Services) {
        var FeedService = (function () {
            function FeedService($resource) {
                this.$resource = $resource;
                this.FeedResource = $resource('/api/posts/:id');
                this.CommentResource = $resource('/api/comments/:id');
            }
            FeedService.prototype.getAllPosts = function () {
                return this.FeedResource.query();
            };
            FeedService.prototype.createPost = function (postData) {
                var post = {
                    text: postData.text,
                    id: postData.id,
                    author: postData.username
                };
                console.log(postData);
                return this.FeedResource.save(post).$promise;
            };
            FeedService.prototype.deletePost = function (id) {
                return this.FeedResource.remove({ id: id }).$promise;
            };
            FeedService.prototype.addComment = function (commentInput) {
                var comment = {
                    text: commentInput.text,
                    id: commentInput.id,
                    author: commentInput.username
                };
                console.log(commentInput);
                return this.CommentResource.save(comment).$promise;
            };
            FeedService.prototype.getAllComments = function (id) {
                return this.CommentResource.query({ id: id });
            };
            FeedService.prototype.getAllProfilePosts = function (username) {
                return this.FeedResource.query({ id: username });
            };
            return FeedService;
        }());
        Services.FeedService = FeedService;
        var UserService = (function () {
            function UserService($resource) {
                this.RegisterResource = $resource('api/users/register');
                this.LoginResource = $resource('api/users/login');
                this.FollowResource = $resource('api/users/:id');
                this.FollowingResource = $resource('api/users');
                this.PhotoResource = $resource('api/users/photo');
            }
            UserService.prototype.register = function (user) {
                return this.RegisterResource.save(user).$promise;
            };
            UserService.prototype.login = function (user) {
                return this.LoginResource.save(user).$promise;
            };
            UserService.prototype.followProfile = function (info) {
                return this.FollowResource.save(info).$promise;
            };
            UserService.prototype.getUserInfo = function (username) {
                return this.FollowResource.query({ id: username });
            };
            UserService.prototype.updateUserImage = function (url) {
                return this.PhotoResource.save(url).$promise;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('app').service('feedService', FeedService);
        angular.module('app').service('userService', UserService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFVLEdBQUcsQ0EwRVo7QUExRUQsV0FBVSxHQUFHO0lBQUMsSUFBQSxRQUFRLENBMEVyQjtJQTFFYSxXQUFBLFFBQVEsRUFBQyxDQUFDO1FBQ3RCO1lBa0NJLHFCQUFvQixTQUF1QztnQkFBdkMsY0FBUyxHQUFULFNBQVMsQ0FBOEI7Z0JBQ3pELElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUE7Z0JBQy9DLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUE7WUFDdkQsQ0FBQztZQWxDSSxpQ0FBVyxHQUFsQjtnQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQyxDQUFDO1lBQ00sZ0NBQVUsR0FBakIsVUFBa0IsUUFBUTtnQkFDeEIsSUFBSSxJQUFJLEdBQUc7b0JBQ1QsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO29CQUNuQixFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUU7b0JBQ2YsTUFBTSxFQUFDLFFBQVEsQ0FBQyxRQUFRO2lCQUN6QixDQUFBO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUE7WUFFOUMsQ0FBQztZQUNNLGdDQUFVLEdBQWpCLFVBQWtCLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtZQUNsRCxDQUFDO1lBQ00sZ0NBQVUsR0FBakIsVUFBa0IsWUFBWTtnQkFDNUIsSUFBSSxPQUFPLEdBQUc7b0JB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