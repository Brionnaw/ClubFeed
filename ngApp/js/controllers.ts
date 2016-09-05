namespace app.Controllers {
    export class HomeController {
        public showModal(newLocation: string) {
            this.$uibModal.open({
                templateUrl: '/templates/newLocation.html',
                controller: 'DialogController',
                controllerAs: 'vm',
                resolve: {
                    newLocation: () => newLocation
                },
                size: 'md'
              });
        }
        constructor(private $uibModal: angular.ui.bootstrap.IModalService) { }
    }
    angular.module('app').controller('HomeController', HomeController);

    export class DialogController { // controller talks to the comment modal.
        public commentInput;
        public ok() {
          console.log(this.commentInput);
          this.feedService.createComment(this.commentInput)
          //  this.$uibModalInstance.close();
        }

        constructor(
          public newLocation: string,
          private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
          private feedService: app.Services.FeedService) {
          }
    }
    // addCommentsController
export class AddCommentsController {
    public Comments;
    public id;
    public save() {
      let params = {
        status: this.Comments.status,
        id : this.id
      }
    this.addCommentsService.save(params).then(() => {
      this.$state.go('Home');
    })
  }
    constructor (
      private addCommentsService: app.Services.AddCommentsService,
      public $state:ng.ui.IStateService,
      public $stateParams: ng.ui.IStateParamsService
    ) {
    if($stateParams)  {
      this.id = $stateParams["id"];
      }
    }
}
// DeleteCommentsController
 export class DeleteCommentsController {
   public id;
   public remove() {
     this.deleteCommentsService.remove(this.id).then(()=> {
       this.$state.go('Home');
     })
   }
   constructor (
     private deleteCommentsService: app.Services.DeleteCommentsService,
     public $state:ng.ui.IStateService,
     public $stateParams: ng.ui.IStateParamsService
   ) {
   if($stateParams)  {
     this.id = $stateParams["id"];
     console.log(this.id);
     }
   }
 }
    angular.module('app').controller('DialogController', DialogController);
    angular.module('app').controller('AddCommentsController', AddCommentsController);
    angular.module('app').controller('DeleteCommentsController', DeleteCommentsController);


}
