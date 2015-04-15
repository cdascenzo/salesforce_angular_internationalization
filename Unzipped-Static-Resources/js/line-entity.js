/* Helper class that parses the json objects that are returned from both remote actions and remote objects in salesforce */


var LineEntity = function() {
	
};

LineEntity.fromVFPage = function(Id, Status__c, Name, CreatedDate, CreatedById, Description__c) {
	var entity = new LineEntity();
	//outputFields return a bunch of garbage that need to be parsed out
	var spannedDate = CreatedDate.slice(CreatedDate.indexOf(">")+1,CreatedDate.lastIndexOf("<"));
	//string dates need to be parsed back into a DateTime 
	var miliDate = Date.parse(spannedDate);

	entity.Id = Id;
	entity.Status__c = Status__c;
	entity.Name = Name;
	entity.CreatedById = CreatedById;
	entity.CreatedDate = miliDate;
	entity.Description__c = Description__c;

	return entity;
};

LineEntity.fromRemoteObjectModel = function(model){
	var entity = new LineEntity();

    //The .get method is built into Remote objects
	entity.id = model.get('Id');
	entity.invoice = model.get('Invoice_Statement__c');
	entity.name = model.get('Name');
	entity.units = model.get('Units_Sold__c');
	entity.unitPrice = model.get('Unit_Price__c');
	entity.productTotal = model.get('Total_Per_Product__c');

	return entity;
}
