namespace app.Controllers {
  // HOME CONTROLLER
    export class HomeController {
      public file;
      public posts;
      public totalFollowers;
      public totalFollowing;
      public bioInfo;
      public user;
      public search(){
        let info ={
          user:this.user;
        }
        console.log(info)
      }
      // LOGOUT BUTTON
      public logout(){
        window.localStorage.removeItem('token');
        this.$state.go("Login");
      }
      // SHOW MODEL
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
      public pickFile() {
        this.filepickerService.pick(
          { mimetype: 'image/*' },
          this.fileUploaded.bind(this)
        );
      }
      public fileUploaded(file) {
        // save file url to database
        this.file = file;
        this.$scope.$apply(); // force page to update
        let fileInfo = {
          id:this.bioInfo[0]._id,
          url:this.file.url
        }
        console.log(fileInfo)
        this.userService.updateUserImage(fileInfo).then((res) => {
          this.$state.go('Home')
        })
      }
      constructor(
        private $uibModal: angular.ui.bootstrap.IModalService,
        private userService: app.Services.UserService,
        private feedService: app.Services.FeedService,
        private filepickerService,
        private $scope: ng.IScope,
        public $stateParams: ng.ui.IStateParamsService,
        public $state:ng.ui.IStateService
      ) {
        let token = window.localStorage["token"];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        let userInfo = this.userService.getUserInfo(payload.username);
        this.bioInfo = userInfo;
        console.log(this.bioInfo);
        this.posts = this.feedService.getAllPosts() // this line get all posts
        if(token) {
          console.log('logged in') // redirect user to login if token is expired.
        } else {
          this.$state.go('Login')
        }
      }
    }
    // MODAL CONTROLLER // used for feed service to input comment
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
      // EDIT CONTROLLER
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
        constructor(
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
      export class LoginController {
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
      constructor(
        private  userService: app.Services.UserService,
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
    //COMMENT CONTROLLER
    export class CommentController {
      public commentInput;
      public postId;
      public comments;
      public addComment(
      ){
        let token = window.localStorage["token"];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        let comment = {
          text:this.commentInput,
          id:this.postId,
          username:payload.username,
        }
        this.feedService.addComment(comment).then((res) => {
          this.comments.push(res)
          console.log(this.comments) // push the comments when clicking add comments
        }); // make comment equal to the result of the services
      }
        // REMOVE COMMENT
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
        console.log(this.comments)
        if($stateParams) {
          this.postId = $stateParams['id'];
          this.comments = this.feedService.getAllComments(this.postId);    // invoking the get all commments methods
        }
      }
    }
    // PROFILE CONTROLLER
    export class ProfileController{
      public posts;
      // DELETE COMMENT
      public remove(postId:string, index:number) {
        let answer = confirm('Are you sure you want to delete?')
        if(answer === true) {
          this.feedService.deletePost(postId).then(() => {
            this.posts.splice(index, 1); //splice - take out the array
          });
        } else {
          console.log('not deleted')
        }
      }
      constructor(
        private $uibModal: angular.ui.bootstrap.IModalService,
        private feedService: app.Services.FeedService,
        public $stateParams: ng.ui.IStateParamsService,
        public $state:ng.ui.IStateService
      ) {
        let token = window.localStorage["token"];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        this.posts = this.feedService.getAllProfilePosts(payload.username) // this line get all posts
        console.log(this.posts)
        if(token) {
          console.log('logged in') // redirect user to login if token is expired.
        } else {
          this.$state.go('Login')
        }
      }
    }
    //VISITOR CONTROLLER
    export class VisitorController {
      public username;
      public posts;
      public payload;
      public bioInfo;
      public follow(){
        let userInfo = {
          follower:this.payload.username,
          profile:this.username,
        }
        this.userService.followProfile(userInfo).then(() => {
        })
      }
      constructor(
        private userService: app.Services.UserService,
        private feedService: app.Services.FeedService,
        public $stateParams: ng.ui.IStateParamsService,
      ) {
        let token = window.localStorage["token"];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        let userInfo = this.userService.getUserInfo(payload.username);
        this.bioInfo = userInfo;
        this.payload = JSON.parse(window.atob(token.split('.')[1])); // change to local to scope variable to access anywhere inside class
        if($stateParams){
          this.username = $stateParams["username"] // assign value to username
          this.posts =  this.feedService.getAllProfilePosts(this.username); // invokes the method
        }
      }
    }
    // LANDING PAGE CONTROLLER
    export class LandingPageController {
      public loggedIn;
      constructor() {
        let token = window.localStorage["token"];
        if(token){ // does this variable 'token' exist? "truthy statement"
        this.loggedIn = true
      } else {
        this.loggedIn = false;
      }
    }
  }
  // REGISTERED CONTROLLERS
  angular.module('app').controller('HomeController', HomeController);
  angular.module('app').controller('EditController', EditController);
  angular.module('app').controller('ModalController', ModalController);
  angular.module('app').controller('LoginController', LoginController);
  angular.module('app').controller('RegisterController', RegisterController);
  angular.module('app').controller('CommentController', CommentController);
  angular.module('app').controller('ProfileController', ProfileController);
  angular.module('app').controller('VisitorController', VisitorController);
  angular.module('app').controller('LandingPageController', LandingPageController)

}
