/* storeApp controller that receives an array of invoice objects from the Visualforce page.  This array contains parsed 
<apex:outputField> values so the internationalization is handled by the Visualforce component  */

storeApp.controller('VFOrderController',['$scope', '$rootScope','storeSERVICES', 'tmhDynamicLocale', '$window', function($scope, $rootScope, storeSERVICES, tmhDynamicLocale, $window) {
    $scope.orders = [];
    $scope.predicate = 'CreatedDate';
    $scope.reverse = true;
    $scope.hideScript = false;
    $scope.vfinvoices = [];

    //receive an array of invoices from Visualforce and store the array as a $scope variable to be used in HTML
    $scope.init = function(vfinvoices){
    	
        $scope.vfinvoices = $window.vfinvoices;
    }

    
    //set $rootScope variables of the selected invoice to pass to the lineItems controller where the line items
    //are retrieved.
    $scope.setItems = function(id, desc, status, cd){

        $rootScope.invoiceId = id;
        $rootScope.invoiceDesc = desc;
        $rootScope.invoiceStatus = status;
        $rootScope.invoiceDate = cd;


    }


  }]);
