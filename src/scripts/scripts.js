(function () {
    var app = angular.module('myApp', ['ngDialog', 'kendo.directives']);

    app.controller('MainController',['$scope', function ($scope) {

        $scope.dataSource = new kendo.data.PivotDataSource({
            type: "xmla",
            columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
            rows: [{ name: "[Geography].[City]" }],
            measures: ["[Measures].[Reseller Freight Cost]"],
            transport: {
                connection: {
                    catalog: "Adventure Works DW 2008R2",
                    cube: "Adventure Works"
                },
                read: "//demos.telerik.com/olap/msmdpump.dll"
            },
            schema: {
                type: "xmla"
            },
            error: function (e) {
                alert("error: " + kendo.stringify(e.errors[0]));
            }
        });
        $scope.options = {
            columnWidth: 200,
            height: 580,
            dataSource: $scope.dataSource
        };

    }]);


})();