namespace app.Controllers {
    export class HomeController {
        public showModal(newLocation: string) {
            this.$uibModal.open({
                templateUrl: '/templates/newLocation.html',
                controller: 'DialogController',
                controllerAs: 'modal',
                resolve: {
                    newLocation: () => newLocation
                },
                size: 'md'
              });
        }
        constructor(private $uibModal: angular.ui.bootstrap.IModalService) { }
    }
    angular.module('app').controller('HomeController', HomeController);
    class DialogController {
        public ok() {
            this.$uibModalInstance.close();
        }
        constructor(public newLocation: string, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) { }
    }
    angular.module('app').controller('DialogController', DialogController);
}
