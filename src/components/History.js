import React, { useState, useEffect } from 'react';
import Section from './Section';
import './pageBody.css';
import { parseTimeRange } from '../constants';
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

function History() {

  const [loadedFilenames, setLoadedFilenames] = useState(false);
  const [filenames, setFilenames] = useState([]);
  const [selected, setSelected] = useState('');
  const [data, setData] = useState({});
  const [timeRange, setTimeRange] = useState([]);

  const readFilenames = async (signal) => {
    const response = await fetch("http://localhost:9000/getListOfDataFiles", {signal})
      .then(res => res.json())
      .catch(err => console.log(err));
    //console.log("data files", response);
    return response;
  }

  const readData = async (filename, signal) => {
    const response = await fetch("http://localhost:9000/getHistory/" + filename, {signal})
      .then(res => res.json())
      .catch(err => console.log(err));
    //console.log("response", response);
    const allData = response.success ? response.data : {};
    const timeRange = response.success ? response.timeRange : [];
    return {allData, timeRange};
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
        })
        .catch(err => console.log(err));
    }

    if (selected !== '') {
      readData(selected, signal)
        .then(response => {
          //console.log("response after", response);
          //console.log("response.timeRange.length", response.timeRange.length);
          if (response.timeRange && response.timeRange.length === 2) {
            //console.log("Got Time Range!");
            const timeRange = parseTimeRange(response.timeRange);
            //console.log("timeRange", timeRange)
            setTimeRange(timeRange);
          }
          setData(response.allData);
        })
        .catch(err => console.log(err));
    }

    return () => { abortController.abort(); };
  }, [loadedFilenames, selected]);

  return (
    loadedFilenames && filenames && filenames.length > 0 ? 
      <div className="main">
        <label>Please Select A Dataset:</label>
        <Select defaultValue="" style={{ width: 320 }} onChange={handleSelect} allowClear>
          <Option value="" disabled>Please Select</Option>
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
                {Object.keys(data).map((sec,idx) => (<Section key={idx} name={sec} data={data[sec]} axisRange={timeRange}></Section>))}
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