import { shortenValue } from "../plotDataHandler";

function Constants(props) {
    const { data } = props;
    return (
        <p className="constants">
            {data.map((constant, idx) => (
                constant["title"] + " : " + shortenValue(constant["value"], constant["unitType"]) + "\n"
            ))}
        </p>
    );
}

export default Constants;