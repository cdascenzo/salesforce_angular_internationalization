/* Helper class that parses the json objects that are returned from both remote actions and remote objects in salesforce */

var InvoiceEntity = function() {
	
};

InvoiceEntity.fromVFPage = function(Id, Status__c, Name, CreatedDate, CreatedById, Description__c) {
	var entity = new InvoiceEntity();
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

InvoiceEntity.fromApexController = function(model) {
	var entity = new InvoiceEntity();
	var formattedDate = model.formattedDate;
	//String dates need to be parsed back into a DateTime
	var miliDate = Date.parse(formattedDate);

	entity.id = model.id;
	entity.status = model.status;
	entity.name = model.name;
	entity.createdById = model.createdBy;
	entity.createdDate = miliDate;
	entity.description = model.description;

	return entity;
};

InvoiceEntity.fromRemoteObjectModel = function(timezone1, model){
	var entity = new InvoiceEntity();

    //The .get method is built into Remote objects
	entity.Id = model.get('Id');
	entity.Status__c = model.get('Status__c');
	entity.Name = model.get('Name');
	entity.CreatedById = model.get('CreatedById');
	entity.CreatedDate = model.get('CreatedDate');
	entity.Description__c = model.get('Description__c');

	return entity;
};
