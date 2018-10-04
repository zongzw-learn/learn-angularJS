var app = angular.module("myApp", []);
app.controller("myCtrl", ['$scope', '$http', function($scope, $http) {
    $scope.size = 0;
    $scope.url = "http://foxfox.mychinabluemix.net/metamask.png";

    $scope.action = function() {
        $http({
            method: "GET",
            url: $scope.url
        }).then(
            function(result) {
                $scope.size = result.data.length;
            }, 
            function(reason) {
                $scope.size = -1;
            }
        );
    }
}]);
