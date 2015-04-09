# salesforce_angular_internationalization
Demo of using an angularJS front-end on salesforce.  JavaScript remoting, JavaScript Remote Objects, and salesforce stylesheets were used.  Internationalization was also explored.

Shopping Cart Demo leveraging several angularJS modules including:
  --

Navigation is available to all the pages in the left side bar of the app.  It is broken up into three sections:

-- Storefront

-- Orders

-- Shopping Cart
  
Storefront:  The Storefront page was built three different ways (all three look the same) to compare performance and to show different ways of performing internationalization.  
  -- Angular Home (default page): Uses JavaScript Remote Objects to access data from salesforce.  Leverages angularJS modules to perform internationalization.
  -- Visualforce Home: Uses JavaScript Remote Objects to access data from salesforce.  Leverages visualforce <outputField> tags to perform internationalization.
  -- Apex Home: Uses JavaScript Remoting to access data from salesforce. Leverages Apex in the controller to perform internationalization.
  

