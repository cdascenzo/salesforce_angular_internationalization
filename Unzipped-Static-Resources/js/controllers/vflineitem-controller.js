/* storeApp Controller that makes a javascript remoting call to a remote action in an apex controller to return the 
line items of an invoice statement.  The invoice statement id is passed into the remoting call.  the resulting array
of records is stored in a scope varibale for use in the HTML page.  Currency conversion is done in the apex controller. */


storeApp.controller('VFLineItemController',['$scope', '$rootScope','storeSERVICES',  function($scope, $rootScope, storeSERVICES) {
    $scope.predicate = 'price';
    $scope.reverse = true;
    $scope.hideScript = false;
    $scope.items = [];
    $scope.invoiceId = "";


    //preform the remote action call.  store results in the items scope variable
    //for use in html page.  
    $scope.loadData = function(id){

        storeSERVICES.getAllItems(id, function(data) {

                $scope.items = data;
                $scope.$apply($scope.items);

                console.log($scope.items);
            });
    }

    //get the values of the invoice from $rootScope and save to local scope for use.
    //These will be displayed in the HTML page
    $scope.init = function(){
        $scope.invoiceId = $rootScope.invoiceId;
        $scope.invoiceDesc = $rootScope.invoiceDesc;
        $scope.invoiceStatus = $rootScope.invoiceStatus;
        $scope.invoiceDate = $rootScope.invoiceDate;


    	$scope.loadData($scope.invoiceId);

    }

    $scope.init();


  }]);
