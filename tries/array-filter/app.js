myApp = angular.module("myApp", [])

myApp.controller('myCtrl', myCtrl)

myCtrl.$inject = ['$scope']

function myCtrl($scope) {
  myArray = [
      'andrew zong',
      'zong',
      'andrewqlsc',
      'zongzhaowei',
      'zhaowei',
      'kangkang',
      'zongxiong',
      'andrew'
  ];

  $scope.ks = []
  $scope.vs = []

  /*
  需求： 
      given中的放在ks中
      其他的放在vs中。
  */

  given = ['zong', 'andrew'];

  myArray.forEach(function add(item) {
    if (given.indexOf(item) > -1) {
      $scope.ks.push(item)
    } else {
      $scope.vs.push(item)
    }
  })

  newa = myArray.filter(function match(item) {
    return given.indexOf(item) > -1
  })

  newb = myArray.filter(function match(item) {
    return given.indexOf(item) <= -1
  })
  console.log(newa)
  console.log(newb)
}