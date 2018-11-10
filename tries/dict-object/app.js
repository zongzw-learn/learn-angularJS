myApp = angular.module("myApp", [])

myApp.controller('myCtrl', myCtrl)

myCtrl.$inject = ['$scope']

function myCtrl($scope) {
    myDict = {
        "esd_demo_3": {
            "lbaas_ctcp": "tcp-wan-optimized",
            "lbaas_stcp": "tcp-lan-optimized"
        },
        "esd_demo_4": {
            "lbaas_ctcp": "wom-tcp-lan-optimized",
            "lbaas_stcp": "tcp-lan-optimized"
        },
        "esd_demo_5": {
            "lbaas_ctcp": "tcp-mobile-optimized",
            "lbaas_stcp": "tcp-lan-optimized"
        },
        "esd_demo_6": {
            "lbaas_cssl_profile": "clientssl-insecure-compatible",
            "lbaas_ctcp": "tcp-mobile-optimized",
            "lbaas_fallback_persist": "source_addr",
            "lbaas_irule": [
                "_sys_https_redirect"
            ],
            "lbaas_persist": "hash",
            "lbaas_policy": [],
            "lbaas_sssl_profile": "serverssl",
            "lbaas_stcp": "tcp-lan-optimized"
        }
    }
    $scope.ks = Object.keys(myDict)
    console.log($scope.ks)
    $scope.vs = myDict

    $scope.in = ('esd_demo_5' in myDict) ? true : false;

    console.log($scope.vs)
}