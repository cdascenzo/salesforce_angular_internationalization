/* This is the controller for the StoreFront that makes a javascript remoting call to an Apex Controller using a remote action.
In our storeApp.storeServices javascript file we have a method called getAllMerchandise which handles the call back from the
remote action and saves the array of results to $scope so we can use it in our html page. */

storeApp.controller('ApexStoreController',['$scope', 'storeSERVICES', '$rootScope', 'tmhDynamicLocale', function($scope, storeSERVICES, $rootScope, tmhDynamicLocale) {
    $scope.merchandise = [];
    $scope.predicate = 'Name';
    $scope.reverse = true;


    $scope.loadData = function(){

        if($scope.merchandise.length > 0) {
        	return;
        } else {
        	
            //method gets the results of the javascript remoting call and saves the array of results to a $scope variable 
            //called merchandise to be used in an ng-repeat on the html page
        	storeSERVICES.getAllMerchandise(function(data) {  

        		$scope.merchandise = data;
        		$scope.$apply($scope.merchandise);

        	});
        }
    
    }

    $scope.init = function(){

    	$scope.loadData();
        
    }


    $scope.init();

  }]);
