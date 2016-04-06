'use strict';

angular.module('angularPassportApp')
  .factory('Brands', function ($resource) {
    return $resource('api/brands/:brandId', {
      blogId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
