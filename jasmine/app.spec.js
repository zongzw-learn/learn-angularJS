(function() {
    'use strict';
    describe('test myApp.myCtrl', function() {
        var ctrl, $scope, $q, httpOK;
        var httpMock = function(obj) {
            var deferred = $q.defer();
            deferred[httpOK ? 'resolve' : 'reject']({data: 'data'});
            return deferred.promise;
    
        }
        beforeEach(module('myApp'));
        beforeEach(inject(function($injector, $controller){
            $q = $injector.get('$q');
            ctrl = $controller('myCtrl', {
                $scope: $injector.get('$rootScope').$new(),
                $http: httpMock
            });
        }));
    
        it('size should be initialized 0', function(){
            expect($scope.size).toBe(0);
        });
    
        it('size should be set', function() {
            $scope.action();
            expect($scope.size).toBe(4);
        });
    });
    var calculator = {
        sum: function(x, y) {
            return x + y;
        }
    }
    
    describe('calculator', function () {
        
        it('1 + 1 should equal 2', function () {
            expect(calculator.sum(1, 1)).toBe(2);
        });
    
        it('3 + 2 should equal 5', function () {
            expect(calculator.sum(3, 2)).toBe(5);
        });
    
    });
});