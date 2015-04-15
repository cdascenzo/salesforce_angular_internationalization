/* Store the array of products generated in the Visualforce page from the <apex:outputField> into a scope variable
to be used in the rest of the application */

storeApp.controller('VFStoreController',['$scope', '$window', function($scope, $window) {

    $scope.vfproducts = [];



    $scope.init = function(){

        $scope.vfproducts = $window.vfproducts;

        
    }



  }]);
