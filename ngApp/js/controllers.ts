// this file is used to pass data to services
namespace app.Controllers {
    // HomeController // used for modal comment
    export class HomeController {
        public posts;
        public showModal(newLocation: string) {
            this.$uibModal.open({
                templateUrl: '/templates/newLocation.html',
                controller: 'ModalController', // add seperate controller for the "ANGULAR" modal but not switching states.
                controllerAs: 'vm',
                resolve: {
                    newLocation: () => newLocation
                },
                size: 'md'
              });
        }
        constructor(
          private $uibModal: angular.ui.bootstrap.IModalService,
          private feedService: app.Services.FeedService)
         {
           this.posts = this.feedService.getAllPosts()
           console.log(this.posts);
        }
    }
    angular.module('app').controller('HomeController', HomeController);

      //Dialog Controllers // used for feed service to input comment
    export class ModalController { // controller talks to the comment modal.
        public postInput; // bind date to input
        public ok() {
          this.feedService.createPost(this.postInput).then((res) => { // res is located in post.ts
            this.$uibModalInstance.close(); // closes modal
          })

        }

        constructor(
          public newLocation: string,
          private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
          private feedService: app.Services.FeedService) {
          }
    }

    angular.module('app').controller('ModalController', ModalController);



}
