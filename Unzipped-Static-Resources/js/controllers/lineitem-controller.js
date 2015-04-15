/* storeApp Controller that receives the id of an ivoice and creates the Javascript Remote Object Line_Item__c with only 
the results associated with the invoiceId.  Returns that array of records and stores them in scope to be used in the HTML
page.  */

storeApp.controller('LineItemController',['$scope', '$rootScope','storeSERVICES',  function($scope, $rootScope, storeSERVICES) {

    $scope.predicate = 'price';
    $scope.reverse = true;
    $scope.items = [];
    $scope.invoiceId = "";


    //Create the Javascript Remote Object on the Line_Item__c object with just the line items
    //that belong to the invoice.  Save the results to scope
    $scope.loadData = function(id){

        storeSERVICES.getLineItems(id, function(data) {

                $scope.items = data;
                $scope.$apply($scope.items);

                console.log($scope.items);
            });
    }

    //retrieve the invoice information from $rootScope and save to local scope varibales to be
    //displayed in the HTML page
    $scope.init = function(){
        $scope.invoiceId = $rootScope.invoiceId;
        $scope.invoiceDesc = $rootScope.invoiceDesc;
        $scope.invoiceStatus = $rootScope.invoiceStatus;
        $scope.invoiceDate = $rootScope.invoiceDate;

    	$scope.loadData($scope.invoiceId);

    }

    $scope.init();


  }]);
