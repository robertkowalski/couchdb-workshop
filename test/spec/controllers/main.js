'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('workshopCouchApp'));

  var $httpBackend,
      $rootScope,
      createController,
      appSettings,
      items;

  beforeEach(inject(function ($injector) {

    appSettings = $injector.get('appSettings');

    $httpBackend = $injector.get('$httpBackend');

    items = {total_rows: 2, offset: 0, rows: [
      {id: 'd19027710152f7600216d0b84e009ab2', 'key': 'Angular Book',
        'value': 29.989999999999998437},
      {id: 'd19027710152f7600216d0b84e00a887', 'key': 'Node.js Hosting',
        'value': 3.3333333333333333333}
    ]};

    $httpBackend.when('GET', appSettings.couchRoot + appSettings.itemsView)
      .respond(items);

    $rootScope = $injector.get('$rootScope');

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('MainCtrl', {'$scope' : $rootScope });
    };

  }));

  it('should fetch items', function() {
    $httpBackend.expectGET(appSettings.couchRoot + appSettings.itemsView);
    createController();
    $httpBackend.flush();
    assert.equal($rootScope.items.length, 2);
  });

  it('should send items to the server and and optimisticly update the scope', function() {
    createController();

    $httpBackend.flush();

    $rootScope.name = 'ente';
    $rootScope.price = 2.99;

    $httpBackend
      .expectPOST(appSettings.couchRoot + appSettings.databaseRoot)
      .respond(200, '');

    $rootScope.processForm();
    $httpBackend.flush();

    assert.equal($rootScope.items.length, 3);
  });

  it('should reset the list when getting an error after posting', function() {
    createController();

    $rootScope.name = 'ente';
    $rootScope.price = 2.99;

    $httpBackend.flush();

    $httpBackend
      .expectPOST(appSettings.couchRoot + appSettings.databaseRoot)
      .respond(500, '');

    $rootScope.processForm();
    $httpBackend.flush();

    assert.deepEqual($rootScope.items, items.rows);
  });

  it('should show an error-message when getting an error after posting', function() {
    createController();

    $httpBackend
      .when('POST', appSettings.couchRoot + appSettings.databaseRoot)
      .respond(500, {reason: 'not allowed'});

    $rootScope.processForm();
    $httpBackend.flush();

    assert.equal($rootScope.status, 'Error: not allowed');
  });

});
