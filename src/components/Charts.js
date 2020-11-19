import { chartStyles } from "../constants";
import OneChart from './OneChart';
import './Charts.css';

function Charts(props) {
    const { name, dataToPlot, addChartRangeFilter } = props;

    return (
        
        <div id={name+"Charts"} className="chartArea">
            {Object.keys(dataToPlot).map((key, idx) => (
                <OneChart key={idx} chartTitle={chartStyles[name+"_"+key].title} dataToPlot={dataToPlot[key]}
                legendPosition={chartStyles[name+"_"+key].legend.position} addChartRangeFilter={addChartRangeFilter} />
            ))}
        </div>
    );
}

export default Charts;