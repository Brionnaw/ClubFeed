// this file is used to pass data to services
let token = window.localStorage["token"];
let payload = JSON.parse(window.atob(token.split('.')[1]));
namespace app.Controllers {
    // HomeController // used for modal comment
    export class HomeController {

        public posts;

          // Logout button
          public logout(){
            window.localStorage.removeItem('token');
            this.$state.go("Login");
          }

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
              console.log('not deleted')
              }
          }
          // Edit Comment
          public edit(){
          }
        constructor(

          private $uibModal: angular.ui.bootstrap.IModalService,
          private feedService: app.Services.FeedService,
          public $stateParams: ng.ui.IStateParamsService,
          public $state:ng.ui.IStateService


        ) {
           this.posts = this.feedService.getAllPosts() // this line get all posts

           let token = window.localStorage["token"];
           if(token) {
            console.log('logged in') // redirect user to login if token is expired.
           } else {
             this.$state.go('Login')
         }
       }
     }


      //Dialog Controller // used for feed service to input comment
    export class ModalController { // controller talks to the comment modal.
        public postInput; // bind date to input
        public createPost() {
          let token = window.localStorage["token"];
          let payload = JSON.parse(window.atob(token.split('.')[1]));

          let info = {
            text: this.postInput,
            username:payload.username,
            id: undefined
          }
          this.feedService.createPost(info).then((res) => { // res is located in post.ts
            this.$uibModalInstance.close(); // closes modal
            window.location.reload(); // forces the window to refresh to load comments
          })
        }
        constructor(
          private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
          private feedService: app.Services.FeedService) {
          }
    }

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
  export class RegisterController {
      public user;
      public register(){
        this.userService.register(this.user).then((res) => {
          if(res.message === "username already exist") {
            alert(res.message);
          } else {
            this.$state.go("Home");
          }
        });
      }

      constructor(
        private userService: app.Services.UserService,
        public $state: ng.ui.IStateService
      ) {
          }
      }
  //LOGIN CONTROLLER
  export class LoginController{
    public user;
    public login(){
      this.userService.login(this.user).then((res) => {
        if(res.message === "Correct"){

          window.localStorage["token" ] =res.jwt;
          this.$state.go('Home');
        } else {
          alert(res.message);
        }
      });
    }
    constructor( private  userService: app.Services.UserService,
                  public $state: ng.ui.IStateService
    ){
      // TOKEN
      let token = window.localStorage["token"];
      if(token) {
      let payload = JSON.parse(window.atob(token.split('.')[1]));
      if(payload.exp > Date.now()/ 1000) {
        this.$state.go('Home');

      }
    }
  }
}
//CommentController
export class CommentController{
    public commentInput;
    public postId;
    public comments;
    public addComment(
    ){
      let comment = {
        text:this.commentInput,
        id:this.postId,
        username:payload.username,
      }

    this.feedService.addComment(comment).then((res) => {
      this.comments.push(res);
      console.log(this.comments) // push the comments when clicking add comments
    }); // make comment equal to the result of the services

  }
  // remove comment
  public remove(postId:string, index:number) {
    let answer = confirm('Are you sure you want to delete?')
    if(answer === true) {
      this.feedService.deletePost(postId).then(() => {
        this.commentInput.splice(index, 1);

        });
      } else {
        console.log('not deleted')
        }
    }
  constructor(
    private feedService: app.Services.FeedService,
    public $stateParams: ng.ui.IStateParamsService
  ){
    this.comments = [];
    if($stateParams){
      this.postId = $stateParams['id']
    }
  }
}
// Registerd Controllers
  angular.module('app').controller('HomeController', HomeController);
  angular.module('app').controller('ModalController', ModalController);
  angular.module('app').controller('LoginController', LoginController);
  angular.module('app').controller('RegisterController', RegisterController);
  angular.module('app').controller('CommentController', CommentController);

}
