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
    var wait = 100;
    var panelDefText = "Move Over the Fox.";

    // $interval service: corresponding to JS window.setInterval function.
    $interval(function() {
        $scope.curtime = new Date().toLocaleString();
    }, 50);

    // $timeout service: corresponding to JS window.setTimeout function.
    $timeout(function() {
        $scope.timeoutInfo = author.author() + 
                " remind you, this page idles for more than " + wait + " seconds";
    }, wait * 1000);

    $scope.pngSource = "http://foxfox.mybluemix.net/metamask.png";
    $scope.panelInfo = panelDefText;
    $scope.calTimes = 0;

    $scope.mouseEnterPng = function() {
        /**
         * Understand Promise Chain:
         *
         * if you want to make the promise chain, the intermediate function(here is calPngSize)
         * MUST return a promise.
         * Otherwise, no matter the intermediate function succeed or error, later success function
         * would always be called(here is success).
         *
         * However, if a regular value instead of promise be returned by intermediate function,
         * the later function can still be called with the return.
         *
         * By the way, error function and notifying function are optional to .then()
        */
        getPngFromUrl()
            .then(calPngSize, function(reason) {$scope.panelInfo = "Error: " + reason;})
            .then(success, error);
    }

    function getPngFromUrl() {
        /**
         * Understand Promise:
         *
         * $http would return the promise, which would be executed in caller's context.
         *
         * $http have 2 subsequent functions, like:
         *  $http({method: 'GET', url: "http://xxx.yy"})
         *      .success(function(result) {})
         *      .error(function(reason) {});
         * But we should not use it for later versions make them deprecated.
         * Use .then(sucess, error) instead.
         * */
        return $http({
            method: 'GET',
            url: $scope.pngSource
        });
    }

    // See "Understand Promise Chain: " for why I comment this function.
    //function calPngSize(pngContext) {
    //    console.log("calPngSize .. " + angular.toJson(pngContext));
    //    return pngContext.data.length;
    //}
    // Recoding the calPngSize with promise.
    function calPngSize(pngContext) {
        $scope.calTimes += 1;
        var deferred = $q.defer();

        if($scope.calTimes > 3) {
            deferred.reject("Duplicate Calculation: " + pngContext.data.length);
        } else {
            deferred.resolve("Size: " + pngContext.data.length);
        }

        return deferred.promise;
    }

    function success(result) {
        $scope.panelInfo = 'Info: ' + result;
    }

    function error(reason) {
        $scope.panelInfo = "Warning: " + reason;
    }

    $scope.mouseLeavePng = function() {
        $scope.panelInfo = panelDefText;
    };
}
