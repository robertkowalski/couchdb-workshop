'use strict';

angular.module('workshopCouchApp')
  .controller('MainCtrl', function ($scope, $http, appSettings) {

    $scope.name = null;
    $scope.price = null;
    $scope.items = [];
    $scope.status = '';

    $scope.processForm = function () {
      var item = {
        name: $scope.name,
        price: $scope.price
      };
      postItem(item);
    };

    function postItem (item) {
      // optimistic ui update
      $scope.items.push({key: $scope.name, value: $scope.price});
      // send post request
      $http.post(appSettings.db, item)
        .success(function () {
          $scope.status = '';
        }).error(function (res) {
          $scope.status = 'Error: ' + res.reason;
          // refetch items from server
          getItems();
        });
    }

    function getItems () {
      $http.get(appSettings.db + '/_design/expenses/_view/byName')
        .success(function (data) {
          $scope.items = data.rows;
        });
    }
    getItems();
  });
