// this file is used to pass data to services
namespace app.Controllers {
    // HomeController // used for modal comment
    export class HomeController {
        public posts;
        // Show modal
        public showModal(createPost: string) {
            this.$uibModal.open({
                templateUrl: '/templates/createPost.html',
                controller: 'ModalController', // add seperate controller for the "ANGULAR" modal but not switching states.
                controllerAs: 'vm',
                resolve: {
                    createPost: () => createPost
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
              // console.log('not deleted')
              }
          }
          //Edit Comment
          public edit(){
          }
        constructor(

          private $uibModal: angular.ui.bootstrap.IModalService,
          private feedService: app.Services.FeedService,
          public $stateParams: ng.ui.IStateParamsService

        ) {
           this.posts = this.feedService.getAllPosts()
        }
    }
    angular.module('app').controller('HomeController', HomeController);


      //Dialog Controller // used for feed service to input comment
    export class ModalController { // controller talks to the comment modal.
        public postInput; // bind date to input
        public createPost() {
          let info = {
            text: this.postInput,
            id: undefined
          }
          this.feedService.createPost(info).then((res) => { // res is located in post.ts
            this.$uibModalInstance.close(); // closes modal
            window.location.reload(); // forces the window to refresh
          })
        }
        constructor(
          private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
          private feedService: app.Services.FeedService) {
          }
    }
    angular.module('app').controller('ModalController', ModalController);

    // Edit Controller
    export class EditController {
      public text;
      public id;
      public update(){
        let info = {
          text: this.text,
          id: this.id
        }
        this.feedService.createPost(info).then((res) =>  {
          this.$state.go('Home')
        })
      }
      constructor (
        public $stateParams: ng.ui.IStateParamsService,
        private feedService: app.Services.FeedService, // dependencies injection give access to services
        public $state:ng.ui.IStateService)

        {
        if($stateParams){
          let seperate = $stateParams["info"].split(","); // create a new array and split into two strings.
          this.id = seperate[0] // number is defined by array to have access to each variable seperately.
          this.text = seperate[1]
        }
        else {
          console.log('Do not exist!')
        }
      }
  }

  angular.module('app').controller('EditController', EditController);

  // REGISTER controller
  export class RegisterController{
      public user;
      public register(){
        this.userService.register(this.user).then(() => {
          this.$state.go('Home');
        });
      }
        constructor(
          private userService: app.Services.UserService,
          public $state: ng.ui.IStateService) {
      }
  }
  angular.module('app').controller('RegisterController', RegisterController);

  //LOGIN CONROLLER
  export class LoginController{
    public user;
    public login(){
      this.userService.login(this.user).then((message) => {
        console.log(message);
        this.$state.go('Home');
      });

    }
    constructor( private  userService: app.Services.UserService,
                  public $state: ng.ui.IStateService
    ){
    }
  }
  angular.module('app').controller('LoginController', LoginController);
}
