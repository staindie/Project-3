$(document).ready(function () {

    //chartObject.chart = {
    //    "caption": "Revenue",
    //    "xAxisName": "Year",
    //    "yAxisName": "Revenues (In USD)",
    //    "theme": "fint"
    //};

    //var chartObject = {
    //    "categories": [
    //        {
    //            "category": [{"label": "Jan"}, {"label": "Feb"}, {"label": "Mar"}, {"label": "Apr"}, {"label": "May"}, {"label": "Jun"}, {"label": "Jul"}, {"label": "Aug"}, {"label": "Sep"}, {"label": "Oct"}, {"label": "Nov"}, {"label": "Dec"}]
    //        }
    //    ],
    //    "dataset": [
    //        {
    //            "seriesname": "2015",
    //            "data": [{"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}]
    //        },
    //        {
    //            "seriesname": "2014",
    //            "data": [{"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}]
    //        },
    //        {
    //            "seriesname": "2013",
    //            "data": [{"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}, {"value": "12200"}]
    //        }
    //    ]
    //};
    //
    //var createChart = function () {
    //
    //    console.log(chartObject);
    //    console.log($scope.chartObject);
    //
    //    FusionCharts.ready(function () {
    //        var revenueChart = new FusionCharts({
    //            "type": "mscolumn3d",
    //            "renderAt": $scope.containerName,
    //            "width": "80%",
    //            "height": "500",
    //            "dataFormat": "json",
    //            //"dataSource": chartObject
    //            "dataSource": $scope.chartObject
    //        });
    //        revenueChart.render();
    //    });
    //};
    //
    //createChart();


    var dataObject = [
        {"Year": "2010", "value": 42, "value2": 15, Category: "Beverages"},
        {"Year": "2010", "value": 42, "value2": 2, Category: "Food"},
        {"Year": "2011", "value": 81, "value2": 3, Category: "Neverages"},
        {"Year": "2012", "value": 72, "value2": 4, Category: "Beverages"},
        {"Year": "2013", "value": 55, "value2": 6, Category: "Neverages"},
        {"Year": "2014", "value": 91, "value2": 7, Category: "Food"},
        {"Year": "2015", "value": 51, "value2": 8, Category: "Neverages"}
    ];

    var dataSource = new kendo.data.PivotDataSource({
        columns: [{name: "Year", expand: true}],
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

    var options = {
        columnWidth: 200,
        height: 580,
        dataSource: $scope.dataSource,
        dataBound: function (e) {
            $scope.getChartObject();
        }
    };

    var getChartObject = function () {
        var rowNamesArray = [];
        var allHeadersNamesArray = [];
        var category = [];
        var dataSet = [];

        $.each($('.k-grid.k-widget.k-alt tbody td:last-child span'), function (index, item) {
            rowNamesArray.push(item.innerHTML);
        });

        $.each($('.k-grid-header-wrap tr:nth-child(2) th'), function (index, item) {
            var colspan = $(item).attr('colspan');
            var upperText = $(item).find('span').html();
            for (var i = 1; i <= colspan; i++) {
                var lowerText = upperText + ' ' + $('.k-grid-header-wrap tr:nth-child(3) th:nth-child(' + i + ') span').html();
                allHeadersNamesArray.push(lowerText);
            }
        });

        rowNamesArray.forEach(function (item, index) {
            dataSet.push({seriesname: item, data: []});
        });

        allHeadersNamesArray.forEach(function (item, index_col) {
            category.push({label: item});
            rowNamesArray.forEach(function (item, index_row) {
                var val = $('.k-grid-content tr:nth-child(' + (index_row + 1) + ') td:nth-child(' + (index_col + 1) + ') ').html();
                console.log(val);
                dataSet[index_row].data.push({value: val});
            });
        });

        dataObject = {categories: [{category: category}], dataset: dataSet};
    };

});