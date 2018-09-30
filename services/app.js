var app = angular.module("myApp", []);

// define customized service via service()
app.service("author", function() {
    this.author = function() {
        return "Andrew Zong(a.zong@f5.com)"
    };
});

app.controller('myCtrl', ctl);
ctl.$inject = [
    '$scope', '$q', '$location', '$interval', '$http', '$timeout', 'author'
];

function ctl($scope, $q, $location, $interval, $http, $timeout, author) {
    $scope.timeoutInfo = '';
    var wait = 100;
    var panelDefText = "Move Over the Fox.";
    var mouseEvent;

    var elem = window.document.getElementById('logo-container')

    // $interval service: corresponding to JS window.setInterval function.
    $interval(function() {
        $scope.curtime = new Date().toLocaleString();
    }, 50);

    // $timeout service: corresponding to JS window.setTimeout function.
    $timeout(function() {
        $scope.timeoutInfo = author.author() + 
                " reminds you, this page idles for more than " + wait + " seconds";
    }, wait * 1000);

    $scope.pngSource = "http://foxfox.mychinabluemix.net/metamask.png";
    $scope.panelInfo = panelDefText;
    $scope.calTimes = 0;
    $scope.selectChanged = function() {
        console.log("current selection: " + $scope.pngSource);
    };
    
    $scope.mouseEnterPng = function() {
        /**
         * Understand Promise Chain:
         *
         * if you want to make the promise chain, the former functions(getPngFromUrl, calPngSize)
         * MUST return a promise.
         * Otherwise, no matter the former function succeed or error, later success function
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
        var deferred = $q.defer();

        if (!mouseEvent){
            mouseEvent = window.event;
        }
   
        var result = {};
        if (mouseEvent.pageX || mouseEvent.pageY){
            result.x = mouseEvent.pageX;
            result.y = mouseEvent.pageY;
        }

        deferred.resolve(result);

        return deferred.promise;
    }

    // See "Understand Promise Chain: " for why I comment this function.
    //function calPngSize(pngContext) {
    //    console.log("calPngSize .. " + angular.toJson(pngContext));
    //    return pngContext.data.length;
    //}
    // Recoding the calPngSize with promise.
    function calPngSize(position) {
        var deferred = $q.defer();

        console.log("(" + position.x + ", " + position.y + ")");
        var container = elem.getBoundingClientRect();
        console.log("elem: " + elem + ":" + container);
        
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

    // About Multiple Promises: $q.all([])
    // All promises in $q.all would be executed in parallel.
    $scope.urls = [
        "angularjs.jpg",
        'html.jpg',
        'batarang.jpg',
        'chrome.jpg',
        'vscode.jpg',
        'squid3.jpg',
        'nginx.jpg'
    ].map(function(item){
        return "thanksto/" + item;
    });

    $scope.checkReadiness = function() {        
        var promises = [];
        angular.forEach($scope.urls, function(url) {
            promises.push(
                /**
                 * About $http
                 * 
                 * $http would return the promise, which would be executed in caller's context.
                 *
                 * $http have 2 subsequent functions, like:
                 *  $http({method: 'GET', url: "http://xxx.yy"})
                 *      .success(function(result) {})
                 *      .error(function(reason) {});
                 * But we should not use it for later versions make them deprecated.
                 * Use .then(sucess, error) instead.
                */
                $http({
                    method: "GET",
                    // $location service to get information about location(url/path/port/..)
                    url: $location.absUrl() + url
            }));
        });

        // the combined promise would fail(call error function) when one of the promises fails.
        $q.all(promises).then(
            function(result) {
                $scope.srcReady = true;
            },
            function(reason) {
                // use batalang, we can set breakpoint here to check reason object.
                console.log("" + angular.toJson(reason));
                $scope.srcReady = false;
            }  
        );
    }
}
