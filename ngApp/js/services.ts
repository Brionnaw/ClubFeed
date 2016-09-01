namespace app.Services {
  export class FeedService {
    public createComment(commentData:string) {
      console.log(commentData);

    }
  }

  angular.module('app').service('feedService', FeedService);
}
