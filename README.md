# salesforce_angular_internationalization
Shopping Cart Demo using an angularJS front-end on salesforce.  JavaScript remoting, JavaScript Remote Objects, and salesforce stylesheets were used.  Internationalization was also explored.

Important notes: 

* Multi-Currency is enabled in the salesforce org
* Salesforce translation workbench was leveraged for providing language translations (mex-spanish, french)

## angularJS modules
  
* ngCart: provided shopping cart capabilities. https://github.com/snapjay/ngcart
* angular dynamic locale: leverage angular i18n files for locale. https://github.com/lgalfaso/angular-dynamic-locale
* angularUI Router: URL routing for partials. https://github.com/angular-ui/ui-router

## JavaScript Libraries

* momentJS: date/time conversions and timezones. http://momentjs.com
* jquery: used to allow script tags in angular. https://jquery.com

## Demo JavaScript files

* app.js: defines the routing structure of the pages, sets the locale, and creates a timezone filter
* Controllers - there is one for each partial page
  * store-controller: controller for the Angular Home Visualforce page.
  * vfstore-controller: controller for the Visualforce Home page.
  * apexstore-controller: controller for the Apex Home Visualforce page.
  * order-controller: controller for the Angular Orders Visualforce page.
  * vforder-controller: controller for the Visualforce Orders page.
  * apexorder-controller: controller for the Apex Orders page.
  * vflineitem-controller: controller used by the vfLineItems Visualforce to get line items for an order.
  * lineitem-controller: controller used by the LineItems Visualforce page to retrieve line items for an order.
  * cart-controller: controller used by the Cart Visualforce page to retrieve the shopping cart.
* Services
  * store-services: contains the services that perform the integrations with salesforce.
    * one exception - the service that saves cart information back to salesforce is in the ngCart module
* Helper Classes
  * product-entity: used to structure the product results back from salesforce into objects that could be used throughout the app
  * invoice-entity: used to structure the order results back from salesforce into objects that could be used throughout the app
  * line-entity: used to structure the line item results back from salesforce into objects that could be used throughout the app

## Navigation within the app
Navigation is available to all the pages in the left side bar of the app.  It is broken up into three sections:

* Storefront
* Orders
* Shopping Cart
  
### Storefront
The Storefront page was built three different ways (all three look the same) to compare performance and to show different ways of performing internationalization. All pages below are Visualforce pages. 
  
* Angular Home (default page): Uses JavaScript Remote Objects to access data from salesforce.  Leverages angularJS modules to perform internationalization.
* Visualforce Home: Uses JavaScript Remote Objects to access data from salesforce.  Leverages visualforce outputField tags to perform internationalization.
* Apex Home: Uses JavaScript Remoting to access data from salesforce. Leverages Apex in the controller to perform internationalization.
  
### Orders
Orders are structured similar to the different storefronts.

* Angular Orders: Uses JavaScript Remote Objects to access data from salesforce.  Leverages angularJS modules to perform internationalization.
  * Click on the rectangle to the left of the order to drill in to see the line items of the order
* Visualforce Orders: Uses JavaScript Remote Objects to access data from salesforce.  Leverages visualforce <outputField> tags to perform internationalization.
* Apex Orders: Uses JavaScript Remoting to access data from salesforce. Leverages Apex in the controller to perform internationalization.

### Shopping Cart
The Shopping Cart works with any storefront so there is only one version of it.
