'use strict';


angular.module('ngCart.directives', [])

    .controller('CartController',['$scope', 'ngCart',function($scope, ngCart) {

        $scope.ngCart = ngCart;


    }])

    .directive('ngcartAddtocart', ['ngCart', function(ngCart){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {
                id:'@',
                name:'@',
                quantity:'@',
                quantityMax:'@',
                price:'@',
                data:'='
            },
            transclude: true,
            templateUrl: staticItems['addtocartHTML'],
            link:function(scope, element, attrs){
                scope.attrs = attrs;
                scope.inCart = function(){
                    return  ngCart.getItemById(attrs.id);
                };

                if (scope.inCart()){
                    scope.q = ngCart.getItemById(attrs.id).getQuantity();
                } else {
                    scope.q = parseInt(scope.quantity);
                }

                scope.qtyOpt =  [];
                for (var i = 1; i <= scope.quantityMax; i++) {
                    scope.qtyOpt.push(i);
                }

            }

        };
    }])

    .directive('ngcartCart', ['ngCart', function(ngCart){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            templateUrl: staticItems['cartHTML'],
            link:function(scope, element, attrs){

            }
        };
    }])

    .directive('ngcartSummary', ['ngCart', function(ngCart){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            transclude: true,
            templateUrl: staticItems['summaryHTML']
        };
    }]);

;'use strict';


angular.module('ngCart', ['ngCart.directives'])

    .config([function () {

    }])

    .provider('$ngCart', function () {

        var shipping = false;
        var tax = false;
        var cid = false;
        this.$get = function () {

        };

    })

    .run(['$rootScope', 'ngCart','ngCartItem', 'store', function ($rootScope, ngCart, ngCartItem, store) {

        $rootScope.$on('ngCart:change', function(){
            ngCart.$save();
        });

        if (angular.isObject(store.get('cart'))) {
            ngCart.$restore(store.get('cart'));

        } else {
            ngCart.init();
        }

    }])

    .service('ngCart', ['$rootScope', 'ngCartItem', 'store', function ($rootScope, ngCartItem, store) {

        this.init = function(){
            this.$cart = {
                shipping : null,
                tax : null,
                cid : 0,
                items : []
            };
        }

        this.addItem = function (id, name, price, quantity, data) {

            var inCart = this.getItemById(id);

            if (typeof inCart === 'object'){
                //Update quantity of an item if it's already in the cart
                inCart.setQuantity(quantity, false);
            } else {
                var newItem = new ngCartItem(id, name, price, quantity, data);
                this.$cart.items.push(newItem);
                $rootScope.$broadcast('ngCart:itemAdded', newItem);
            }

            $rootScope.$broadcast('ngCart:change', {});
        };


        this.getItemById = function (itemId) {
            var items = this.getCart().items;

            var build = false;
            angular.forEach(items, function (item) {
                if  (item.getId() === itemId) {
                    build = item;
                }
            });
            return build;
        }


        this.setShipping = function(shipping){
            this.$cart.shipping = shipping;
        }

        this.getShipping = function(){
            if (this.getCart().items.length == 0) return 0;
            return  this.getCart().shipping;
        }

        this.setTax = function(tax){
            this.$cart.tax = tax;
        }

        this.getTax = function(){
            return ((this.getSubTotal()/100) * this.getCart().tax );
        }

        this.setCart = function (cart) {
            this.$cart = cart;
        }

        this.getCart = function(){
            return this.$cart;
        }

        this.setCID = function (cid) {
            this.$cart.cid = cid;
        }

        this.getCID = function(){
            return this.$cart.cid;
        }

        this.getItems = function(){
            return this.getCart().items;
        }

        this.totalItems = function () {
            return this.getCart().items.length;
        }

        this.getTotalItems = function () {
            var count = 0;
            var items = this.getItems();
            angular.forEach(items, function (item) {
                count += item.getQuantity();
            });
            return count;
        };

        this.getTotalUniqueItems = function () {
            return this.getCart().items.length;
        };

        this.getSubTotal = function(){
            var total = 0;
            angular.forEach(this.getCart().items, function (item) {
                total += item.getTotal();
            });
            return total;
        }

        this.totalCost= function () {
            return this.getSubTotal() + this.getShipping() + this.getTax();
        }

        this.removeItem = function (index) {
            this.$cart.items.splice(index, 1);
            $rootScope.$broadcast('ngCart:itemRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});

        }

        this.removeItemById = function (id) {
            var cart = this.getCart();
            angular.forEach(cart.items, function (item, index) {
                if  (item.getId() === id) {
                    cart.items.splice(index, 1);
                }
            });
            this.setCart(cart);
            $rootScope.$broadcast('ngCart:itemRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});
        };

        this.empty = function () {
            this.$cart.items = [];
            localStorage.removeItem('cart');
        }

        this.toObject = function() {

            if (this.getItems().length === 0) return false;

            var items = [];
            angular.forEach(this.getItems(), function(item){
                items.push (item.toObject());
            });

            return {
                shipping: this.getShipping(),
                tax: this.getTax(),
                subTotal: this.getSubTotal(),
                cid: this.getCID(),
                totalCost: this.totalCost(),
                items:items
            }
        };


        this.$restore = function(storedCart){
            var _self = this;
            _self.init();
            _self.$cart.shipping = storedCart.shipping;
            _self.$cart.tax = storedCart.tax;

            angular.forEach(storedCart.items, function (item) {
                _self.$cart.items.push(new ngCartItem(item._id,  item._name, item._price, item._quantity, item._data));
            });
            this.$save();
        }

        this.$save = function () {
            return store.set('cart', JSON.stringify(this.getCart()));
        }

    }])

    .factory('ngCartItem', ['$rootScope', 'store', function ($rootScope, store) {

        var item = function (id, name, price, quantity, data) {
            this.setId(id);
            this.setMerchandise(id);
            this.setName(name);
            this.setPrice(price);
            this.setQuantity(quantity);
            this.setData(data);
        };


        item.prototype.setId = function(id){
            if (id)  this.Id = id;
            else {
                console.error('An ID must be provided');
            }
        }

        item.prototype.setMerchandise = function(id){
            if (id)  this.Product__c = id;
            else {
                console.error('An Merc must be provided');
            }
        }

        item.prototype.getId = function(){
            return this.Id;
        }

        item.prototype.getMerchandise = function(){
            return this.Product__c;
        }


        item.prototype.setName = function(name){
            if (name)  this.Name = name;
            else {
                console.error('A name must be provided');
            }
        }
        item.prototype.getName = function(){
            return this.Name;
        }

        item.prototype.setPrice = function(price){
            var price = parseFloat(price);
            if (price) {
                if (price <= 0) {
                    console.error('A price must be over 0');
                }
                this.Price__c = (price);
            } else {
                console.error('A price must be provided');
            }
        }
        item.prototype.getPrice = function(){
            return this.Price__c;
        }


        item.prototype.setQuantity = function(quantity, relative){


            var quantity = parseInt(quantity);
            if (quantity % 1 === 0){
                if (relative === true){
                    this.QtyToBuy__c  += quantity;
                } else {
                    this.QtyToBuy__c = quantity;
                }
                if (this.QtyToBuy__c < 1) this.QtyToBuy__c = 1;

            } else {
                this.QtyToBuy__c = 1;
                console.info('Quantity must be an integer and was defaulted to 1');
            }
            $rootScope.$broadcast('ngCart:change', {});

        }

        item.prototype.getQuantity = function(){
            return this.QtyToBuy__c;
        }

        item.prototype.setData = function(data){
            if (data) this._data = data;
        }

        item.prototype.getData = function(){
            if (this._data) return this._data;
            else console.info('This item has no data');
        }

        item.prototype.getTotal = function(){
            var total = this.getQuantity() * this.getPrice();
            this.Total_Per_Product__c = total;
            return this.Total_Per_Product__c;
        }


        return item;

    }])

    .service('store', ['$window', function ($window) {

        return {

            get: function (key) {
                if ($window.localStorage [key]) {
                    var cart = angular.fromJson($window.localStorage [key]);
                    return JSON.parse(cart);
                }
                return false;

            },


            set: function (key, val) {

                if (val === undefined) {
                    $window.localStorage .removeItem(key);
                } else {
                    $window.localStorage [key] = angular.toJson(val);
                }
                return $window.localStorage [key];
            },

            saveCart : function(items, tax, shipping, callback){
                 Visualforce.remoting.Manager.invokeAction(staticItems['saveCart'],items, tax, shipping, function(result, event){
                    if( event.status ) {
                        callback(result);
                    }
                });
            }
        }
    }])

    .controller('CartController',['$scope', 'ngCart', function($scope, ngCart) {
        $scope.ngCart = ngCart;

    }])

    .value('version', '0.0.1-rc.2');
