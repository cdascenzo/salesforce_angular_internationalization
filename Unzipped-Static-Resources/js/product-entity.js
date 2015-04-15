/* Helper class that parses the json objects that are returned from both remote actions and remote objects in salesforce */


var ProductEntity = function() {
	
};

ProductEntity.fromVFPage = function(Id, Price__c, Name, CreatedDate, Description__c) {
	var entity = new ProductEntity();
	//outputFields return a bunch of garbage that need to be parsed out
	var spannedDate = CreatedDate.slice(CreatedDate.indexOf(">")+1,CreatedDate.lastIndexOf("<"));
	var spannedPrice = Price__c.slice(Price__c.indexOf(">")+1,Price__c.lastIndexOf("<"));

	if (Price__c.indexOf(")") > 0) {
		spannedPrice = spannedPrice.slice(spannedPrice.indexOf("(")+1,spannedPrice.lastIndexOf(")"));
		spannedPrice = spannedPrice.slice(4);
	}
	else {
		spannedPrice = spannedPrice.slice(4);
	} 

	entity.id = Id;
	entity.price = spannedPrice;
	entity.name = Name;
	entity.CreatedDate = spannedDate;
	entity.desc = Description__c;

	return entity;
};

ProductEntity.fromRemoteObjectModel = function(model){
	var entity = new ProductEntity();

	//The .get method is built into Remote objects
	entity.id = model.get('Id');
	entity.quantity = model.get('Quantity__c');
	entity.name = model.get('Name');
	entity.inventory = model.get('Total_Inventory__c');
	entity.price = model.get('Price__c');
	entity.desc = model.get('Description__c');


	return entity;
}
