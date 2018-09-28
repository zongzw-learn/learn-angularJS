var app = angular.module("myApp", []);

// define customized service via service()
app.service("author", function() {
    this.author = function() {
        return "Andrew Zong(a.zong@f5.com)"
    };
});

app.controller('myCtrl', ctl);
ctl.$inject = [
    '$scope', '$q', '$filter', '$interval', '$http', '$timeout', 'author'
];

function ctl($scope, $q, $filter, $interval, $http, $timeout, author) {
    $scope.timeoutInfo = '';
    var wait = 10;
    
    // $interval service: corresponding to JS window.setInterval function.
    $interval(function() {
        $scope.curtime = new Date().toLocaleString();
    }, 50);

    // $timeout service: corresponding to JS window.setTimeout function.
    $timeout(function() {
        $scope.timeoutInfo = author.author() + 
                " remind you, this page idles for more than " + wait + " seconds";
    }, wait * 1000);


}
