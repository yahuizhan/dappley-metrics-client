/* export const chartStyles = {
    "block_txAddToBlockCost" : {
        title: "Cost for Adding Transaction To Block",
        //legend: { position: 'none' },
    },
    "block_txPoolSize" : {
        title: "Transaction Pool Size",
        //legend: { position: 'none' },
    },
    "cpu_totalProcessCpuPercent" : {
        title: "Total Process CPU Percent",
        //legend: { position: 'none' },
    },
    "cpu_currentProcessCpuPercent" : {
        title: "Current Process CPU Percent",
        //legend: { position: 'none' },
    },
    "disk_used" : {
        title: "Disk Used",
        //legend: { position: 'none' },
    },
    "disk_UsedChange" : {
        title: "Disk Used Change",
        //legend: { position: 'none' },
    },
    "disk_usedPercent" : {
        title: "Disk Used Percent",
        //legend: { position: 'none' },
    },
    "disk_readBytes" : {
        title: "Disk Read Bytes",
        //legend: { position: 'none' },
    },
    "disk_writeBytes" : {
        title: "Disk Write Bytes",
        //legend: { position: 'none' },
    },
    "memory_currentProcessMemInUse" : {
        title: "Current Memory In Use",
        //legend: { position: 'none' },
    },
    "memory_currentProcessMemPercent" : {
        title: "Current Memory Percentage",
        //legend: { position: 'none' },
    },
    "memory_totalProcessMemInUse" : {
        title: "Total Memory In Use",
        //legend: { position: 'none' },
    },
    "memory_totalProcessMemPercent" : {
        title: "Total Memory Percentage",
        //legend: { position: 'none' },
    },
    "network_connection" : {
        title: "Number of Network Connections",
        //legend: { position: 'top' },
    },
    "network_bytes" : {
        title: "Bytes Transferred through Network",
        //legend: { position: 'top' },
    },
    "network_packets" : {
        title: "Packets Transferred through Network",
        //legend: { position: 'top' },
    },
    "txRequest_concurrent" : {
        title: "Number of Concurrent Transaction Requests",
        //legend: { position: 'top' },
    },
    "txRequest_costTime" : {
        title: "Cost Time of Transaction Requests",
        //legend: { position: 'top' },
    },
    "txRequest_qps" : {
        title: "Queries Per Second(QPS) of Transaction Requests",
        //legend: { position: 'top' },
    }
}; */

export const lineColors = ["#82ca9d", "#8884d8"]

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