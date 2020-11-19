export const chartStyles = {
    "block_txAddToBlockCost" : {
        title: "Cost for Adding Transaction To Block",
        legend: { position: 'none' },
    },
    "block_txPoolSize" : {
        title: "Transaction Pool Size",
        legend: { position: 'none' },
    },
    "cpu_totalProcessCpuPercent" : {
        title: "Total Process CPU Percent",
        legend: { position: 'none' },
    },
    "cpu_currentProcessCpuPercent" : {
        title: "Current Process CPU Percent",
        legend: { position: 'none' },
    },
    "disk_used" : {
        title: "Disk Used",
        legend: { position: 'none' },
    },
    "disk_UsedChange" : {
        title: "Disk Used Change",
        legend: { position: 'none' },
    },
    "disk_usedPercent" : {
        title: "Disk Used Percent",
        legend: { position: 'none' },
    },
    "disk_readBytes" : {
        title: "Disk Read Bytes",
        legend: { position: 'none' },
    },
    "disk_writeBytes" : {
        title: "Disk Write Bytes",
        legend: { position: 'none' },
    },
    "memory_currentProcessMemInUse" : {
        title: "Current Memory In Use",
        legend: { position: 'none' },
    },
    "memory_currentProcessMemPercent" : {
        title: "Current Memory Percentage",
        legend: { position: 'none' },
    },
    "memory_totalProcessMemInUse" : {
        title: "Total Memory In Use",
        legend: { position: 'none' },
    },
    "memory_totalProcessMemPercent" : {
        title: "Total Memory Percentage",
        legend: { position: 'none' },
    },
    "network_connection" : {
        title: "Number of Network Connections",
        legend: { position: 'top' },
    },
    "network_bytes" : {
        title: "Bytes Transferred through Network",
        legend: { position: 'top' },
    },
    "network_packets" : {
        title: "Packets Transferred through Network",
        legend: { position: 'top' },
    },
    "txRequest_concurrent" : {
        title: "Number of Concurrent Transaction Request",
        legend: { position: 'top' },
    },
    "txRequest_costTime" : {
        title: "Cost Time of Transaction Request",
        legend: { position: 'top' },
    },
    "txRequest_qps" : {
        title: "Queries Per Second(QPS) of Transaction Request",
        legend: { position: 'top' },
    }
};

/*a valid dataset:
    {
        "block": {
            "consts": [] or {"constfield1": <number>, "constfield2": <number>},
            "plotData": <plotdata(see below)>
        },
        "cpu": {
            "consts": [] or {"constfield1": <number>, "constfield2": <number>},
            "plotData": <plotdata(see below)>
        },
        ...
    }
a valid plotdata:
    {
        "chart1": [
            ["col1", "col2"],
            [0,0],
            [0,0],
            ... data points ...,
            [0,0]
        ],
        "chart2": [
            ["col1", "col2"],
            [0,0],
            [0,0],
            ... data points ...,
            [0,0]
        ],
        ... other chart data
    }*/

export const isDatasetEmpty = (data) => {
    if (Object.keys(data).length === 0) return true;
    for (const key in data) {
        if (!data[key]["consts"] || !data[key]["plotData"]) return true;
    }
    return false;
}

export const isPlotDataEmpty = (data) => {
    // ensure data[key][0][0] and data[key][0][1] are both valid
    if (Object.keys(data).length === 0) return true;

    for (const key in data) {
        if (!data[key].length || data[key].length < 2) return true;
        for (const row of data[key]) {
            if (!row.length || row.length < 2) {
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
    const isTimeFirstCol = titleline[0] === "time";
    const newTitleLine = formColumnTitles(titleline);
    let plotData = [newTitleLine];

    for (let i = 1; i < dataArr.length; i++) {
        const row = dataArr[i];
        let cleanedRow = [];
        if (isTimeFirstCol) {
            const time = new Date(row[0] * 1000);
            cleanedRow.push(time);
        } else {
            cleanedRow.push(row[0]);
        }

        for (let j = 1; j < row.length; j++) {
            if (typeof row[j] === "number" && row[j] < 0) {
                cleanedRow.push(null);
            } else {
                cleanedRow.push(row[j]);
            }
        }
        plotData.push(cleanedRow);
    }

    return plotData
}

const formColumnTitles = (titleline) => {
    let newTitleLine = [];
    for (const title of titleline) {
        if (title === "time") {
            newTitleLine.push({type: "date", label: title});
        } else {
            newTitleLine.push({type: "number", label: title});
        }
    }
    return newTitleLine;
}