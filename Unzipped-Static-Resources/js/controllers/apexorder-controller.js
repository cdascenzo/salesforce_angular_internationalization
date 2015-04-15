/* storeApp Controller that makes a javascript remoting call to a remote action within the apex controller.  The resulting array
is saved to a $scope variable to be used in an ng-repeat on the HTML page. */

storeApp.controller('ApexOrderController',['$scope', '$rootScope','storeSERVICES', function($scope, $rootScope, storeSERVICES) {
    $scope.bills = [];
    $scope.predicate = 'createdDate';
    $scope.reverse = true;
    $scope.invoiceId = "";
    $scope.invoiceDesc = "";
    $scope.invoiceStatus = "";
    $scope.invoiceDate = "";


    //makes the javascript remoting call that is in the storeApp Service javascript file called storeServices
    //resulting array is stored to $scope variable bills to be used in an ng-repeat in the html page
    //reference app.js to see which page this controller is tied to
    $scope.loadData = function(){
    	if($scope.bills.length > 0) {
    		return;
    	} else {
    		storeSERVICES.getAllOrders(function(data) {

    			$scope.bills = data;
    			$scope.$apply($scope.bills);
    		});
    	}
    }

    //sets the selected invoice from the page in $rooScope to pass to a remote object to get the line items in a different
    //controller
    $scope.setItems = function(id, desc, status, cd){

        $rootScope.invoiceId = id;
        $rootScope.invoiceDesc = desc;
        $rootScope.invoiceStatus = status;
        $rootScope.invoiceDate = cd;


    }

    $scope.init = function(){
    	$scope.loadData();

    }

    $scope.init();

  }]);
