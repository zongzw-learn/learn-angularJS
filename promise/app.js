var app = angular.module("App", [])
app.controller("Controller", ['$scope', '$filter', '$q', '$http',
    function(
        $scope, 
        $filter,
        $q,
        $http
    ){
        $scope.time = $filter('date')(new Date(), "MM-dd-HH-mm-ss");

        $scope.test_no_promise = function() {
            noPromise1().then(noPromise2)
        };

        // must be 1) return promise as future promise; 2) must resolve/reject to trigger successCallback / errorCallback.
        function noPromise1() {
            console.log("calling noPromise1")
            d = $q.defer()
            p = d.promise
            d.resolve("a")
            return p
        }


        function noPromise2(result) {
            console.log("calling noPromise2")
        }

        $scope.update = function() {
            console.log("update clicked")
            $scope.time = $filter('date')(new Date(), "MM-dd-HH-mm-ss")

            spec = [
                "http://localhost/",
                "http://10.145.106.100:8080/",
                "http://10.145.106.100/",
                'http://foxfox.mychinabluemix.net/metamask.png'
            ]
      
            var promises = []
            angular.forEach(spec, function(value) {
                promises.push(step1(value).then(onStep1OK, onStep1Failed))
            })

            $q.all(promises)
                .then(step2, onSteps1Failed)
                .then(step3)
                .then(step4)
        }

        function step1(value) {

            return $http({
                method: "GET",
                url: value
            })
        }

        function step2(param) {
            console.log("step2 param: " )//+ param)
            console.log("step2 param: " + angular.toJson(param))
        }

        function step3() {
            console.log("step 3 executed")
        }
        function step4() {
            console.log("step 4 executed")
        }
        
        function onStep1OK(result) {
        //function onStep1OK() {

            var deferred = $q.defer()
            var promise = deferred.promise

            //test if no parameter passed in.
            //console.log("step1  succeed: " + angular.toJson(result))
            console.log("step1  succeed")
            //deferred.resolve("result")

            //return promise
            //return "result"
            return result
        }
        

        //test if no promise return
        //function onStep1OK(result) {
        //    console.log("step1  succeed: " + angular.toJson(result))
        //}

        /*
        function onStep1Failed(param) {
            var deferred = $q.defer()
            var promise = deferred.promise
            console.log("onStep1Failed param: " + angular.toJson(param))
            deferred.reject(param)
            return promise
        }
        */

        // test if no promise return
        function onStep1Failed(reason) {
            console.log("onStep1Failed param: " )//+ angular.toJson(reason))
        }

        function onSteps1Failed(param) {
            console.log("onSteps1Failed param: ")// + angular.toJson(param))
        }

}]); 
