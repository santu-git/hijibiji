'use strict';

angular.module('angularPassportApp')
  .controller('BrandsCtrl', function ($scope, Brands, $location, $routeParams, $rootScope) {

    $scope.create = function() {
      var brand = new Brands({
        title: this.title,
      });
      brand.$save(function(response) {
        $location.path("brands/" + response._id);
      });

      this.title = "";
    };

    $scope.remove = function(brand) {
      brand.$remove();

      for (var i in $scope.brands) {
        if ($scope.brands[i] == brand) {
          $scope.brands.splice(i, 1);
        }
      }
    };

    $scope.update = function() {
      var brand = $scope.brand;
      brand.$update(function() {
        $location.path('brands/' + brand._id);
      });
    };

    $scope.find = function() {
      Brands.query(function(brands) {
        $scope.brands = brands;
      });
    };

    $scope.findOne = function() {

      Brands.get({
        brandId: $routeParams.brandId
      }, function(brand) {
        $scope.brand = brand;
        currentUser.active_brand = brandId
      });
    };
  });
