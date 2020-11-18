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
        //if (isPlotDataEmpty(data[key]["plotData"])) return true;
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

/* @param timeRange is string[] or int[] of two time stamps -- from-time stamp and to-time stamp
   @return [{v: <from-time int>, f: <string representation>}, {v: <to-time int>, f: <string representation>}]
 */
export const parseTimeRange = (timeRange) => {
    let range = [];
    for (const time of timeRange) {
        const timestamp = parseInt(time);
        const curr = new Date(timestamp * 1000);
        //console.log("curr time", curr);
        const hour = curr.getHours();
        const min = curr.getMinutes();
        const hourStr = hour < 10 ? "0"+hour : hour.toString();
        const minStr = min < 10 ? "0"+min : min.toString();
        range.push({v: timestamp, f: hourStr + ":" + minStr});
    }
    return range;
}

export const cleanNulls = (dataArr) => {
    //console.log("dataArr before cleaning nulls: ", dataArr);
    let res = [];
    for (const row of dataArr) {
        //console.log("one row:", row);
        if (typeof row[0] === "number") {
            let newRow = [];
            for (const entry of row) {
                if (entry < 0) {
                    newRow.push(null);
                } else {
                    newRow.push(entry);
                }
            }
            res.push(newRow);
        } else {
            res.push(row);
        }
    }
    //console.log("dataArr after cleaning nulls: ", res);
    return res;
}