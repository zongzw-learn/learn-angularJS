var app = angular.module('myApp', []);

app.service("myService", function(){
    serv = {
        actions: actions
    };

    return serv;

    function actions() {
        console.log("actions is called.");
        return ['1', '2'];
    }
})

app.controller("myCtrl", myCtrl);
myCtrl.$inject = [
    '$scope', 'myService'
];

function myCtrl($scope, myService) {
    $scope.actions = myService.actions
    console.log("myCtrl called.")
}