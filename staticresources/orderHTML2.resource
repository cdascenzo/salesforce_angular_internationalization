<div class="container">
    <div class="row ng-scope">
        <div class="col-md-12">
            <h1 class="ng-scope">
              Angular Demo Orders
            </h1>
            <div class="row ng-scope">
              <!--  Cart Container  -->
                
                <div class="table-responsive col-lg-12" >

                    <table class="table table-striped ngCart cart">

                        <thead>
                            <tr>
                                <th></th>
                                <th><a ng-click="predicate = 'id'; reverse = !reverse;">Order Id</a></th>
                                <th>Description</th>
                                <th><a ng-click="predicate = 'status'; reverse = !reverse;">Status</a></th>
                                <th><a ng-click="predicate = 'createdDate'; reverse = !reverse;">Created Date</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="order in orders | orderBy:predicate:reverse">
                                <td><span ng-click="getLineItems(order.id)" class="glyphicon glyphicon-remove"></span></td>
                                <td>{{ order.id }}</td>
                                <td>{{ order.desc }}</td>
                                <td>{{ order.status}}</td>
                                <td>{{ order.createdDate | date:'medium' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
    .ngCart.cart span[ng-click] {
        cursor: pointer;
    }
    .ngCart.cart .glyphicon.disabled {
        color:#aaa;
    }
</style>
