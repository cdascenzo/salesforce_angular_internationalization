    <!--  Products Container  -->
    <div class="container">
        <div class="row ng-scope">
          <div class="col-md-12">
            <h1 class="ng-scope">
              Angular Demo Store 
            </h1>
            <div class="row ng-scope">
              <!--  Product Container  -->
              <div class="col-xs-4 ng-scope" ng-repeat="product in products" >
                  <div class="thumbnail">
                      <h3 class="ng-binding">{{product.name}}</h3>
                      
                      <p class="ng-binding">{{product.desc}}</p>

                      <h4 class="price ng-binding">{{product.price | currency}}</h4>
                      <div ng-controller="cartCtrl">
                          <ngcart-addtocart class="ng-isolate-scope" id="{{product.id}}" quantity-max="10" quantity="1" data="item"    name="{{product.name}}" price="{{product.price}}"> Add
                          </ngcart-addtocart>
                    </div>
                  </div>
              </div>
            </div> 
          </div>
        </div> 
    </div>
