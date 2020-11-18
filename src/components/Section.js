import Constants from './Constants';
import Charts from './Charts';
import { isPlotDataEmpty } from "../constants";

function Section(props) {
    const { name, data, axisRange } = props;
    //console.log("axisRange section prop", timeRange)
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
                isPlotDataEmpty(data["plotData"]) ?
                    <div>Not Available</div> : <Charts name={name} dataToPlot={data["plotData"]} axisRange={axisRange}></Charts>
            }
        </section>
    );
}

export default Section;