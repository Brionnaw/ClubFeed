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
    angular.module('app').controller('DialogController', DialogController);
}
