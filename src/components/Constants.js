function Constants(props) {
    const { data } = props;
    //console.log("constants", data);
    return (
        <p className="constants">
            {Object.keys(data).map((key, idx) => (
                key + " : " + data[key] + "\n"
            ))}
        </p>
    );
}

export default Constants;