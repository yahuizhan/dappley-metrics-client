function Constants(props) {
    const { data } = props;
    return (
        <p className="constants">
            {Object.keys(data).map((key, idx) => (
                key + " : " + data[key] + "\n"
            ))}
        </p>
    );
}

export default Constants;