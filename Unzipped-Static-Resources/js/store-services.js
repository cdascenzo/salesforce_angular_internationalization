/* Angular Services file to handle function calls.  All the Remote Object calls or Remote Actions calls back to salesforce
are done in this file */

storeApp.service('storeSERVICES',['$rootScope', function($rootScope){
         return{
            //creates a Remote Object of Merchandise__c results
            getAllProducts : function(callback){
             	var data = new SObjectModel.merchandise();
               // var whereOb = { where : {OwnerId : {eq:uId}}};

               var merc = [];
               
                data.retrieve({},function(err, records){
                    //if failure
                    if(err) alert(err.message);
                    else {
                        records.forEach(function(record){
                            //passes the record to the helper class to parse the json object
                            var entity = ProductEntity.fromRemoteObjectModel(record);
                            merc.push(entity);
                        });
                        
                        callback(merc);       
                    }
                });
            },

            //Calls a @remoteAction in an Apex Controller to return formatted Invoice_Statement__c results
            getAllOrders : function(callback){

                var inv = [];

                Visualforce.remoting.Manager.invokeAction(staticItems['getAllOrders'], function(results, event){
                    if( event.status ) {
                        results.forEach(function(result){
                            //passes each record to a helper class to parse the json object
                            var entity = InvoiceEntity.fromApexController(result);
                            inv.push(entity);
                        });

                        callback(inv);
                    } 
                    else {
                        alert('error');
                    }
                });
            },

            //Creates a Remote Object based on the Invoice_Statement__c object in salesforce
            getAllInvoices : function(callback){
                var data = new SObjectModel.invoice();
                var uId = $rootScope.userId;
                uId = uId.slice(uId.indexOf('U')+1);
                var whereOb = { where: { CreatedById: {eq: uId}}, orderby: [ {CreatedDate: 'DESC'}]};

               var inv = [];
               
                data.retrieve(whereOb,function(err, records){
                    //if failure
                    if(err) alert(err.message);
                    else {
                        records.forEach(function(record){
                            var entity = InvoiceEntity.fromRemoteObjectModel($rootScope.userTimeZone, record);
                            inv.push(entity);
                        });
                        
                        callback(inv);       
                    }
                });
            },

            //Creates a Remote Object based on the Line_Item__c object in salesforce with only the records
            //associated with the pased in invoice statement
            getLineItems : function(iId, callback){
                var data = new SObjectModel.line();
                var invoiceId = iId;
                var whereOb = { where: { Invoice_Statement__c: {eq: invoiceId}}};
                //var sObjectType = "";

               var inv = [];
               
                data.retrieve(whereOb,function(err, records){
                    //if failure
                    if(err) alert(err.message);
                    else {
                        //sObjectType = records.type;
                        records.forEach(function(record){
                            var entity = LineEntity.fromRemoteObjectModel(record);
                            inv.push(entity);
                        });
                        
                        callback(inv);       
                    }
                });
            },

            //calls a @remoteAction within an Apex Controller to return User Profile information
            getUserInfo : function(callback){

                 Visualforce.remoting.Manager.invokeAction(staticItems['getUserProfile'], function(result, event){
                    if( event.status ) {
                        callback(result);
                    } 
                    else {
                        alert('error');
                    }
                });

            },

            //calls a @remoteAction within an Apex Controller to return a formatted list of all the merchandise records
            getAllMerchandise : function(callback){

                 Visualforce.remoting.Manager.invokeAction(staticItems['getAllMerchandise'], function(result, event){
                    if( event.status ) {
                        callback(result);
                    } 
                    else {
                        alert('error');
                    }
                });

            },

            //calls a @remoteAction to get a list of formatted Line_Item__c records based on the passed in invoice
            getAllItems : function(invoiceId,callback){

                 Visualforce.remoting.Manager.invokeAction(staticItems['getLineItems'],invoiceId, function(result, event){
                    if( event.status ) {
                        callback(result);
                    } 
                    else {
                        alert('error');
                    }
                });

            }
         }
}]);

