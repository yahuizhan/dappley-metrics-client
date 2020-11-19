import React, { useState, useEffect } from 'react';
import Section from './Section';
import './pageBody.css';
import { isDatasetEmpty } from '../constants';

function Home() {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState({});

  const readData = async (signal) => {
    const timeNowInSec = Math.round((new Date()).getTime() / 1000);
    const from = timeNowInSec - 3600;
    try {
      const response = await fetch("http://localhost:9000/getLatest/" + from.toString(), {signal: signal})
        .then(res => res.json());
      //console.log("response", response);
      const allData = response.success ? response.data : {};
      return allData;
    } catch (err) {
      alert("Couldn't read latest data:\n" + err.toString());
      return {};
    };
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readData(signal)
      .then(response => {
        setData(response);
      });
    const timeout = setTimeout(() => { setRefresh(refresh => !refresh); }, 10000);
    return () => { abortController.abort(); clearTimeout(timeout); };
  }, [refresh]);

  return (
    <div className="main">
      <h1>The Latest Metrics Data</h1>
      {isDatasetEmpty(data) ? 
        <p>The page is loading...<br/>If no plot is displaying in a few seconds, the latest dataset could be invalid or empty. Please ensure api is connected and sending correct data.</p>
        :
        Object.keys(data).map((sec,idx) => (<Section key={idx} name={sec} data={data[sec]} addChartRangeFilter={false} />))}
    </div>
  );
}

export default Home;