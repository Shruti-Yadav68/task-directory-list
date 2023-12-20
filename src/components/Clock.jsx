
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clock = ({ paused, selectedCountry }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      if (selectedCountry) {
        const response = await axios.get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
        setCurrentTime(response.data.datetime.slice(11, 19));
      }
    };

    if (!paused) {
      if (!startTime) {
        setStartTime(new Date());
      }
      fetchTime();
    } else {
      setStartTime(null);
    }

    const interval = setInterval(() => {
      if (!paused) {
        fetchTime();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, selectedCountry, startTime]);
  

    return <div className='currentTime'>{currentTime}</div>;
  };

  export default Clock;

