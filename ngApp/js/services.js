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
                    author: postData.username,
                    location: this.location
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFVLEdBQUcsQ0E0RVo7QUE1RUQsV0FBVSxHQUFHO0lBQUMsSUFBQSxRQUFRLENBNEVyQjtJQTVFYSxXQUFBLFFBQVE7UUFDcEI7WUFvQ0kscUJBQW9CLFNBQXVDO2dCQUF2QyxjQUFTLEdBQVQsU0FBUyxDQUE4QjtnQkFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtnQkFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUN2RCxDQUFDO1lBbkNJLGlDQUFXLEdBQWxCO2dCQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25DLENBQUM7WUFDTSxnQ0FBVSxHQUFqQixVQUFrQixRQUFRO2dCQUN4QixJQUFJLElBQUksR0FBRztvQkFDVCxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7b0JBQ25CLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFBRTtvQkFDZixNQUFNLEVBQUMsUUFBUSxDQUFDLFFBQVE7b0JBQ3hCLFFBQVEsRUFBQyxJQUFJLENBQUMsUUFBUTtpQkFDdkIsQ0FBQTtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFBO1lBRTlDLENBQUM7WUFDTSxnQ0FBVSxHQUFqQixVQUFrQixFQUFFO2dCQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUE7WUFDbEQsQ0FBQztZQUNNLGdDQUFVLEdBQWpCLFVBQWtCLFlBQVk7Z0JB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