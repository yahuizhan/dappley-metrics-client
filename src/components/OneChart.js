import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';
import { fromUnixTime, format } from 'date-fns';
import { generatePlotData, shortenValue } from "../plotDataHandler";
import config from '../config.json';

function OneChart(props) {
    const { chartTitle, dataToPlot, unitType, addChartRangeFilter } = props;
    const dataToPlot_ = generatePlotData(dataToPlot);
    const xTitle = dataToPlot[0][0];
    const yTitles = dataToPlot[0].slice(1);
    
    let unit = unitType === "percentage" ? "%" : ""

    const formatYAxis = (tickItem) => {
        return shortenValue(tickItem, unitType) + unit;
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload[0] && payload[0].payload) {
            const displayObj = payload[0].payload;
            return (
                <div className="tooltip">
                    <p className="label">{`${xTitle} : ${xTitle === "time" ? format(fromUnixTime(label), "HH:mm:ss") : label}`}</p>
                    {yTitles.map((v, i) => <p key={i} className={v}>{`${v}: ${shortenValue(displayObj[v], unitType)}${unit}`}</p>)}
                </div>
            );
            }
        return null;
    };

    const brush = <Brush dataKey={xTitle} height={20} stroke="#000000" y={260} startIndex={0} endIndex={Math.round((dataToPlot.length) / 2)}>
                    <LineChart>
                        {yTitles.map((v, i) => <Line key={i} dataKey={v} stroke={config.LINE_COLORS[i]} stackId="a" />)}
                    </LineChart>
                </Brush>;


    return (
        <div className={addChartRangeFilter ? "chart-with-control" : "chart-without-control"}>
            <h3>{chartTitle}</h3>
            <LineChart width={600} height={300} data={dataToPlot_} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                <XAxis dataKey={xTitle} type="number" domain={['auto', 'auto']} label={{value: xTitle, position: "bottom"}}
                    tickFormatter={(value) => (xTitle === "time" ? format(fromUnixTime(value), "HH:mm:ss") : value)} />
                <YAxis type="number" domain={['dataMin', 'dataMax']} tickFormatter={formatYAxis} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Legend layout="horizontal" verticalAlign="top" align="right"/>
                {yTitles.map((v, i) => <Line key={i} dataKey={v} type="monotone" stroke={config.LINE_COLORS[i]} />)}
                {addChartRangeFilter ? brush : null}
            </LineChart>
        </div>
    );
}

export default OneChart;