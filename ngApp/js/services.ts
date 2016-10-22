// this file is used to pass data to server.ts
namespace app.Services {
  export class FeedService {
    public FeedResource;
    public CommentResource;
    public getAllPosts(){
      return this.FeedResource.query();
    }
    public createPost(postData) { // postData:string represent  an string but usaully is an object
      let post = { //object
        text: postData.text,
        id: postData.id,
        author:postData.username
      }
      console.log(postData)
      return this.FeedResource.save(post).$promise // create an object inside a method.
      // $promise - 'chain a promise' go back to the controllers to where this is called.
    }
    public deletePost(id) {
      return this.FeedResource.remove({id: id}).$promise
      }
      public addComment(commentInput) {
        let comment = {
          text:commentInput.text,
          id:commentInput.id,
          author:commentInput.username
        }
        console.log(commentInput)
        return this.CommentResource.save(comment).$promise // passing in back end point
      }
      public getAllComments(id){
        return this.CommentResource.query({id:id});
      }
      public getAllProfilePosts(username){
        return this.FeedResource.query({id:username});
      }
      constructor(private $resource: ng.resource.IResourceService) {
        this.FeedResource = $resource('/api/posts/:id') // use FeedResource to call this api endpoints // you can use one word to peform different operations.
        this.CommentResource = $resource('/api/comments/:id')
      }
    }
    // USER SERVICE
    export class UserService {
      public RegisterResource;
      public LoginResource;
      public FollowResource;
      public FollowingResource;
      public PhotoResource;
      public register(user){
        return this.RegisterResource.save(user).$promise;
      }
      public login(user){
        return this.LoginResource.save(user).$promise;
      }
      public followProfile(info){
        return this.FollowResource.save(info).$promise
      }
      public getUserInfo(username){
        return this.FollowResource.query({id: username})
      }
      public updateUserImage(url){
        return this.PhotoResource.save(url).$promise
      }
      constructor(
        $resource:ng.resource.IResourceService
      ){
        this.RegisterResource = $resource('api/users/register')
        this.LoginResource = $resource('api/users/login');
        this.FollowResource = $resource('api/users/:id');
        this.FollowingResource = $resource('api/users');
        this.PhotoResource = $resource('api/users/photo')
      }
    }
    angular.module('app').service('feedService', FeedService)
    angular.module('app').service('userService', UserService)
}
