(function () {
    var app = angular.module('myApp', ['ngDialog', 'kendo.directives']);

    app.directive('createChart', function() {
            return {
                restrict: 'A',
                scope: {
                    chartObject: '=',
                    containerName: '@'
                },
                link: function($scope) {

                    FusionCharts.ready(function(){
                        var revenueChart = new FusionCharts({
                            "type": "column2d",
                            "renderAt": $scope.containerName,
                            "width": "500",
                            "height": "300",
                            "dataFormat": "json",
                            "dataSource": {
                                "chart": {
                                    "caption": "Monthly revenue for last year",
                                    "subCaption": "Harry's SuperMart",
                                    "xAxisName": "Month",
                                    "yAxisName": "Revenues (In USD)",
                                    "theme": "fint"
                                },
                                "data": $scope.chartObject
                            }
                        });

                        revenueChart.render();
                    })
                }
            };
        });



    app.controller('MainController',['$scope', function ($scope) {

        $scope.chartObject = [
            {"label": "Jan", "value": "420000"},
            {"label": "Feb", "value": "810000"},
            {"label": "Mar", "value": "720000"},
            {"label": "Apr", "value": "550000"},
            {"label": "May", "value": "910000"},
            {"label": "Jun", "value": "510000"},
            {"label": "Jul", "value": "680000"},
            {"label": "Aug", "value": "620000"},
            {"label": "Sep", "value": "610000"},
            {"label": "Oct", "value": "490000"},
            {"label": "Nov", "value": "900000"},
            {"label": "Dec", "value": "730000"}
        ];

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