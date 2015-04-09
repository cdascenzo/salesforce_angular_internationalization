global with sharing class StoreFrontControllerRM {

   //List<Line_Item__c> lineItems{get;set;}
   
   
        //save shopping cart
    @remoteAction
    global static String saveCart(List<Shopping_Cart__c> shoppingCart, Decimal tax, Decimal shipping) {
            Savepoint sp = Database.setSavepoint();
            String cid = '';
            try{
                
                DateTime dt = DateTime.now();
                String MId = dt.format();
                String CurrentUserId = userinfo.getuserid();
                MId = MId + CurrentUserId;
                Invoice_Statement__c ic = new Invoice_Statement__c(Description__c = 'test', Status__c = 'Open', Master_ID__c = MId);
                upsert(ic);
                cid = ic.Id;
                for(Shopping_Cart__c shop : shoppingCart) { 
                    Line_Item__c line = new Line_Item__c(Name = shop.Name, Merchandise__c = shop.Product__c, Total_Per_Product__c = shop.Total_Per_Product__c,
                                            Unit_Price__c = shop.Price__c, Units_Sold__c = shop.QtyToBuy__c, Invoice_Statement__c=ic.Id);
                    upsert(line);                        
                }
                
                
            } catch (DMLException e) {
                 ApexPages.addMessages(e);
                 Database.rollback(sp);
                 return '0';
            }
            
           return cid; 
    }
    

    @remoteAction
    public static List<Line_Item__c> getLineItems(String id) {

            List<Line_Item__c> lineItems = new List<Line_Item__c>();
            //List<FormattedInvoices> fm = new List<FormattedInvoices>();
            for(Line_Item__c item : [
                    SELECT Id, Name, convertCurrency(Unit_Price__c), Units_Sold__c,convertCurrency(Total_Per_Product__c)  
                    FROM Line_Item__c WHERE Invoice_Statement__c =:id ORDER BY CreatedDate DESC]) {
                
                lineItems.add(item);
            }
     
        return lineItems;
    }
    
    @remoteAction
    public static List<Merchandise__c> getAllMerchandise() {

            List<Merchandise__c> products = new List<Merchandise__c>();
            for(Merchandise__c item : [
                    SELECT Id, Name, Description__c, Total_Inventory__c,convertCurrency(Price__c)  
                    FROM Merchandise__c ORDER BY Name ASC]) {
                
                products.add(item);
            }
     
        return products;
    }
    
    @remoteAction
    public static List<FormattedInvoice> getAllOrders() {

            List<FormattedInvoice> invoices = new List<FormattedInvoice>();
            //List<FormattedInvoices> fm = new List<FormattedInvoices>();
            for(Invoice_Statement__c item : [
                    SELECT Id, Name, Description__c, Status__c,CreatedDate, CreatedById  
                    FROM Invoice_Statement__c ORDER BY CreatedDate DESC]) {
                
                FormattedInvoice fm = new FormattedInvoice(item.Id, item.Name, item.Description__c,
                    item.Status__c, item.CreatedDate, item.CreatedById);
                
                invoices.add(fm);
            }
     
        return invoices;
    }
    
    public class FormattedInvoice {
    
        public String id{get;set;}
        public String name{get;set;}
        public String description{get;set;}
        public String status{get;set;}
        public DateTime createdDate{get;set;}
        public String formattedDate{get;set;}
        public String createdBy{get;set;}
        
        public FormattedInvoice(String id, String name, String description, String status, DateTime createdDate, String createdBy){
            this.id = id;
            this.name = name;
            this.description = description;
            this.status = status;
            this.createdDate = createdDate;
            this.formattedDate = createdDate.format();
            this.createdBy = createdBy;
        }
    }
    
    @remoteAction
    public static UserProfile getUserProfile() {
    
        String userid = 'U' + userInfo.getUserId();
        String sflocale = userInfo.getLocale();
        String anlocale = sflocale.toLowerCase();
        anlocale = anlocale.replace('_','-');
        String money = userInfo.getDefaultCurrency();
        String language = userInfo.getLanguage();
        TimeZone tz = userInfo.getTimezone();
        String timezone = tz.toString();
    
        UserProfile userp = new UserProfile(userid, sflocale, anlocale, money, language, timezone);
        
        return userp;
    }
        
        
    
    public class UserProfile {
    
        public String userid{get;set;}
        public String sflocale{get;set;}
        public String anlocale{get;set;}
        public String money{get;set;}
        public String language{get;set;}
        public String timezone{get;set;}
        
        public UserProfile (String userid, String sflocale, String anlocale, String money, String language, String timezone) {
              this.userid = userid;
              this.sflocale = sflocale;
              this.anlocale = anlocale;
              this.money = money;
              this.language = language;
              this.timezone = timezone;
        }
     }
 }
