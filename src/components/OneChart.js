import { Chart } from "react-google-charts";
import { useState } from "react";
import { Select } from 'antd';
const { Option } = Select;

function OneChart(props) {
    const { chartTitle, legendPosition, dataToPlot, axisRange } = props;
    const [vAxisFormat, setVAxisFormat] = useState("decimal");

    const handleSelect = (value) => {
        setVAxisFormat(value);
    }
   
    const getChartOptions = () => {
        let chartOpt = {
            title: chartTitle,
            hAxis: { title: dataToPlot[0][0] },
            vAxis: { title: dataToPlot[0][1], format: vAxisFormat },
            legend: { position: legendPosition },
            chartArea: { width: "90%" }
        }
        if (dataToPlot[0][0] === "time" && axisRange) {
            chartOpt.hAxis["ticks"] = axisRange;
            chartOpt.hAxis["viewWindow"] = { min: axisRange[0].v, max: axisRange[1].v };
        }
        return chartOpt
    }

    return (
        <div className="Chart">
            <label>Vertical axis style: </label>
            <Select defaultValue="decimal" style={{ width: 105 }} onChange={handleSelect} allowClear>
                <Option value="decimal">decimal</Option>
                <Option value="short">short</Option>
                <Option value="scientific">scientific</Option>
            </Select>
            <Chart className="chart" width={'600px'} height={'400px'} chartType="LineChart" loader={<div>Loading Chart</div>}
                data={dataToPlot} options={getChartOptions()} //containerId={"chart_" + chartTitle}
                chartPackages={['corechart', 'controls']}
                controls={[
                    {
                        controlType: 'ChartRangeFilter',
                        //containerId: "control_" + chartTitle,
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
                                //height: '100px'
                            },
                            //width: '100%', height: '100px',
                        },
                        //height: '100px',
                        controlPosition: 'bottom',
                        controlWrapperParams: {
                            state: {
                                range: { start: axisRange[0].v, end: axisRange[1].v },
                            },
                        },
                    },
                ]} />
        </div>
    );
}

export default OneChart;