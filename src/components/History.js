import React, { useState, useEffect } from 'react';
import Section from './Section';
import './pageBody.css';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { apiConn } from '../constants';
const { Option } = Select;

function History() {

  const [loadedFilenames, setLoadedFilenames] = useState(false);
  const [filenames, setFilenames] = useState([]);
  const [selected, setSelected] = useState('');
  const [data, setData] = useState({});

  const [section, setSection] = useState('');


  const readFilenames = async (signal) => {
    try {
      const response = await fetch(apiConn + "/getListOfDataFiles", {signal})
        .then(res => res.json());
      return response;
    } catch (err) {
      alert("Couldn't read list of csv files:\n" + err.toString());
      return [];
    }
  }

  const readData = async (filename) => {
    try {
      const response = await fetch(apiConn + "/getHistory/" + filename)
        .then(res => res.json());
      const allData = response.success ? response.content : {};
      if (!response.success) {
        alert(response.error ? response.error : ("Could not read " + filename));
      }
      return allData;
    } catch(err) {
      alert("Couldn't read " + filename + ":\n" + err.toString());
      return {};
    };
  }

  const handleSelectDataset = (value) => {
    setSelected(value);
    if (value !== '') {
        readData(value)
          .then(response => {
            setData(response);
          });
    }
  }

  const handleSelectSection = (value) => {
    if (value !== '') {
        setSection(value);
    }
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

    return () => { abortController.abort(); };
  }, [loadedFilenames, selected]);

  return (
    loadedFilenames && filenames && filenames.length > 0 ? 
      <div className="main">
        <label>Please Select A Dataset: </label>
        <Select defaultValue="" style={{ width: 320 }} onChange={handleSelectDataset}>
          <Option value="">Please Select</Option>
          {filenames.map((fn, idx) => ( <Option key={idx} value={fn}>{fn}</Option> ))}
        </Select>
        <label>Please Select A Section: </label>
        <Select defaultValue="" style={{ width: 320 }} onChange={handleSelectSection}>
          <Option value="">Please Select</Option>
          {Object.keys(data).map((sec, idx) => ( <Option key={idx} value={sec}>{sec}</Option> ))}
        </Select>
        {
          selected === '' ?
            <div>No Dataset Selected</div>
            :
            Object.keys(data).length === 0 ?
              <div>Loading ... </div>
              :
              section === '' ?
                <div> No section is selected </div>
                :
                <Section name={section} data={data[section]} addChartRangeFilter={true} />
        }
      </div>
      :
      <div className="main">
        No past data to display
      </div>
  );
}

export default History;