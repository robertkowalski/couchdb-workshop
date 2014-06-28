var chai = require('chai');
var assert = chai.assert;

describe('validation', function () {

  it('should accept numbers separated with a dot, and two numbers behind the dot',
    function () {
      var currentCount;
      browser.get('/');

      element.all(by.repeater('item in items')).count().then(function (count) {
        currentCount = count;
      });

      element(by.model('name')).sendKeys('jacksparrow');
      element(by.model('price')).sendKeys('1.44');

      element(by.css('button')).click();

      element.all(by.repeater('item in items')).count().then(function (count) {
        assert.equal(count, currentCount + 1);
      });
  });

  it('should NOT accept strings', function () {
    var currentCount;
    browser.get('/');

    element.all(by.repeater('item in items')).count().then(function (count) {
      currentCount = count;
    });

    element(by.model('name')).sendKeys('jacksparrow');
    element(by.model('price')).sendKeys('ente');

    element(by.css('button')).click();

    element.all(by.repeater('item in items')).count().then(function (count) {
      assert.equal(count, currentCount);
    });
  });

  it('should NOT accept numbers not delimited by a .', function () {
    var currentCount;
    browser.get('/');

    element.all(by.repeater('item in items')).count().then(function (count) {
      currentCount = count;
    });

    element(by.model('name')).sendKeys('jacksparrow');
    element(by.model('price')).sendKeys('122');

    element(by.css('button')).click();

    element.all(by.repeater('item in items')).count().then(function (count) {
      assert.equal(count, currentCount);
    });
  });

  it('should not accept numbers that use a . but have more than 2 numbers behind the dot', function () {
    var currentCount;
    browser.get('/');

    element.all(by.repeater('item in items')).count().then(function (count) {
      currentCount = count;
    });

    element(by.model('name')).sendKeys('jacksparrow');
    element(by.model('price')).sendKeys('122.123');

    element(by.css('button')).click();

    element.all(by.repeater('item in items')).count().then(function (count) {
      assert.equal(count, currentCount);
    });
  });
});
