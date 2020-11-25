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
    // ensure data[key][0][0] and data[key][0][1] are both valid
    if (data.length === 0) return true;

    for (const plot of data) {
        if (!plot["title"] || plot["data"].length < 2) return true;
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