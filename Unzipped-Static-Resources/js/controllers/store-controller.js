/* storeApp controller that makes a remote action call to an apex controller to return user profile information from salesforce
and stores it to rootScope variables.  The controller then creates a Javascript Remote object based on the Merchandise__c
object in salesforce to populate the storefront html */

storeApp.controller('StoreController',['$scope', 'storeSERVICES', '$rootScope', 'tmhDynamicLocale', function($scope, storeSERVICES, $rootScope, tmhDynamicLocale) {
    $scope.products = [];
    $scope.loaded = true;
    $scope.userCurrency = "";
    $scope.predicate = 'id';
    $scope.reverse = true;


    //retrieve user profile info from salesforce and store in rootscope variables.
    //this is done using a remote action call in the apex controller
    $scope.loadData = function(){

        if ($scope.loaded){

            storeSERVICES.getUserInfo(function(data) {
                $rootScope.userId = data.userid;
                $rootScope.userAnLocale = data.anlocale; 
                $rootScope.userSfLocale = data.sflocale;
                $rootScope.userCurrency = data.money;
                $rootScope.userLanguage = data.language;
                $rootScope.userTimeZone = data.timezone;
                $scope.userCurrency = $rootScope.userCurrency;
                            
                $rootScope.$apply($rootScope.userId);
                $rootScope.$apply($rootScope.userAnLocale); 
                $rootScope.$apply($rootScope.userSfLocale);
                $rootScope.$apply($rootScope.userCurrency); 
                $rootScope.$apply($rootScope.userLanguage); 
                $rootScope.$apply($rootScope.userTimeZone); 
                $scope.$apply($scope.userCurrency);

                //set the i18n file path based on the user's locale in sfdc
                tmhDynamicLocale.set($rootScope.userAnLocale);
                $scope.loaded = false;

            });
        }

        if($scope.products.length > 0) {
        	return;
        } else {
        	
            //create remote object of merchandise and return to html in a scope variable
        	storeSERVICES.getAllProducts(function(data) {

        		$scope.products = data;
        		$scope.isLoading = false;
        		$scope.$apply($scope.products);
        		$scope.$apply($scope.isLoading);
        	});
        }
    
    }

    $scope.init = function(){

    	$scope.loadData();
        
    }


    $scope.init();

  }]);
