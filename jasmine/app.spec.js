
describe('test myApp.myCtrl', function () {
    var ctrl, $scope, $q, httpOK;
    var httpMock = function (obj) {
        var deferred = $q.defer();
        deferred[httpOK ? 'resolve' : 'reject']({ data: 'data' });
        return deferred.promise;
    }

    beforeEach(module('myApp'));
    beforeEach(inject(function ($injector, $controller) {
        $q = $injector.get('$q');
        $scope = $injector.get('$rootScope').$new();
        ctrl = $controller('myCtrl', {
            $scope: $scope,
            $http: httpMock
        });
    }));

    it('size should be initialized 0', function () {
        expect($scope.size).toBe(0);
    });

    it('size should be set', function () {
        httpOK = true;
        $scope.action();
        $scope.$apply();
        expect($scope.size).toBe(4);
    });

    it('size should be set', function () {
        httpOK = false;
        $scope.action();
        $scope.$apply();
        expect($scope.size).toBe(-1);
    });
});