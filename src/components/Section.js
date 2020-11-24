import Constants from './Constants';
import Charts from './Charts';
import { isPlotDataEmpty } from "../constants";

function Section(props) {
    const { name, data, addChartRangeFilter } = props;
    return (
        <section id={name} className="section">
            {
                name === "cpu" ? 
                    <h1>CPU</h1> : 
                    <h1 style={{"textTransform": "capitalize"}}>{name === "txRequest" ? "Transaction Request" : name}</h1>
            }
            {
                Object.keys(data["consts"]).length > 0 ?
                    <Constants data={data["consts"]}></Constants> : <div></div>
            }
            {
                isPlotDataEmpty(data["plots"]) ?
                    <div>Not Available</div> : <Charts name={name} dataToPlot={data["plots"]} addChartRangeFilter={addChartRangeFilter} />
            }
        </section>
    );
}

export default Section;