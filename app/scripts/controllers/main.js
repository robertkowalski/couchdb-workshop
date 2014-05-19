'use strict';

angular.module('workshopCouchApp')
  .controller('MainCtrl', function ($scope, $http, appSettings) {

    function getItems () {
      $http.get(appSettings.db + '/_design/expenses/_view/byName')
        .success(function (data) {
          $scope.items = data.rows;
        });
    }
    getItems();
  });
