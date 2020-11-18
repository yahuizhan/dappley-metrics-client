import React, { useState, useEffect } from 'react';
import Section from './Section';
import './pageBody.css';
import { isDatasetEmpty, parseTimeRange } from '../constants';

function Home() {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState({});
  const [timeRange, setTimeRange] = useState([]);

  const readData = async (signal) => {
    const timeNowInSec = Math.round((new Date()).getTime() / 1000);
    const from = timeNowInSec - 3600;
    const response = await fetch("http://localhost:9000/getLatest/" + from.toString(), {signal: signal})
      .then(res => res.json())
      .catch(err => console.log(err));
    console.log("response", response);
    const allData = response.success ? response.data : {};
    const timeRange = response.success ? response.timeRange : [];
    return {allData, timeRange};
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readData(signal)
      .then(response => {
        if (response.timeRange && response.timeRange.length === 2) {
          const timeRange = parseTimeRange(response.timeRange);
          //console.log("timeRange", timeRange)
          setTimeRange(timeRange);
        }
        setData(response.allData);
      })
      .catch(err => console.log(err));;
    const timeout = setTimeout(() => { setRefresh(refresh => !refresh); }, 10000);
    return () => { abortController.abort(); clearTimeout(timeout); };
  }, [refresh]);

  return (
    <div className="main">
      <h1>The Latest Metrics Data</h1>
      {isDatasetEmpty(data) ? 
        <p>The page is loading...<br/>If no plot is displaying in a few seconds, the latest dataset could be invalid or empty. Please ensure api is connected and sending correct data.</p>
        :
        Object.keys(data).map((sec,idx) => (<Section key={idx} name={sec} data={data[sec]} axisRange={timeRange}></Section>))}
    </div>
  );
}

export default Home;