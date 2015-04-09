# salesforce_angular_internationalization
Shopping Cart Demo using an angularJS front-end on salesforce.  JavaScript remoting, JavaScript Remote Objects, and salesforce stylesheets were used.  Internationalization was also explored.

## angularJS modules
  
* ngCart: provided shopping cart capabilities. https://github.com/snapjay/ngcart
* angular dynamic locale: leverage angular i18n files for locale. https://github.com/lgalfaso/angular-dynamic-locale
* angularUI Router: URL routing for partials. https://github.com/angular-ui/ui-router

## JavaScript Libraries

* momentJS: date/time conversions and timezones. http://momentjs.com
* jquery: used to allow <script> tags in angular. https://jquery.com

## Navigation within the app
Navigation is available to all the pages in the left side bar of the app.  It is broken up into three sections:

* Storefront
* Orders
* Shopping Cart
  
### Storefront
The Storefront page was built three different ways (all three look the same) to compare performance and to show different ways of performing internationalization.  
  
* Angular Home (default page): Uses JavaScript Remote Objects to access data from salesforce.  Leverages angularJS modules to perform internationalization.
* Visualforce Home: Uses JavaScript Remote Objects to access data from salesforce.  Leverages visualforce <outputField> tags to perform internationalization.
* Apex Home: Uses JavaScript Remoting to access data from salesforce. Leverages Apex in the controller to perform internationalization.
  
### Orders
Orders are structured similar to the different storefronts.

* Angular Orders: Uses JavaScript Remote Objects to access data from salesforce.  Leverages angularJS modules to perform internationalization.
  * Click on the rectangle to the left of the order to drill in to see the line items of the order
* Visualforce Orders: Uses JavaScript Remote Objects to access data from salesforce.  Leverages visualforce <outputField> tags to perform internationalization.
* Apex Orders: Uses JavaScript Remoting to access data from salesforce. Leverages Apex in the controller to perform internationalization.

### Shopping Cart
The Shopping Cart works with any storefront so there is only one version of it.
