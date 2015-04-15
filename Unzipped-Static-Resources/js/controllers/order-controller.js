/* storeApp Controller that creates a JavaScript Remote Object based on the Invoice_Statement__c object in salesforce
Returns the results in an aray that is used in an n-repeat in the HTML page.  This is all done in angular with no 
visualforce controller required.  Internationalization is handled in moment js for timezone conversions. */

storeApp.controller('OrderController',['$scope', '$rootScope','storeSERVICES', function($scope, $rootScope, storeSERVICES) {
    $scope.orders = [];
    $scope.predicate = 'CreatedDate';
    $scope.reverse = true;
    $scope.invoiceId = "";
    $scope.invoiceDesc = "";
    $scope.invoiceStatus = "";
    $scope.invoiceDate = "";


    //returns an array of records from the Invoice_Statement__c object that was instantiated as a 
    //JavaScript Remote Object.  Results are stored to the $scope variable orders to be used in the HTML page
    //refer to app.js for the page this controller is used on.
    $scope.loadData = function(){
    	if($scope.orders.length > 0) {
    		return;
    	} else {
    		storeSERVICES.getAllInvoices(function(data) {

    			$scope.orders = data;
    			$scope.$apply($scope.orders);
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
