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
                            "type": "mscolumn3d",
                            "renderAt": $scope.containerName,
                            "width": "500",
                            "height": "300",
                            "dataFormat": "json",
                            "dataSource": {
                                "chart": {
                                    "caption": "Revenue",
                                    "xAxisName": "Year",
                                    "yAxisName": "Revenues (In USD)",
                                    "theme": "fint"
                                },
                                "categories": [
                                    {
                                        "category": [
                                            {
                                                "label": "Quarter 1"
                                            },
                                            {
                                                "label": "Quarter 2"
                                            },
                                            {
                                                "label": "Quarter 3"
                                            },
                                            {
                                                "label": "Quarter 4"
                                            }
                                        ]
                                    }
                                ],
                                "dataset": [
                                    {
                                        "seriesname": "Fixed Cost",
                                        "data": [
                                            {
                                                "value": "235000"
                                            },
                                            {
                                                "value": "225100"
                                            },
                                            {
                                                "value": "222000"
                                            },
                                            {
                                                "value": "230500"
                                            }
                                        ]
                                    },
                                    {
                                        "seriesname": "Variable Cost",
                                        "data": [
                                            {
                                                "value": "230000"
                                            },
                                            {
                                                "value": "143000"
                                            },
                                            {
                                                "value": "198000"
                                            },
                                            {
                                                "value": "327600"
                                            }
                                        ]
                                    }
                                ]
                            }
                        });

                        revenueChart.render();
                    })
                }
            };
        });



    app.controller('MainController',['$scope', function ($scope) {

        $scope.dataObject = [
            {"Year": "2010", "value": 42, "value2": 15, Category: "Beverages"},
            {"Year": "2010", "value": 42, "value2": 2, Category: "Food"},
            {"Year": "2011", "value": 81, "value2": 3, Category: "Neverages"},
            {"Year": "2012", "value": 72, "value2": 4, Category: "Beverages"},
            {"Year": "2013", "value": 55, "value2": 6, Category: "Neverages"},
            {"Year": "2014", "value": 91, "value2": 7, Category: "Food"},
            {"Year": "2015", "value": 51, "value2": 8, Category: "Neverages"}
        ];

        $scope.dataSource = new kendo.data.PivotDataSource({
            columns: ["Year" ],
            rows: [{name: "Category", expand: true}],
            measures: [{name: 'Sum2'}, {name: 'Sum3'}],
            data: $scope.dataObject,
            schema: {
                cube: {
                    dimensions: {
                        Year: {caption: "All years"},
                        Category: {caption: "All Categories"}
                    },
                    measures: {
                        "Sum": {
                            field: "value",
                            format: "{0:c}",
                            aggregate: "sum"
                        },
                        "Sum2": {
                            field: "value2",
                            format: "{0:n}",
                            aggregate: "sum"
                        },
                        "Sum3": {
                            field: "value2*1/20",
                            format: "{0:p}",
                            aggregate: "average"
                        }
                    }
                }
            }
        });

        $scope.options = {
            columnWidth: 200,
            height: 580,
            dataSource: $scope.dataSource
        };

        $scope.showScope = function() {
            console.log($scope);
        }

        $scope.getChartObject = function() {
            var rowNamesArray = [];
            var upperHeadersNamesArray = [];
            var lowerHeadersNamesArray = [];
            $.each($('.k-grid.k-widget.k-alt tbody td:nth-child(2) span'), function (index, item) {
                rowNamesArray.push(item.innerHTML);
            });
            $.each($('.k-grid-header-wrap tr:nth-child(2) span'), function (index, item) {
                upperHeadersNamesArray.push(item.innerHTML);
            });
            $.each($('.k-grid-header-wrap tr:nth-child(3) span'), function (index, item) {
                if (lowerHeadersNamesArray.indexOf(item.innerHTML) == -1){
                    lowerHeadersNamesArray.push(item.innerHTML);
                }
            });
            console.log(lowerHeadersNamesArray);
        }

    }]);

})();