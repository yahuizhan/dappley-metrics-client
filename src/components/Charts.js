import { chartStyles, cleanNulls } from "../constants";
import OneChart from './OneChart';
import './Charts.css';

function Charts(props) {
    const { name, dataToPlot, axisRange } = props;

    return (
        
        <div id={name+"Charts"} className="chartArea">
            {Object.keys(dataToPlot).map((key, idx) => (
                <OneChart key={idx} chartTitle={chartStyles[name+"_"+key].title} dataToPlot={cleanNulls(dataToPlot[key])}
                legendPosition={chartStyles[name+"_"+key].legend.position} axisRange={axisRange}/>
            ))}
        </div>
    );
}

export default Charts;