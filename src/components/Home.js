import React, { useState, useEffect } from 'react';
import Section from './Section';
import './pageBody.css';
import { isDatasetEmpty } from '../constants';
import { Switch } from 'antd';

function Home() {
  const [autoFreshOn, setAutoFreshOn] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState({});

  const readData = async (signal) => {
    const timeNowInSec = Math.round((new Date()).getTime() / 1000);
    const from = timeNowInSec - 3600;
    try {
      const response = await fetch("http://localhost:9000/getLatest/" + from.toString(), {signal: signal})
        .then(res => res.json());
      //console.log("response", response);
      const allData = response.success ? response.content : {};
      return allData;
    } catch (err) {
      alert("Couldn't read latest data:\n" + err.toString());
      return {};
    };
  }

  const onChange = (checked) => {
    setAutoFreshOn(checked);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readData(signal).then(response => {setData(response)});
    let timeout = null;
    if (autoFreshOn) {
      timeout = setTimeout(() => { setRefresh(refresh => !refresh); }, 10000);
    }
    return () => {
      abortController.abort();
      if (timeout) clearTimeout(timeout);
    };
  }, [refresh, autoFreshOn]);

  return (
    <div className="main">
      <h1>The Latest Metrics Data</h1>
      <div className="switch"><label>Auto Fresh Every 10s </label><Switch onChange={onChange} /></div>
      <br/>
      {isDatasetEmpty(data) ? 
        <p>The page is loading...<br/>If no plot is displaying in a few seconds, the latest dataset could be invalid or empty. Please ensure api is connected and sending correct data.</p>
        :
        Object.keys(data).map((sec,idx) => (<Section key={idx} name={sec} data={data[sec]} addChartRangeFilter={false} />))}
    </div>
  );
}

export default Home;