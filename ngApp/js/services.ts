namespace app.Services {
  export class FeedService {
    public createComment(commentData:string) {
      console.log(commentData);
    }
  }
  export class AddCommentsService{
   public AddComments;
     public save(comments) {
       return this.AddComments.save(comments).$promise; // api call // save = .post
     }
     public getAll(){
       return this.AddComments.query(); // query = get
     }
     public remove (id) {
       return this.AddComments.remove({id: id}).$promise //remove = delete
     }
     constructor(private $resource: ng.resource.IResourceService) {
       this.AddComments = $resource('/api/addComments/:id')

     }
   }
   export class DeleteCommentsService{
    public DeleteComments;
      public save(comments) {
        return this.DeleteComments.save(comments).$promise; // api call // save = .post
      }
      public getAll(){
        return this.DeleteComments.query(); // query = get
      }
      public remove (id) {
        return this.DeleteComments.remove({id: id}).$promise //remove = delete
      }
      constructor(private $resource: ng.resource.IResourceService) {
        this.DeleteComments = $resource('/api/deleteComments/:id')

      }
    }
  angular.module('app').service('addCommentsService', AddCommentsService);
  angular.module('app').service('feedService', FeedService);
  angular.module('app').service('deleteCommentsService', DeleteCommentsService);

}
