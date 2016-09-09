// this file is used to pass data to server.ts
namespace app.Services {
  export class FeedService {
    public FeedResource;
    public getAllPosts(){
      return this.FeedResource.query();

    }
    public createPost(postData) { // postData:string represent  an string but usaully is an object
      let post = {
        text: postData.text,
        id: postData.id
      }
      console.log(postData)
      return this.FeedResource.save(post).$promise // create an object inside a method.
    //   // $promise - 'chain a promise' go back to the controllers to where this is called.
    }
    public deletePost(id) {
      return this.FeedResource.remove({id: id}).$promise

      }



    constructor(private $resource: ng.resource.IResourceService) {
      this.FeedResource = $resource('/api/posts/:id') // use FeedResource to call this api endpoints // you can use one word to peform different operations.
    }
  }
    export class UserService {
        public RegisterResource;

        public register(user){
          console.log(user);
          return this.RegisterResource.save(user).$promise;
        }

      constructor(
      
        $resource:ng.resource.IResourceService
      ){

        this.RegisterResource = $resource('api/users/register');
      }
    }

  angular.module('app').service('feedService', FeedService),
  angular.module('app').service('userService', UserService);

    }
