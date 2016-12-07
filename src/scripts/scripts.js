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
                                    "xAxisName": "Year",
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
            {"ProductName": "2010", "value": 42, "value-2": 10, Category: "Beverages"},
            {"ProductName": "2010", "value": 42, "value-2": 20, Category: "Food"},
            {"ProductName": "2011", "value": 81, "value-2": 30, Category: "Neverages"},
            {"ProductName": "2012", "value": 72, "value-2": 40, Category: "Beverages"},
            {"ProductName": "2013", "value": 55, "value-2": 60, Category: "Neverages"},
            {"ProductName": "2014", "value": 91, "value-2": 70, Category: "Food"},
            {"ProductName": "2015", "value": 51, "value-2": 80, Category: "Neverages"}
        ];

        $scope.dataSource = new kendo.data.PivotDataSource({
            columns: ["ProductName" ],
            rows: ["Category"],
            measures: ["Sum"],
            data: $scope.chartObject,
            schema: {
                cube: {
                    dimensions: {
                        ProductName: {caption: "All Products"},
                        Category: {caption: "All Categories"}
                    },
                    measures: {
                        "Sum": {
                            field: "value",
                            format: "{0:c}",
                            aggregate: function (value, state, context) {
                                return (state.accumulator || 0) + value;
                            }
                        },
                        "Sum-2": {
                            field: "value-2",
                            format: "{0:c}",
                            aggregate: function (value, state, context) {
                                return (state.accumulator || 0) + value;
                            }
                        }
                    }
                }
            }
        });

        console.log($scope.dataSource);

        //$scope.dataSource = new kendo.data.PivotDataSource({
        //    type: "xmla",
        //    columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
        //    rows: [{ name: "[Geography].[City]" }],
        //    measures: ["[Measures].[Reseller Freight Cost]"],
        //    transport: {
        //        connection: {
        //            catalog: "Adventure Works DW 2008R2",
        //            cube: "Adventure Works"
        //        },
        //        read: "//demos.telerik.com/olap/msmdpump.dll"
        //    },
        //    schema: {
        //        type: "xmla"
        //    },
        //    error: function (e) {
        //        alert("error: " + kendo.stringify(e.errors[0]));
        //    }
        //});

        $scope.options = {
            columnWidth: 200,
            height: 580,
            dataSource: $scope.dataSource
        };


    }]);

})();