trigger updateMerchandiseInv on Line_Item__c (after insert) {
    
    Set<ID> setMerIDs = new Set<ID>();
    Decimal qtyToBuy = 0;
    for(Line_Item__c li : Trigger.new){
        setMerIDs.add(li.Merchandise__c);
        qtyToBuy = li.Units_Sold__c;
    }
    
    List<Merchandise__c> mercs = [Select ID, Total_Inventory__c  From Merchandise__c WHERE Id IN :setMerIDs];
    for(Merchandise__c m : mercs){
        m.Total_Inventory__c = m.Total_Inventory__c - qtyToBuy;

    }
    update mercs;

}
