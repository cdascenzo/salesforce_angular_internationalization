/* This is the main app used in the single page app.  This JavaSCript file is responsible for declaring the app as storeApp.
In the .run, we are saving all the user specific variable to $rootScope as they could be called from any controller.
The .filter is creating a custom date filter to apply in HTML to date fields that leverage moment.js and moment-timezone to 
convert the date to the right timezone.  The .config is setting the path to look for i18n files - in this case we are leveraging
files published by the angular project.  We are also setting up the routing paths for our Visualforce or HTML partials.  */


  var storeApp = angular.module('storeApp', ['ngCart','ui.router', 'tmh.dynamicLocale']);

  storeApp.run(['$rootScope', function($rootScope){
    $rootScope.userSfLocale = "";
    $rootScope.userId = "";
    $rootScope.userAnLocale = "";
    $rootScope.userCurrency = "";
    $rootScope.userLanguage = "";
    $rootScope.userTimeZone = "";
    $rootScope.invoiceId = "";
        $rootScope.invoiceDesc = "";
        $rootScope.invoiceStatus = "";
        $rootScope.invoiceDate = "";

  }]);

  storeApp.filter('moment', ['$rootScope', function($rootScope) {
    return function(dateString, format) {
      var localTime = moment.tz(dateString, $rootScope.userTimeZone)
      return moment(localTime).format(format);
    };
  }]);

  storeApp.config(['$stateProvider','$urlRouterProvider','tmhDynamicLocaleProvider',function($stateProvider, $urlRouterProvider, tmhDynamicLocaleProvider) {
    
    /* Set the pattern that locale files follow */
    tmhDynamicLocaleProvider.localeLocationPattern('https://code.angularjs.org/1.2.20/i18n/angular-locale_{{locale}}.js');

    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: "/",
        views: {
          'main': {
            controller: 'StoreController',
            templateUrl: '/apex/main'}
        }
      })
      .state('vfhome', {
        url: "/vfhome",
        views: {
          'main': {
            controller: 'VFStoreController',
            templateUrl: '/apex/mainVF'}
        }
      })
      .state('apexhome', {
        url: "/apexhome",
        views: {
          'main': {
            controller: 'ApexStoreController',
            templateUrl: '/apex/mainApex'}
        }
      })
      .state('cart', {
        url: "/cart",
        views: {
          'main': {
            controller: 'cartCtrl',
            templateUrl: staticItems['cartHTML']}
        }
      })
      .state('vfcart', {
        url: "/vfcart",
        views: {
          'main': {
            controller: 'cartCtrl',
            templateUrl: '/apex/cartVF'}
        }
      })
      .state('vforder', {
        url: "/vforders",
        views: {
          'main': {
            controller: 'VFOrderController',
            templateUrl: '/apex/ordersVF'}
        }
      })
      .state('apexorder', {
        url: "/apexorders",
        views: {
          'main': {
            controller: 'ApexOrderController',
            templateUrl: '/apex/ordersApex'}
        }
      })
      .state('lineItems', {
        url: "/lineItems",
        views: {
          'main': {
            controller: 'LineItemController',
            templateUrl: '/apex/lineItems'}
        }
      })
      .state('vflineItems', {
        url: "/vflineItems",
        views: {
          'main': {
            controller: 'VFLineItemController',
            templateUrl: '/apex/lineItemsVF'}
        }
      })
      .state('order', {
        url: "/orders",
        views: {
          'main': {
            controller: 'OrderController',
            templateUrl: '/apex/orders'}
        }
      });
  }]);

