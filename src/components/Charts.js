import OneChart from './OneChart';
import './Charts.css';

function Charts(props) {
    const { name, dataToPlot, addChartRangeFilter } = props;

    return (
        
        <div id={name+"Charts"} className="chartArea">
            {dataToPlot.map((plot, idx) => (
                <OneChart key={idx} chartTitle={plot.title} dataToPlot={plot.data}
                 addChartRangeFilter={addChartRangeFilter} />
            ))}
        </div>
    );
}

export default Charts;