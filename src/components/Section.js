import Constants from './Constants';
import Charts from './Charts';
import { isPlotDataEmpty } from "../plotDataHandler";

function Section(props) {
    const { name, data, addChartRangeFilter } = props;
    return (
        <section id={name} className="section">
            <h1>{name}</h1>
            {
                data["consts"].length > 0 ?
                    <Constants data={data["consts"]}></Constants> : null
            }
            {
                isPlotDataEmpty(data["plots"]) ?
                    <div>Not Available</div> : <Charts name={name} dataToPlot={data["plots"]} addChartRangeFilter={addChartRangeFilter} />
            }
        </section>
    );
}

export default Section;