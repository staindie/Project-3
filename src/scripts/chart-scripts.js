function flattenTree(tuples) {
    tuples = tuples.slice();
    var result = [];
    var tuple = tuples.shift();
    var idx, length, spliceIndex, children, member;

    while (tuple) {
        //required for multiple measures
        if(tuple.dataIndex !== undefined) {
            result.push(tuple);
        }

        spliceIndex = 0;
        for (idx = 0, length = tuple.members.length; idx < length; idx++) {
            member = tuple.members[idx];
            children = member.children;
            if (member.measure) {
                [].splice.apply(tuples, [0, 0].concat(expandMeasures(children, tuple)));
            } else {
                [].splice.apply(tuples, [spliceIndex, 0].concat(children));
            }
            spliceIndex += children.length;
        }

        tuple = tuples.shift();
    }

    return result;
}

function clone(tuple, dataIndex) {
    var members = tuple.members.slice();

    return {
        dataIndex: dataIndex,
        members: $.map(members, function(m) {
            return $.extend({}, m, { children: [] });
        })
    };
}

function replaceLastMember(tuple, member) {
    tuple.members[tuple.members.length - 1] = member;
    return tuple;
}

function expandMeasures(measures, tuple) {
    return $.map(measures, function(measure) {
        return replaceLastMember(clone(tuple, measure.dataIndex), measure);
    });
}

//Check whether the tuple has been collapsed
function isCollapsed(tuple, collapsed) {
    var members = tuple.members;

    for (var idx = 0, length = collapsed.length; idx < length; idx++) {
        var collapsedPath = collapsed[idx];
        if (indexOfPath(fullPath(members, collapsedPath.length -1), [collapsedPath]) !== -1) {
            return true;
        }
    }

    return false;
}

//Work with tuple names/captions
function indexOfPath(path, paths) {
    var path = path.join(",");

    for (var idx = 0; idx < paths.length; idx++) {
        if (paths[idx].join(",") === path) {
            return idx;
        }
    }

    return -1;
}

function fullPath(members, idx) {
    var path = [];
    var parentName = members[idx].parentName;

    idx -= 1;

    while (idx > -1) {
        path.push(members[idx].name);
        idx -= 1;
    }

    path.push(parentName);

    return path;
}

function memberCaption(member) {
    if (member.caption == 'All'){
        var name = member.name.split('&').pop();
        return name;
    }
    if (member.hierarchy == 'MEASURES'){
        return '- '+member.name;
    }
    return member.caption ;
}

function extractCaption(members) {
    return $.map(members, memberCaption).join(" ");
}

function fullPathCaptionName(members, dLength, idx) {
    var result = extractCaption(members.slice(0, idx + 1));
    return result;
}

//the main function that convert PivotDataSource data into understandable for the Chart widget format
function convertData(dataSource, collapsed) {
    var columnDimensionsLength = dataSource.columns().length;
    var rowDimensionsLength = dataSource.rows().length;

    var columnTuples = flattenTree(dataSource.axes().columns.tuples || [], collapsed.columns);
    var rowTuples = flattenTree(dataSource.axes().rows.tuples || [], collapsed.rows);
    var data = dataSource.data();
    var rowTuple, columnTuple;

    var idx = 0;
    var result = [];
    var columnsLength = columnTuples.length;

    for (var i = 0; i < rowTuples.length; i++) {
        rowTuple = rowTuples[i];

        if (!isCollapsed(rowTuple, collapsed.rows)) {
            for (var j = 0; j < columnsLength; j++) {
                columnTuple = columnTuples[j];

                if (!isCollapsed(columnTuple, collapsed.columns)) {
                    if ((idx % columnsLength !== 0) || (idx == columnsLength == 0)) {
                                //do not add root tuple members, e.g. [CY 2005, All Employees]
                                //Add only children
                                //if (!columnTuple.members[ci].parentName || !rowTuple.members[ri].parentName) {
                                var ci = columnTuple.members.length-1;
                                var ri = rowTuple.members.length-1;

                                result.push({
                                    measure: Number(data[idx].value),
                                    column: fullPathCaptionName(columnTuple.members, columnDimensionsLength, ci),
                                    row: fullPathCaptionName(rowTuple.members, rowDimensionsLength, ri)
                                });
                    }
                }
                idx += 1;
            }
        }
    }

    return result;
}
