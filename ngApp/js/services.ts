// this file is used to pass data to server.ts
namespace app.Services {
  export class FeedService {
    public FeedResource;
    public getAllPosts(){
      return this.FeedResource.query();

        }
    public createPost(postData:string) { // postData:string represent  an string but usaully is an object
      let post = {
        text: postData // must assign the string with an object to pass to a method
      }
      return this.FeedResource.save(post).$promise // create an object inside a method.
      // $promise - 'chain a promise' go back to the controllers to where this is called.
    }

    public deletePost(id) {
      return this.FeedResource.remove({id: id}).$promise

      }

    constructor(private $resource: ng.resource.IResourceService) {
      this.FeedResource = $resource('/api/posts/:id') // use FeedResource to call this api endpoints // you can use one word to peform different operations.
    }
  }

  angular.module('app').service('feedService', FeedService);

      }
