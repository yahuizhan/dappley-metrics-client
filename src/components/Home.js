import React, { useState, useEffect } from 'react';
import Section from './Section';
import './pageBody.css';
import { isDatasetEmpty } from '../plotDataHandler';
import config from '../config.json';
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

function Home() {
  const [autoFreshFreq, setAutoFreshFreq] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState({});

  const [section, setSection] = useState("all");

  const readData = async (signal) => {
    const timeNowInSec = Math.round((new Date()).getTime() / 1000);
    const from = timeNowInSec - 3600;
    try {
      const response = await fetch(config.SERVER_URL + "/getLatest/" + from.toString(), {signal: signal})
        .then(res => res.json());
      const allData = response.success ? response.content : {};
      return allData;
    } catch (err) {
      alert("Couldn't read latest data:\n" + err.toString());
      return {};
    };
  }

  const handleSelectSection = (value) => {
    setSection(value);
  }

  const handleSelectRefresh = (value) => {
    const seconds = parseInt(value);
    if (seconds > 0) {
      setAutoFreshFreq(seconds)
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readData(signal).then(response => {setData(response)});
    let timeout = null;
    if (autoFreshFreq > 0) {
      timeout = setTimeout(() => { setRefresh(refresh => !refresh); }, autoFreshFreq * 1000);
    }
    return () => {
      abortController.abort();
      if (timeout) clearTimeout(timeout);
    };
  }, [refresh, autoFreshFreq]);

  return (
    <div className="main">
      <h1>The Latest Metrics Data</h1>
      <label>Please Select A Section: </label>
      <Select defaultValue="all" style={{ width: 320 }} onChange={handleSelectSection}>
        <Option value="all">All</Option>
        {Object.keys(data).map((sec, idx) => ( <Option key={idx} value={sec}>{sec}</Option> ))}
      </Select>
      <label>  Auto Fresh </label>
      <Select defaultValue="0" style={{ width: 160 }} onChange={handleSelectRefresh}>
        <Option value="0">Off</Option>
        <Option value="5">5 seconds</Option>
        <Option value="20">20 seconds</Option>
        <Option value="40">40 seconds</Option>
        <Option value="60">1 minute</Option>
        <Option value="120">2 minutes</Option>
        <Option value="300">5 minutes</Option>
      </Select>
      <br/>
      {isDatasetEmpty(data) ? 
        <p>The page is loading...<br/>If no plot is displaying in a few seconds, the latest dataset could be invalid or empty. Please ensure api is connected and sending correct data.</p>
        :
        section === "all" ?
          Object.keys(data).map((sec,idx) => (<Section key={idx} name={sec} data={data[sec]} addChartRangeFilter={false} />))
          :
          <Section name={section} data={data[section]} addChartRangeFilter={false} />
        }
    </div>
  );
}

export default Home;