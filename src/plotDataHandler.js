/*a valid dataset:
    {
        "block": {
            "consts": [] or {"constfield1": <number>, "constfield2": <number>},
            "plotData": <plotdata(see below)>
        },
        "cpu": {
            "consts": [] or {"constfield1": <number>, "constfield2": <number>},
            "plots": <plotdata(see below)>
        },
        ...
    }
a valid plotdata:
    [
        {
            "title": "Title Of Chart1",
            "unitType": "percentage",
            "data": [
                ["col1", "col2"],
                [0,0],
                [0,0],
                ... data points ...,
                [0,0]
            ]
        },
        {
            "title": "Title Of Chart2",
            "unitType": "bytes",
            "data": [
                ["col1", "col2"],
                [0,0],
                [0,0],
                ... data points ...,
                [0,0]
            ]
        },
        ... other chart data
    ]*/

export const isDatasetEmpty = (data) => {
    if (Object.keys(data).length === 0) return true;
    for (const key in data) {
        if (!data[key]["consts"] || !data[key]["plots"]) return true;
    }
    return false;
}

export const isPlotDataEmpty = (data) => {
    if (data.length === 0) return true;

    for (const plot of data) {
        if (plot["data"].length < 2) return true;
        for (const row of plot["data"]) {
            if (row.length < 2) {
                return true;
            }
        }
    }
    return false;
}

export const generatePlotData = (dataArr) => {
    if (!dataArr || dataArr.length < 2) {
        return [];
    }

    const titleline = dataArr[0];
    let data = [];
    for (let i = 1; i < dataArr.length; i++) {
        const row = dataArr[i];
        let cleanedRow = {};

        for (let j = 0; j < row.length; j++) {
            cleanedRow[titleline[j]] = row[j];
        }
        data.push(cleanedRow);
    }
    return data;
}

export const shortenYAxisValue = (number, unitType) => {
    switch (unitType) {
        case "percentage":
            break;
        case "bytes":
            if (number >= 1073741824) { // 1073741824 = 1024^3
                return (number / 1073741824).toPrecision(3) + "GB";
            }
            if (number >= 1048576) { // 1048576 = 1024^3
                return (number / 1048576).toPrecision(3) + "MB";
            }
            if (number >= 1024) {
                return (number / 1024).toPrecision(3) + "KB";
            }
            return number + "B";
        default:
            if (number >= 1000000000) {
                return (number / 1000000000).toPrecision(3) + "Bi";
            }
            if (number >= 1000000) {
                return (number / 1000000).toPrecision(3) + "M";
            }
            if (number >= 1000) {
                return (number / 1000).toPrecision(3) + "K";
            }
            break;
    }
    if (number === 0) {
        return "0";
    }
    if (number < 1) {
        return number.toPrecision(2) + "";
    }
    return number.toPrecision(3) + ""
}