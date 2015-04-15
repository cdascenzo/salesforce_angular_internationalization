/* Initialize an ngCart instance of the cart module to be used in the app.  Set the default information for tax
and shipping costs.  Save the whole cart to scope to be used on any controller injected into. */

storeApp.controller('cartCtrl', ['ngCart', 'store', '$scope', function(ngCart, store, $scope) {
      ngCart.setTax(7.5);
      ngCart.setShipping(2.99);
      ngCart.setCID(0);
      $scope.orderId = 0;


      $scope.ngCart = ngCart;
      $scope.store = store;

      //writes the shopping cart items back to salesforce.  Creates an Invoice_Statement__c and Line_Item__c
      //records.  This is done through a remote action in the apex controller.  Returns the invoiceId from
      //the newly created record and displays that as the orderId
      $scope.checkOut = function(){
            var items = $scope.ngCart.getCart().items;
            var shipping = $scope.ngCart.getShipping();
            var tax = $scope.ngCart.getTax();
              
            //this remoting call is in the ngCart.js file - not in storeServices    
            $scope.store.saveCart(items, tax, shipping, function(record) {
                $scope.orderId = record;
                $scope.$apply($scope.orderId);
                $scope.$apply($scope.ngCart.empty()); 
            });

      }
  }]);
