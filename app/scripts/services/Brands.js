'use strict';

angular.module('angularPassportApp')
  .factory('Brands', function ($resource) {
    return $resource('api/brands/:brandId', {
      brandId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
