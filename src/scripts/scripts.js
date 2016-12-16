$(document).ready(function () {

    var dataObject = [
        {"Year": "2010", "value": 42, "value2": 15, Category: "Beverages", Type: "Type1"},
        {"Year": "2010", "value": 42, "value2": 2, Category: "Food", Type: "Type2"},
        {"Year": "2011", "value": 81, "value2": 3, Category: "Neverages", Type: "Type2"},
        {"Year": "2012", "value": 72, "value2": 4, Category: "Beverages", Type: "Type1"},
        {"Year": "2013", "value": 55, "value2": 6, Category: "Neverages", Type: "Type2"},
        {"Year": "2014", "value": 91, "value2": 7, Category: "Food", Type: "Type1"},
        {"Year": "2015", "value": 51, "value2": 8, Category: "Neverages", Type: "Type2"}
    ];

    var dataSource = new kendo.data.PivotDataSource({
        columns: [{name: "Year", expand: true}],
        rows: [{name: "Category", expand: true}, {name: "Type", expand: true}],
        measures: [{name: 'Sum2'}, {name: 'Sum3'}],
        data: dataObject,
        schema: {
            cube: {
                dimensions: {
                    Year: {caption: "All years", expand: true},
                    Category: {caption: "All Categories"},
                    Type: {caption: "All types"}
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

    var collapsed = {
        columns: [],
        rows: []
    };

    var pivotgrid = $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        //gather the collapsed members
        collapseMember: function(e) {
            var axis = collapsed[e.axis];
            var path = e.path;

            if (indexOfPath(path, axis) === -1) {
                axis.push(path);
            }
        },
        //gather the expanded members
        expandMember: function(e) {
            var axis = collapsed[e.axis];
            var index = indexOfPath(e.path, axis);

            if (index !== -1) {
                axis.splice(index, 1);
            }
        },
        columnWidth: 100,
        height: 630,
        dataSource: dataSource,
        dataBound: function() {
            //create/bind the chart widget
            initChart(convertData(this.dataSource, collapsed));
        }
    }).data("kendoPivotGrid");

    $("#configurator").kendoPivotConfigurator({
        dataSource: dataSource,
        filterable: true,
        sortable: true,
        columnWidth: '50%',
        height: 630
    });

    function initChart(data) {
        var chart = $("#chart").data("kendoChart");

        if (!chart) {
            $("#chart").kendoChart({
                dataSource: {
                    data: data,
                    group: "row"
                },
                series: [{
                    type: "column",
                    field: "measure",
                    name: "#= group.value # (category)",
                    categoryField: "column"
                }],
                legend: {
                    position: "bottom"
                },
                categoryAxis: {
                    labels: {
                        rotation: 310
                    }
                },
                valueAxis: {
                    labels: {
                        format: "${0}"
                    }
                },
                dataBound: function(e) {
                    var categoryAxis = e.sender.options.categoryAxis;
                    if (categoryAxis && categoryAxis.categories) {
                        categoryAxis.categories.sort();
                    }
                }
            });
        } else {
            chart.dataSource.data(data);
        }
    }
});