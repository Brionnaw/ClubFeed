// this file is used to pass data to services
namespace app.Controllers {
    // HomeController // used for modal comment
    export class HomeController {
        public posts;
        // Show modal
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
        // Delete Comment
        public remove(postId:string, index:number) {
          let answer = confirm('Are you sure you want to delete?')
          if(answer === true) {
            this.feedService.deletePost(postId).then(() => {
              this.posts.splice(index, 1);
                  //splice - take out the array
              });
            } else {
              console.log('not deleted')
              }
          }

          //Edit Comment
          public edit(){
          }
        constructor(

          private $uibModal: angular.ui.bootstrap.IModalService,
          private feedService: app.Services.FeedService,
          public $state:ng.ui.IStateService,
          public $stateParams: ng.ui.IStateParamsService

        ) {
           this.posts = this.feedService.getAllPosts()
        }
    }
    angular.module('app').controller('HomeController', HomeController);


      //Dialog Controller // used for feed service to input comment
    export class ModalController { // controller talks to the comment modal.
        public postInput; // bind date to input
        public ok() {
          this.feedService.createPost(this.postInput).then((res) => { // res is located in post.ts
            this.$uibModalInstance.close(); // closes modal
            window.location.reload(); // forces the window to refresh
          })

        }

        constructor(
          public newLocation: string,
          private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
          private feedService: app.Services.FeedService) {
          }
    }
    angular.module('app').controller('ModalController', ModalController);

    // Edit Controller
    export class EditController {
      public text;
      public id;
      constructor (
        public $stateParams: ng.ui.IStateParamsService
      ) {
        if($stateParams){
          let seperate = $stateParams["info"].split(","); // create a new array and split into two strings.
          this.id = seperate[0] // number is defined by array to have access to each variable seperately.
          console.log(this.id)
          this.text = seperate[1]
          console.log(this.text)


        }
        else {
          console.log('Do not exist!')
        }
      }
}}
