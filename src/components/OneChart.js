import { Chart } from "react-google-charts";
import React, { useState } from "react";
import { generatePlotData } from "../constants";
import { Select } from 'antd';
const { Option } = Select;

function OneChart(props) {
    const { chartTitle, legendPosition, dataToPlot, addChartRangeFilter } = props;
    const [vAxisFormat, setVAxisFormat] = useState("decimal");
    //console.log("dataToPlot: ", dataToPlot);
    const handleSelect = (value) => {
        setVAxisFormat(value);
    }

    const dataToPlot_ = generatePlotData(dataToPlot);
    //console.log("dataToPlot_", dataToPlot_);
   
    const getChartOptions = () => {
        let chartOpt = {
            title: chartTitle,
            hAxis: { title: dataToPlot_[0][0]},
            vAxis: { title: dataToPlot_[0][1], format: vAxisFormat },
            legend: { position: legendPosition },
            chartArea: { width: "90%" }
        }
        if (dataToPlot[0][0] === "time") {
            chartOpt.hAxis.format = "HH:mm";
        }
        return chartOpt
    }

    const getDateFormatter = () => {
        if (dataToPlot[0][0] === "time") {
            return { type: 'DateFormat', column: 0, options: { pattern: "HH:mm" } };
        }
        return {};
    }

    const chartElement = <Chart width={'600px'} height={'400px'}
                        chartType="LineChart" loader={<div>Loading Chart</div>}
                        data={dataToPlot_} options={getChartOptions()} formatters={[getDateFormatter()]} />;
    const chartElementWithControl = React.cloneElement(
        chartElement,
        { 
            chartPackages: ['corechart', 'controls'],
            controls: [
                {
                    controlType: 'ChartRangeFilter',
                    options: {
                        filterColumnIndex: 0,
                        ui: {
                            chartType: 'LineChart',
                            chartOptions: {
                                height: 100,
                                width: 600,
                                chartArea: { width: '90%', height: '80%' },
                                hAxis: { baselineColor: 'none' },
                            },
                        },
                    },
                    controlPosition: 'bottom',
                },
            ]
        },
        null
    );

    return (
        <div className={addChartRangeFilter ? "chart-with-control" : "chart-without-control"}>
            <label>Vertical axis style: </label>
            <Select defaultValue="decimal" style={{ width: 105 }} onChange={handleSelect}>
                <Option value="decimal">decimal</Option>
                <Option value="short">short</Option>
                <Option value="scientific">scientific</Option>
            </Select>
            { addChartRangeFilter ? chartElementWithControl : chartElement }
        </div>
    );
}

export default OneChart;