import React, { useState, useEffect } from 'react';
import Section from './Section';
import './pageBody.css';
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

function History() {

  const [loadedFilenames, setLoadedFilenames] = useState(false);
  const [filenames, setFilenames] = useState([]);
  const [selected, setSelected] = useState('');
  const [data, setData] = useState({});

  const readFilenames = async (signal) => {
    try {
      const response = await fetch("http://localhost:9000/getListOfDataFiles", {signal})
        .then(res => res.json());
      return response;
    } catch (err) {
      alert("Couldn't read list of csv files:\n" + err.toString());
      return [];
    }
  }

  const readData = async (filename, signal) => {
    try {
      const response = await fetch("http://localhost:9000/getHistory/" + filename, {signal})
        .then(res => res.json());
      const allData = response.success ? response.data : {};
      if (!response.success) {
        alert(response.error ? response.error : ("Could not read " + filename));
      }
      return allData;
    } catch(err) {
      alert("Couldn't read " + filename + ":\n" + err.toString());
      return {};
    };
  }

  const handleSelect = (value) => {
    setSelected(value);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (!loadedFilenames) {
      readFilenames(signal)
        .then(res => {
          setFilenames(res);
          setLoadedFilenames(true);
        });
    }

    if (selected !== '') {
      readData(selected, signal)
        .then(response => {
          setData(response);
        });
    }

    return () => { abortController.abort(); };
  }, [loadedFilenames, selected]);

  return (
    loadedFilenames && filenames && filenames.length > 0 ? 
      <div className="main">
        <label>Please Select A Dataset: </label>
        <Select defaultValue="" style={{ width: 320 }} onChange={handleSelect}>
          <Option value="">Please Select</Option>
          {filenames.map((fn, idx) => ( <Option key={idx} value={fn}>{fn}</Option> ))}
        </Select>
        {
          selected === '' ?
            <div>No Dataset Selected</div>
            :
            Object.keys(data).length === 0 ?
              <div>Loading ... </div>
              :
              <div id="historyCharts">
                {Object.keys(data).map((sec,idx) => (<Section key={idx} name={sec} data={data[sec]} addChartRangeFilter={true} />))}
              </div>
        }
      </div>
      :
      <div className="main">
        No past data to display
      </div>
  );
}

export default History;