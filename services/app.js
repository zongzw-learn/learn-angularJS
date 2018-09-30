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
    var centerLogo;

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
    
    $scope.beCareful = function() {
        /**
         * Understand Promise Chain:
         *
         * if you want to make the promise chain, the former functions(mousePosition, checkSafety)
         * MUST return a promise.
         * Otherwise, no matter the former function succeed or warnSafe, later inforSafe function
         * would always be called.
         *
         * However, if a regular value instead of promise be returned by intermediate function,
         * the later function can still be called with the return.
         *
         * By the way, warnSafe function and notifying function are optional to .then()
        */
        mousePosition()
            .then(checkSafety)
            .then(inforSafe, warnSafe);
    }

    function mousePosition() {
        var deferred = $q.defer();

        mouseEvent = window.event;
        var result = {};
        if (mouseEvent.pageX || mouseEvent.pageY){
            result.x = mouseEvent.pageX;
            result.y = mouseEvent.pageY;
        }

        deferred.resolve(result);
        return deferred.promise;
    }

    // See "Understand Promise Chain: " for why I comment this function.
    //function checkSafety(pngContext) {
    //    console.log("checkSafety .. " + angular.toJson(pngContext));
    //    return pngContext.data.length;
    //}
    // Recoding the checkSafety with promise.
    function checkSafety(position) {
        //console.log("position: " + angular.toJson(position));
        var deferred = $q.defer();

        if(!centerLogo) {
            var container = elem.getBoundingClientRect();
            centerLogo = {
                x: container.x + container.width/2,
                y: container.y + container.height/2
            };
            console.log("elem: " + elem + ":" + angular.toJson(container));
        }
        
        var dis = 200;
        var absX = position.x - centerLogo.x;
        var absY = position.y - centerLogo.y;
        var close = absX*absX + absY*absY - dis*dis;
        if (close > 0) {
            deferred.resolve("Safe!");
        } else {
            deferred.reject("Dangerous!");
        }

        return deferred.promise;
    }

    function inforSafe(result) {
        $scope.panelInfo = 'Info: You are ' + result;
    }

    function warnSafe(reason) {
        $scope.panelInfo = "Warning: Too close, " + reason;
    }

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
                 *      .inforSafe(function(result) {})
                 *      .warnSafe(function(reason) {});
                 * But we should not use it for later versions make them deprecated.
                 * Use .then(sucess, warnSafe) instead.
                */
                $http({
                    method: "GET",
                    // $location service to get information about location(url/path/port/..)
                    url: $location.absUrl() + url
            }));
        });

        // the combined promise would fail(call warnSafe function) when one of the promises fails.
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
