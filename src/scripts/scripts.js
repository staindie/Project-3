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

                    //$scope.chartObject.chart = {
                    //    "caption": "Revenue",
                    //    "xAxisName": "Year",
                    //    "yAxisName": "Revenues (In USD)",
                    //    "theme": "fint"
                    //};

                    var createChart = function(){
                        FusionCharts.ready(function(){
                            var revenueChart = new FusionCharts({
                                "type": "mscolumn3d",
                                "renderAt": $scope.containerName,
                                "width": "500",
                                "height": "300",
                                "dataFormat": "json",
                                "dataSource": $scope.chartObject
                            });
                            revenueChart.render();
                        });
                    };

                    $scope.$watch('chartObject', function(){
                        console.log($scope.chartObject);
                        createChart();
                    }, true);
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
            columns: [{name:"Year", expand: true} ],
            rows: [{name: "Category", expand: true}],
            measures: [{name: 'Sum2'}, {name: 'Sum3'}],
            data: $scope.dataObject,
            schema: {
                cube: {
                    dimensions: {
                        Year: {caption: "All years", expand: true},
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
        };

        $scope.getChartObject = function() {
            var rowNamesArray = [];
            var allHeadersNamesArray = [];
            var category = [];
            var dataSet = [];
            var resultObj = {};

            $.each($('.k-grid.k-widget.k-alt tbody td:last-child span'), function (index, item) {
                rowNamesArray.push(item.innerHTML);
            });

            $.each($('.k-grid-header-wrap tr:nth-child(2) th'), function (index, item) {
                var colspan = $(item).attr('colspan');
                var upperText = $(item).find('span').html();
                for (var i=1; i<=colspan; i++){
                    var lowerText = upperText + ' ' + $('.k-grid-header-wrap tr:nth-child(3) th:nth-child('+i+') span').html();
                    allHeadersNamesArray.push(lowerText);
                }
            });

            rowNamesArray.forEach( function(item, index) {
                dataSet.push({seriesname: item, data:[]});
            });

            allHeadersNamesArray.forEach( function(item,index){
                category.push({label: item});
                rowNamesArray.forEach( function(item, index){
                    dataSet[index].data.push(100);
                });
            });

            resultObj = {categories: [category], dataSet: dataSet};
            return resultObj;
        };

        $scope.dataObject = $scope.getChartObject();

    }]);

})();