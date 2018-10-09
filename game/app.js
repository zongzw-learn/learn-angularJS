var app = angular.module("myApp", []);

app.controller('myCtrl', ctl);
ctl.$inject = [
    '$scope', '$q', '$location', '$interval', 
    '$http', '$timeout', '$window'
];

function ctl($scope, $q, $location, $interval, $http, $timeout, $window) {
    $scope.pngSource = "http://foxfox.mychinabluemix.net/metamask.png";

    var catched = false;
    var elem = $window.document.getElementById("imgid");
    var rx, ry;

    $scope.catch = function(event) {
        catched = !catched;

        rect = elem.getBoundingClientRect();
        rx = event.pageX - rect.left;
        ry = event.pageY - rect.top;
    }

    $scope.move = function(event) {
        if(catched) {
            elem.setAttribute("style", 
                "width:100px; height:90px; " 
                + "position:absolute; " 
                + "left:"+ (event.pageX - rx) + "px; "
                + "top:" + (event.pageY - ry) + "px");
        }
    }

    function logXY(event) {
        console.log("event at (" + event.pageX + ", " + event.pageY + ")");
    }

    $scope.autoMove = function(event) {
        logXY(event);
        
        rect = elem.getBoundingClientRect();

        var tx = event.pageX - rect.width/2;
        var ty = event.pageY - rect.height/2;
        sx = rect.left// + rect.width/2;
        sy = rect.top// + rect.height/2;

        var per = 0;
        $interval(
            function() {
                if(catched || per >= 100) {
                    $interval.cancel();
                    console.log("stop moving.")
                    return
                }

                per += 1;
                cx = sx + (tx - sx) * per / 100;
                cy = sy + (ty - sy) * per / 100;

                elem.setAttribute("style", 
                    "width:100px; height:90px; " 
                    + "position:absolute; " 
                    + "left:"+ (cx)  + "px; "
                    + "top:" + (cy) + "px");
            },
            30
        )
    }
}
